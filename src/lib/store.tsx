import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  ActivityLog,
  AppNotification,
  DepositRequest,
  Language,
  RequestStatus,
  Theme,
  Transaction,
  User,
  WithdrawalRequest,
} from "./types";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_PHONE,
  PACKAGES,
} from "./constants";
import {
  createSessionToken,
  hashPasswordNew,
  verifyPassword,
} from "./security";
import { uid } from "./utils";

// Storage keys
const K_USERS = "am_users";
const K_SESSION = "am_session";
const K_DEPOSITS = "am_deposits";
const K_WITHDRAWALS = "am_withdrawals";
const K_TRANSACTIONS = "am_transactions";
const K_NOTIFICATIONS = "am_notifications";
const K_LOGS = "am_logs";

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function daysAgo(days: number, hours = 0): string {
  return new Date(Date.now() - days * 86400000 - hours * 3600000).toISOString();
}

// ---------- Seed ----------
async function buildSeedUsers(): Promise<User[]> {
  const adminHash = await hashPasswordNew(ADMIN_PASSWORD);
  const ahmedHash = await hashPasswordNew("12345678");
  const fatmaHash = await hashPasswordNew("12345678");
  return [
    {
      id: "u_admin",
      fullName: "إدارة المشرق",
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      passwordHash: adminHash.hash,
      salt: adminHash.salt,
      role: "admin",
      balance: 0,
      invested: 0,
      totalProfit: 0,
      activePackageId: null,
      investmentStartedAt: null,
      status: "active",
      createdAt: daysAgo(400),
      avatarColor: "linear-gradient(135deg,#d4af37,#8a6d1a)",
      language: "ar",
      theme: "dark",
      emailNotifications: true,
    },
    {
      id: "u1",
      fullName: "أحمد محمود",
      email: "ahmed@demo.com",
      phone: "01001234567",
      passwordHash: ahmedHash.hash,
      salt: ahmedHash.salt,
      role: "user",
      balance: 154320,
      invested: 50000,
      totalProfit: 17380,
      activePackageId: "p50",
      investmentStartedAt: daysAgo(120),
      status: "active",
      createdAt: daysAgo(300),
      avatarColor: "linear-gradient(135deg,#d4af37,#a67c00)",
      language: "ar",
      theme: "dark",
      emailNotifications: true,
    },
    {
      id: "u2",
      fullName: "فاطمة علي",
      email: "fatma@demo.com",
      phone: "01112345678",
      passwordHash: fatmaHash.hash,
      salt: fatmaHash.salt,
      role: "user",
      balance: 286400,
      invested: 100000,
      totalProfit: 41250,
      activePackageId: "p100",
      investmentStartedAt: daysAgo(200),
      status: "active",
      createdAt: daysAgo(320),
      avatarColor: "linear-gradient(135deg,#2ecc71,#0f7b46)",
      language: "ar",
      theme: "light",
      emailNotifications: true,
    },
    {
      id: "u3",
      fullName: "محمد حسن",
      email: "mohamed@demo.com",
      phone: "01223456789",
      passwordHash: fatmaHash.hash,
      salt: fatmaHash.salt,
      role: "user",
      balance: 47800,
      invested: 10000,
      totalProfit: 3350,
      activePackageId: "p10",
      investmentStartedAt: daysAgo(60),
      status: "active",
      createdAt: daysAgo(150),
      avatarColor: "linear-gradient(135deg,#3498db,#1a5276)",
      language: "ar",
      theme: "dark",
      emailNotifications: false,
    },
  ];
}

function buildSeedDeposits(): DepositRequest[] {
  return [
    {
      id: "d1",
      userId: "u1",
      userName: "أحمد محمود",
      method: "فودافون كاش",
      senderPhone: "01001234567",
      amount: 50000,
      receiptName: "receipt_ahmed.png",
      status: "approved",
      createdAt: daysAgo(120),
      reviewedAt: daysAgo(119),
    },
    {
      id: "d2",
      userId: "u2",
      userName: "فاطمة علي",
      method: "تحويل بنكي",
      senderPhone: "01112345678",
      amount: 100000,
      receiptName: "receipt_fatma.pdf",
      status: "approved",
      createdAt: daysAgo(200),
      reviewedAt: daysAgo(199),
    },
    {
      id: "d3",
      userId: "u3",
      userName: "محمد حسن",
      method: "أورانج كاش",
      senderPhone: "01223456789",
      amount: 10000,
      receiptName: "receipt_mohamed.png",
      status: "pending",
      createdAt: daysAgo(0, 6),
    },
  ];
}

function buildSeedWithdrawals(): WithdrawalRequest[] {
  return [
    {
      id: "w1",
      userId: "u1",
      userName: "أحمد محمود",
      fullName: "أحمد محمود",
      phone: "01001234567",
      amount: 12000,
      method: "فودافون كاش",
      destination: "01001234567",
      status: "approved",
      createdAt: daysAgo(20),
      reviewedAt: daysAgo(19),
    },
    {
      id: "w2",
      userId: "u2",
      userName: "فاطمة علي",
      fullName: "فاطمة علي",
      phone: "01112345678",
      amount: 25000,
      method: "تحويل بنكي",
      destination: "EG760001004244",
      status: "pending",
      createdAt: daysAgo(0, 20),
    },
  ];
}

function buildSeedTransactions(): Transaction[] {
  const tx = (
    id: string,
    userId: string,
    type: Transaction["type"],
    amount: number,
    desc: string,
    at: string,
  ): Transaction => ({
    id,
    userId,
    type,
    amount,
    description: desc,
    createdAt: at,
  });
  return [
    tx("x1", "u1", "deposit", 50000, "إيداع — فودافون كاش", daysAgo(120)),
    tx("x2", "u1", "profit", 2250, "أرباح يومية متراكمة", daysAgo(5)),
    tx("x3", "u1", "withdrawal", 12000, "سحب — فودافون كاش", daysAgo(20)),
    tx("x4", "u2", "deposit", 100000, "إيداع — تحويل بنكي", daysAgo(200)),
    tx("x5", "u2", "profit", 6250, "أرباح شهرية", daysAgo(30)),
    tx("x6", "u3", "deposit", 10000, "إيداع — أورانج كاش", daysAgo(60)),
  ];
}

function buildSeedNotifications(): AppNotification[] {
  return [
    {
      id: "n1",
      userId: "u1",
      title: "تم اعتماد إيداعك",
      body: "تمت إضافة 50,000 ج.م إلى محفظتك بنجاح.",
      read: false,
      createdAt: daysAgo(119),
    },
    {
      id: "n2",
      userId: "u1",
      title: "أرباح جديدة",
      body: "أُضيفت أرباح يومية بقيمة 2,250 ج.م إلى رصيدك.",
      read: false,
      createdAt: daysAgo(5),
    },
    {
      id: "n3",
      userId: "u2",
      title: "طلب سحب قيد المراجعة",
      body: "طلب السحب بقيمة 25,000 ج.م قيد المعالجة وسيتم تأكيده خلال 24 ساعة.",
      read: false,
      createdAt: daysAgo(0, 20),
    },
    {
      id: "n4",
      userId: "all",
      title: "منصة المشرق",
      body: "نظام جديد للتقارير الأسبوعية أصبح متاحًا الآن لجميع المستخدمين.",
      read: false,
      createdAt: daysAgo(2),
    },
  ];
}

function buildSeedLogs(): ActivityLog[] {
  return [
    {
      id: "l1",
      action: "تم اعتماد إيداع أحمد محمود بقيمة 50,000 ج.م",
      actor: "الإدارة",
      at: daysAgo(119),
    },
    {
      id: "l2",
      action: "تم اعتماد سحب فاطمة علي بقيمة 25,000 ج.م",
      actor: "الإدارة",
      at: daysAgo(19),
    },
    {
      id: "l3",
      action: "انضم محمد حسن إلى منصة المشرق",
      actor: "النظام",
      at: daysAgo(150),
    },
  ];
}

// ---------- Context ----------
interface AuthResult {
  ok: boolean;
  error?: string;
}

interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface StoreContextType {
  user: User | null;
  users: User[];
  deposits: DepositRequest[];
  withdrawals: WithdrawalRequest[];
  transactions: Transaction[];
  notifications: AppNotification[];
  logs: ActivityLog[];
  register: (input: RegisterInput) => Promise<AuthResult>;
  login: (identifier: string, password: string) => Promise<AuthResult>;
  loginDemo: (userId: string) => Promise<AuthResult>;
  resetPassword: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  subscribePackage: (packageId: string) => void;
  submitDeposit: (input: {
    method: string;
    senderPhone: string;
    amount: number;
    receiptName: string;
    receiptData?: string;
    notes?: string;
  }) => void;
  submitWithdrawal: (input: {
    fullName: string;
    phone: string;
    amount: number;
    method: string;
    destination: string;
    notes?: string;
  }) => void;
  reviewDeposit: (id: string, status: RequestStatus) => void;
  reviewWithdrawal: (id: string, status: RequestStatus) => void;
  toggleUserStatus: (id: string) => void;
  adjustBalance: (userId: string, delta: number, reason: string) => void;
  resetDemo: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() =>
    loadJSON<User[]>(K_USERS, []),
  );
  const [sessionUserId, setSessionUserId] = useState<string | null>(() =>
    loadJSON<string | null>(K_SESSION, null),
  );
  const [deposits, setDeposits] = useState<DepositRequest[]>(() =>
    loadJSON<DepositRequest[]>(K_DEPOSITS, []),
  );
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() =>
    loadJSON<WithdrawalRequest[]>(K_WITHDRAWALS, []),
  );
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadJSON<Transaction[]>(K_TRANSACTIONS, []),
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    loadJSON<AppNotification[]>(K_NOTIFICATIONS, []),
  );
  const [logs, setLogs] = useState<ActivityLog[]>(() =>
    loadJSON<ActivityLog[]>(K_LOGS, []),
  );

  // Hydrate seeds on first run
  useEffect(() => {
    if (loadJSON<User[]>(K_USERS, []).length === 0) {
      buildSeedUsers().then((seed) => {
        setUsers(seed);
        saveJSON(K_USERS, seed);
      });
    }
    if (loadJSON<DepositRequest[]>(K_DEPOSITS, []).length === 0) {
      const seed = buildSeedDeposits();
      setDeposits(seed);
      saveJSON(K_DEPOSITS, seed);
    }
    if (loadJSON<WithdrawalRequest[]>(K_WITHDRAWALS, []).length === 0) {
      const seed = buildSeedWithdrawals();
      setWithdrawals(seed);
      saveJSON(K_WITHDRAWALS, seed);
    }
    if (loadJSON<Transaction[]>(K_TRANSACTIONS, []).length === 0) {
      const seed = buildSeedTransactions();
      setTransactions(seed);
      saveJSON(K_TRANSACTIONS, seed);
    }
    if (loadJSON<AppNotification[]>(K_NOTIFICATIONS, []).length === 0) {
      const seed = buildSeedNotifications();
      setNotifications(seed);
      saveJSON(K_NOTIFICATIONS, seed);
    }
    if (loadJSON<ActivityLog[]>(K_LOGS, []).length === 0) {
      const seed = buildSeedLogs();
      setLogs(seed);
      saveJSON(K_LOGS, seed);
    }
  }, []);

  // Persist
  useEffect(() => saveJSON(K_USERS, users), [users]);
  useEffect(() => saveJSON(K_SESSION, sessionUserId), [sessionUserId]);
  useEffect(() => saveJSON(K_DEPOSITS, deposits), [deposits]);
  useEffect(() => saveJSON(K_WITHDRAWALS, withdrawals), [withdrawals]);
  useEffect(() => saveJSON(K_TRANSACTIONS, transactions), [transactions]);
  useEffect(() => saveJSON(K_NOTIFICATIONS, notifications), [notifications]);
  useEffect(() => saveJSON(K_LOGS, logs), [logs]);

  const currentUser = useMemo(
    () => users.find((u) => u.id === sessionUserId) ?? null,
    [users, sessionUserId],
  );

  const pushNotification = useCallback(
    (n: Omit<AppNotification, "id" | "read" | "createdAt">) => {
      setNotifications((prev) => [
        {
          ...n,
          id: uid("n"),
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [],
  );

  const pushLog = useCallback((action: string) => {
    setLogs((prev) => [
      { id: uid("l"), action, actor: "الإدارة", at: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const register = useCallback(
    async (input: RegisterInput): Promise<AuthResult> => {
      if (
        users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())
      ) {
        return { ok: false, error: "البريد الإلكتروني مسجّل بالفعل" };
      }
      if (users.some((u) => u.phone === input.phone)) {
        return { ok: false, error: "رقم الهاتف مسجّل بالفعل" };
      }
      const hashed = await hashPasswordNew(input.password);
      const newUser: User = {
        id: uid("u"),
        fullName: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone.trim(),
        passwordHash: hashed.hash,
        salt: hashed.salt,
        role: "user",
        balance: 0,
        invested: 0,
        totalProfit: 0,
        activePackageId: null,
        investmentStartedAt: null,
        status: "active",
        createdAt: new Date().toISOString(),
        avatarColor: "linear-gradient(135deg,#d4af37,#a67c00)",
        language: "ar",
        theme: "dark",
        emailNotifications: true,
      };
      setUsers((prev) => [...prev, newUser]);
      setSessionUserId(newUser.id);
      const token = await createSessionToken(newUser.id);
      saveJSON("am_token", token);
      pushNotification({
        userId: "all",
        title: "مستخدم جديد",
        body: `${newUser.fullName} انضم إلى منصة المشرق.`,
      });
      pushLog(`${newUser.fullName} أنشأ حسابًا جديدًا`);
      return { ok: true };
    },
    [users, pushNotification, pushLog],
  );

  const login = useCallback(
    async (identifier: string, password: string): Promise<AuthResult> => {
      const found = users.find(
        (u) =>
          u.email.toLowerCase() === identifier.toLowerCase() ||
          u.phone === identifier,
      );
      if (!found) return { ok: false, error: "لا يوجد حساب بهذه البيانات" };
      if (found.status === "suspended")
        return { ok: false, error: "هذا الحساب موقوف مؤقتًا" };
      const ok = await verifyPassword(password, found.salt, found.passwordHash);
      if (!ok) return { ok: false, error: "كلمة المرور غير صحيحة" };
      setSessionUserId(found.id);
      const token = await createSessionToken(found.id);
      saveJSON("am_token", token);
      return { ok: true };
    },
    [users],
  );

  const loginDemo = useCallback(
    async (userId: string): Promise<AuthResult> => {
      const found = users.find((u) => u.id === userId);
      if (!found) return { ok: false, error: "المستخدم غير موجود" };
      setSessionUserId(found.id);
      const token = await createSessionToken(found.id);
      saveJSON("am_token", token);
      return { ok: true };
    },
    [users],
  );

  const resetPassword = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const target = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (!target) return { ok: false, error: "لا يوجد حساب بهذا البريد" };
      const hashed = await hashPasswordNew(password);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === target.id
            ? { ...u, passwordHash: hashed.hash, salt: hashed.salt }
            : u,
        ),
      );
      pushLog(`${target.fullName} أعاد تعيين كلمة المرور`);
      return { ok: true };
    },
    [users, pushLog],
  );

  const logout = useCallback(() => {
    setSessionUserId(null);
    saveJSON(K_SESSION, null);
    localStorage.removeItem("am_token");
  }, []);

  const updateUser = useCallback(
    (patch: Partial<User>) => {
      setUsers((prev) =>
        prev.map((u) => (u.id === sessionUserId ? { ...u, ...patch } : u)),
      );
    },
    [sessionUserId],
  );

  const setTheme = useCallback(
    (theme: Theme) => updateUser({ theme }),
    [updateUser],
  );

  const setLanguage = useCallback(
    (language: Language) => updateUser({ language }),
    [updateUser],
  );

  const subscribePackage = useCallback(
    (packageId: string) => {
      const pkg = PACKAGES.find((p) => p.id === packageId);
      if (!pkg) return;
      const current = users.find((u) => u.id === sessionUserId);
      if (!current) return;
      if (current.balance < pkg.amount) return;
      setUsers((prev) =>
        prev.map((u) =>
          u.id === sessionUserId
            ? {
                ...u,
                balance: u.balance - pkg.amount,
                activePackageId: packageId,
                invested: pkg.amount,
                investmentStartedAt: new Date().toISOString(),
              }
            : u,
        ),
      );
      setTransactions((prev) => [
        {
          id: uid("tx"),
          userId: sessionUserId!,
          type: "subscription",
          amount: pkg.amount,
          description: `تفعيل باقة ${pkg.nameAr}`,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      pushNotification({
        userId: sessionUserId!,
        title: "تفعيل باقة",
        body: `تم تفعيل باقة ${pkg.nameAr} بنجاح. تم خصم ${pkg.amount.toLocaleString("en-US")} ج.م من رصيدك.`,
      });
      pushLog(`تم تفعيل باقة ${pkg.nameAr} للمستخدم ${current.fullName}`);
    },
    [sessionUserId, users, pushNotification, pushLog],
  );

  const submitDeposit = useCallback(
    (input: {
      method: string;
      senderPhone: string;
      amount: number;
      receiptName: string;
      receiptData?: string;
      notes?: string;
    }) => {
      if (!currentUser) return;
      const req: DepositRequest = {
        id: uid("d"),
        userId: currentUser.id,
        userName: currentUser.fullName,
        method: input.method,
        senderPhone: input.senderPhone,
        amount: input.amount,
        receiptName: input.receiptName,
        ...(input.receiptData ? { receiptData: input.receiptData } : {}),
        ...(input.notes ? { notes: input.notes } : {}),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setDeposits((prev) => [req, ...prev]);
      pushNotification({
        userId: currentUser.id,
        title: "تم إرسال طلب الإيداع",
        body: `تم إرسال طلب الإيداع بقيمة ${input.amount.toLocaleString("en-US")} ج.م وهو الآن بانتظار مراجعة الإدارة.`,
      });
      pushNotification({
        userId: "all",
        title: "طلب إيداع جديد",
        body: `${currentUser.fullName} قدّم طلب إيداع بقيمة ${input.amount.toLocaleString("en-US")} ج.م.`,
      });
      pushLog(
        `${currentUser.fullName} قدّم طلب إيداع بقيمة ${input.amount.toLocaleString("en-US")} ج.م`,
      );
    },
    [currentUser, pushNotification, pushLog],
  );

  const submitWithdrawal = useCallback(
    (input: {
      fullName: string;
      phone: string;
      amount: number;
      method: string;
      destination: string;
      notes?: string;
    }) => {
      if (!currentUser) return;
      const req: WithdrawalRequest = {
        id: uid("w"),
        userId: currentUser.id,
        userName: currentUser.fullName,
        fullName: input.fullName,
        phone: input.phone,
        amount: input.amount,
        method: input.method,
        destination: input.destination,
        ...(input.notes ? { notes: input.notes } : {}),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setWithdrawals((prev) => [req, ...prev]);
      // Hold balance for pending withdrawal
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUser.id
            ? { ...u, balance: u.balance - input.amount }
            : u,
        ),
      );
      pushNotification({
        userId: "all",
        title: "طلب سحب جديد",
        body: `${currentUser.fullName} قدّم طلب سحب بقيمة ${input.amount.toLocaleString("en-US")} ج.م.`,
      });
      pushLog(
        `${currentUser.fullName} قدّم طلب سحب بقيمة ${input.amount.toLocaleString("en-US")} ج.م`,
      );
    },
    [currentUser, pushNotification, pushLog],
  );

  const reviewDeposit = useCallback(
    (id: string, status: RequestStatus) => {
      setDeposits((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, status, reviewedAt: new Date().toISOString() }
            : d,
        ),
      );
      const req = deposits.find((d) => d.id === id);
      if (!req) return;
      if (status === "approved") {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === req.userId ? { ...u, balance: u.balance + req.amount } : u,
          ),
        );
        setTransactions((prev) => [
          {
            id: uid("tx"),
            userId: req.userId,
            type: "deposit",
            amount: req.amount,
            description: `إيداع — ${req.method}`,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
        pushNotification({
          userId: req.userId,
          title: "تم اعتماد إيداعك",
          body: `✅ تم إضافة رصيد بقيمة ${req.amount.toLocaleString("en-US")} ج.م إلى حسابك.`,
        });
      } else if (status === "rejected") {
        pushNotification({
          userId: req.userId,
          title: "تم رفض طلب الإيداع",
          body: `تم رفض طلب الإيداع. يرجى مراجعة بيانات التحويل والمحاولة مرة أخرى.`,
        });
      }
      pushLog(
        `تم ${status === "approved" ? "اعتماد" : "رفض"} إيداع ${req.userName} بقيمة ${req.amount.toLocaleString("en-US")} ج.م`,
      );
    },
    [deposits, pushNotification, pushLog],
  );

  const reviewWithdrawal = useCallback(
    (id: string, status: RequestStatus) => {
      setWithdrawals((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, status, reviewedAt: new Date().toISOString() }
            : w,
        ),
      );
      const req = withdrawals.find((w) => w.id === id);
      if (!req) return;
      if (status === "rejected") {
        // Refund held balance
        setUsers((prev) =>
          prev.map((u) =>
            u.id === req.userId ? { ...u, balance: u.balance + req.amount } : u,
          ),
        );
        pushNotification({
          userId: req.userId,
          title: "تم رفض السحب",
          body: `تم إرجاع مبلغ ${req.amount.toLocaleString("en-US")} ج.م إلى رصيدك بعد رفض طلب السحب.`,
        });
      } else if (status === "approved") {
        setTransactions((prev) => [
          {
            id: uid("tx"),
            userId: req.userId,
            type: "withdrawal",
            amount: req.amount,
            description: `سحب — ${req.method}`,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
        pushNotification({
          userId: req.userId,
          title: "تم اعتماد السحب",
          body: `تم تحويل ${req.amount.toLocaleString("en-US")} ج.م إلى حسابك بنجاح.`,
        });
      }
      pushLog(
        `تم ${status === "approved" ? "اعتماد" : "رفض"} سحب ${req.userName} بقيمة ${req.amount.toLocaleString("en-US")} ج.م`,
      );
    },
    [withdrawals, pushNotification, pushLog],
  );

  const toggleUserStatus = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u,
      ),
    );
  }, []);

  const adjustBalance = useCallback(
    (userId: string, delta: number, reason: string) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, balance: Math.max(0, u.balance + delta) }
            : u,
        ),
      );
      const u = users.find((x) => x.id === userId);
      pushLog(
        `${reason} — ${u?.fullName ?? userId} (${delta > 0 ? "+" : ""}${delta.toLocaleString("en-US")} ج.م)`,
      );
    },
    [users, pushLog],
  );

  const resetDemo = useCallback(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("am_"))
      .forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }, []);

  const value: StoreContextType = {
    user: currentUser,
    users,
    deposits,
    withdrawals,
    transactions,
    notifications,
    logs,
    register,
    login,
    loginDemo,
    resetPassword,
    logout,
    updateUser,
    setTheme,
    setLanguage,
    subscribePackage,
    submitDeposit,
    submitWithdrawal,
    reviewDeposit,
    reviewWithdrawal,
    toggleUserStatus,
    adjustBalance,
    resetDemo,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
