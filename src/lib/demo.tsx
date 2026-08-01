import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Types
export type RequestStatus = "pending" | "review" | "approved" | "rejected";
export type RequestKind = "deposit" | "withdraw";
export type PlanTier = "silver" | "gold" | "platinum" | "diamond" | "emerald" | "sapphire" | "vip";
export type UserStatus = "active" | "suspended";

export interface User {
  id: string;
  fullName: string;
  phone: string;
  password: string;
  planId: PlanTier;
  balance: number;
  invested: number;
  profit: number;
  status: UserStatus;
  joinedAt: Date;
}

export interface Request {
  id: string;
  userId: string;
  userName: string;
  kind: RequestKind;
  method: string;
  amount: number;
  account: string;
  status: RequestStatus;
  createdAt: Date;
  receiptName?: string;
  note?: string;
}

export interface Plan {
  id: PlanTier;
  name: string;
  badge?: string;
  amount: number;
  dailyReturn: number;
  durationDays: number;
  perks: string[];
  vip?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  action: string;
  actor: string;
  at: Date;
}

// Plan definitions
export const PLANS: Plan[] = [
  {
    id: "silver",
    name: "الفضية",
    amount: 10000,
    dailyReturn: 0.5,
    durationDays: 90,
    perks: ["تتبع لحظي للأرباح", "دعم عبر البريد", "تقارير شهرية"],
  },
  {
    id: "gold",
    name: "الذهبية",
    badge: "محبوبة",
    amount: 50000,
    dailyReturn: 0.75,
    durationDays: 180,
    perks: ["تتبع لحظي", "دعم الأولوية", "تقارير أسبوعية", "مستشار مالي"],
  },
  {
    id: "platinum",
    name: "البلاتينية",
    amount: 100000,
    dailyReturn: 1.0,
    durationDays: 365,
    perks: ["كل مزايا الذهبية", "إدارة محفظة", "عمليات سريعة"],
  },
  {
    id: "diamond",
    name: "الماسية",
    amount: 250000,
    dailyReturn: 1.25,
    durationDays: 365,
    perks: ["كل المزايا السابقة", "حساب مخصص", "استثمارات موصى بها"],
  },
  {
    id: "emerald",
    name: "الزمردية",
    amount: 500000,
    dailyReturn: 1.5,
    durationDays: 365,
    perks: ["رعاية شاملة", "أولويات عالية", "منتدى حصري"],
  },
  {
    id: "sapphire",
    name: "الياقوتية",
    amount: 1000000,
    dailyReturn: 1.75,
    durationDays: 365,
    perks: ["سيادة مطلقة", "فريق مخصص", "منتجات ابتكارية"],
  },
  {
    id: "vip",
    name: "VIP المشرق",
    badge: "VIP",
    vip: true,
    amount: 2500000,
    dailyReturn: 2.0,
    durationDays: 365,
    perks: ["دعوة حصرية", "فريق عالمي", "استثمارات خاصة"],
  },
];

export const PAYMENT_METHODS = [
  { id: 1, label: "فودافون كاش", hint: "رقم المحفظة", icon: "📱", color: "from-red-500/20 to-red-600/20" },
  { id: 2, label: "أورانج موني", hint: "رقم الحساب", icon: "🟠", color: "from-orange-500/20 to-orange-600/20" },
  { id: 3, label: "اتصالات كاش", hint: "رقم المحفظة", icon: "📲", color: "from-yellow-500/20 to-yellow-600/20" },
  { id: 4, label: "WE Pay", hint: "رقم المحفظة", icon: "💳", color: "from-blue-500/20 to-blue-600/20" },
  { id: 5, label: "إنستا باي", hint: "رقم المحفظة", icon: "✨", color: "from-violet-500/20 to-violet-600/20" },
  { id: 6, label: "تحويل بنكي", hint: "IBAN أو رقم الحساب", icon: "🏦", color: "from-emerald-500/20 to-emerald-600/20" },
];

export const statusLabel: Record<RequestStatus, string> = {
  pending: "قيد الانتظار 🕐",
  review: "قيد المراجعة ⏳",
  approved: "موافق عليه ✅",
  rejected: "مرفوض ❌",
};

// Formatting functions
export const fmt = (n: number): string => n.toLocaleString("ar-EG");

export const fmtDate = (date: Date): string => {
  if (typeof date === "string") date = new Date(date);
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Storage keys
const USERS_KEY = "demo_users";
const USER_KEY = "demo_user";
const REQUESTS_KEY = "demo_requests";

// Demo data generators
function generateMockUsers(): User[] {
  return [
    {
      id: "u1",
      fullName: "أحمد محمود",
      phone: "01001234567",
      password: "12345678",
      planId: "gold",
      balance: 125000,
      invested: 50000,
      profit: 8750,
      status: "active",
      joinedAt: new Date(2024, 0, 15),
    },
    {
      id: "u2",
      fullName: "فاطمة علي",
      phone: "01112345678",
      password: "12345678",
      planId: "platinum",
      balance: 280000,
      invested: 100000,
      profit: 22500,
      status: "active",
      joinedAt: new Date(2023, 11, 1),
    },
    {
      id: "u3",
      fullName: "محمد حسن",
      phone: "01223456789",
      password: "12345678",
      planId: "silver",
      balance: 45000,
      invested: 10000,
      profit: 1500,
      status: "active",
      joinedAt: new Date(2024, 3, 20),
    },
    {
      id: "u4",
      fullName: "ليلى إبراهيم",
      phone: "01334567890",
      password: "12345678",
      planId: "diamond",
      balance: 425000,
      invested: 250000,
      profit: 52500,
      status: "active",
      joinedAt: new Date(2023, 6, 10),
    },
  ];
}

function generateMockRequests(): Request[] {
  return [
    {
      id: "r1",
      userId: "u1",
      userName: "أحمد محمود",
      kind: "deposit",
      method: "فودافون كاش",
      amount: 25000,
      account: "201001234567",
      status: "approved",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "r2",
      userId: "u2",
      userName: "فاطمة علي",
      kind: "withdraw",
      method: "تحويل بنكي",
      amount: 50000,
      account: "EG76 ADIB 0000 0000 0123 4567 890",
      status: "approved",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "r3",
      userId: "u3",
      userName: "محمد حسن",
      kind: "deposit",
      method: "أورانج موني",
      amount: 15000,
      account: "201223456789",
      status: "review",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "r4",
      userId: "u4",
      userName: "ليلى إبراهيم",
      kind: "deposit",
      method: "تحويل بنكي",
      amount: 100000,
      account: "EG88 CIBE 0000 0000 0000 0000 000",
      status: "pending",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  ];
}

function generateNotifications(): Notification[] {
  return [
    {
      id: "n1",
      title: "إيداع تم الموافقة عليه",
      body: "تم اعتماد طلب الإيداع بقيمة 25,000 ج.م وإضافة الرصيد إلى محفظتك.",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: "n2",
      title: "الأرباح الشهرية",
      body: "تم توزيع أرباح هذا الشهر: 8,750 ج.م. متوسط العائد اليومي 0.75%.",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "n3",
      title: "تحديث الباقة",
      body: "يمكنك الترقية إلى الباقة الذهبية للحصول على عوائد أعلى وخدمات أفضل.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "n4",
      title: "سحب قيد المعالجة",
      body: "طلب السحب بقيمة 50,000 ج.م قيد المراجعة، سيتم تحويله في غضون 24 ساعة.",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];
}

function generateActivityLogs(): ActivityLog[] {
  return [
    {
      id: "l1",
      action: "أحمد محمود قدّم طلب إيداع بقيمة 25,000 ج.م",
      actor: "نظام",
      at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "l2",
      action: "فاطمة علي اعتمدت طلب سحب بقيمة 50,000 ج.م",
      actor: "مسؤول",
      at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "l3",
      action: "محمد حسن غيّر الباقة من الفضية إلى الذهبية",
      actor: "نظام",
      at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ];
}

export const allocation = [
  { name: "أسهم", value: 45 },
  { name: "صكوك", value: 30 },
  { name: "ذهب", value: 15 },
  { name: "نقد", value: 10 },
];

export const portfolioSeries = [
  { m: "فبراير", v: 50, p: 2 },
  { m: "مارس", v: 65, p: 5 },
  { m: "أبريل", v: 80, p: 8 },
  { m: "مايو", v: 105, p: 15 },
  { m: "يونيو", v: 135, p: 25 },
  { m: "يوليو", v: 175, p: 40 },
  { m: "أغسطس", v: 220, p: 60 },
];

// Safe localStorage helpers
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

// Demo context
interface DemoContextType {
  user: User | null;
  users: User[];
  requests: Request[];
  notifications: Notification[];
  logs: ActivityLog[];
  register: (data: { fullName: string; phone: string; password: string }) => { ok: boolean; error?: string };
  login: (data: { phone: string; password: string }) => { ok: boolean; error?: string; user?: User };
  logout: () => void;
  subscribePlan: (planId: PlanTier) => void;
  submitRequest: (req: Omit<Request, "id" | "userId" | "userName" | "createdAt">) => void;
  setRequestStatus: (requestId: string, status: RequestStatus) => void;
  toggleUserStatus: (userId: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const stored = loadJSON<User[]>(USERS_KEY, []);
    if (stored.length > 0) return stored;
    const mock = generateMockUsers();
    saveJSON(USERS_KEY, mock);
    return mock;
  });

  const [requests, setRequests] = useState<Request[]>(() => {
    const stored = loadJSON<Request[]>(REQUESTS_KEY, []);
    if (stored.length > 0) return stored;
    const mock = generateMockRequests();
    saveJSON(REQUESTS_KEY, mock);
    return mock;
  });

  const [notifications, setNotifications] = useState<Notification[]>(generateNotifications);
  const [logs, setLogs] = useState<ActivityLog[]>(generateActivityLogs);

  // Persist users whenever they change
  useEffect(() => {
    saveJSON(USERS_KEY, users);
  }, [users]);

  // Persist requests whenever they change
  useEffect(() => {
    saveJSON(REQUESTS_KEY, requests);
  }, [requests]);

  const register = (data: { fullName: string; phone: string; password: string }) => {
    // Check if phone already exists
    if (users.some((u) => u.phone === data.phone)) {
      return { ok: false, error: "رقم الهاتف مسجّل بالفعل — جرّب تسجيل الدخول" };
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      fullName: data.fullName,
      phone: data.phone,
      password: data.password,
      planId: "silver",
      balance: 50000,
      invested: 10000,
      profit: 0,
      status: "active",
      joinedAt: new Date(),
    };
    setUser(newUser);
    setUsers([...users, newUser]);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    return { ok: true };
  };

  const login = (data: { phone: string; password: string }) => {
    const found = users.find((u) => u.phone === data.phone);
    if (!found) {
      return { ok: false, error: "لا يوجد حساب بهذا الرقم — أنشئ حسابًا جديدًا" };
    }
    if (found.password !== data.password) {
      return { ok: false, error: "كلمة المرور غير صحيحة" };
    }
    setUser(found);
    localStorage.setItem(USER_KEY, JSON.stringify(found));
    return { ok: true, user: found };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const subscribePlan = (planId: PlanTier) => {
    if (user) {
      const updated = { ...user, planId };
      setUser(updated);
      setUsers(users.map((u) => (u.id === user.id ? updated : u)));
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
    }
  };

  const submitRequest = (req: Omit<Request, "id" | "userId" | "userName" | "createdAt">) => {
    if (!user) return;
    const newRequest: Request = {
      ...req,
      id: `r${Date.now()}`,
      userId: user.id,
      userName: user.fullName,
      createdAt: new Date(),
    };
    setRequests([newRequest, ...requests]);
    setNotifications([
      {
        id: `n${Date.now()}`,
        title: "طلب جديد",
        body: `تم إرسال طلب ${req.kind === "deposit" ? "إيداع" : "سحب"} بقيمة ${fmt(req.amount)} ج.م`,
        createdAt: new Date(),
      },
      ...notifications,
    ]);
  };

  const setRequestStatus = (requestId: string, status: RequestStatus) => {
    setRequests(requests.map((r) => (r.id === requestId ? { ...r, status } : r)));
    const req = requests.find((r) => r.id === requestId);
    if (req) {
      setLogs([
        {
          id: `l${Date.now()}`,
          action: `تم تحديث حالة طلب ${req.kind === "deposit" ? "إيداع" : "سحب"} إلى ${statusLabel[status]}`,
          actor: "مسؤول",
          at: new Date(),
        },
        ...logs,
      ]);
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u,
      ),
    );
  };

  return (
    <DemoContext.Provider
      value={{
        user,
        users,
        requests,
        notifications,
        logs,
        register,
        login,
        logout,
        subscribePlan,
        submitRequest,
        setRequestStatus,
        toggleUserStatus,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
};