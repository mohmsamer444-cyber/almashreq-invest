import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Search, ShieldCheck, X, Activity, Wallet, Users, TrendingUp, Ban, Plus, Minus } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { StatCard } from "@/components/shared/stat-card";
import { AdminBarChart } from "@/components/shared/charts";
import { StatusPill } from "@/components/shared/status-pill";
import { PACKAGES } from "@/lib/constants";
import { Button, Tabs, Badge } from "@/components/ui";
import { cn, fmtMoney, fmtDateTime } from "@/lib/utils";

type TabKey = "overview" | "users" | "deposits" | "withdrawals" | "logs";
type StatusFilter = "all" | "pending" | "approved" | "rejected";

const STATUS_LABEL: Record<string, string> = {
  pending: "قيد المراجعة",
  approved: "مقبول",
  rejected: "مرفوض",
};

const STATUS_LABEL_EN: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const MONTHLY_TREND = [
  { m: "سبتمبر", deposits: 420, withdrawals: 150 },
  { m: "أكتوبر", deposits: 510, withdrawals: 190 },
  { m: "نوفمبر", deposits: 470, withdrawals: 210 },
  { m: "ديسمبر", deposits: 640, withdrawals: 230 },
  { m: "يناير", deposits: 780, withdrawals: 260 },
  { m: "فبراير", deposits: 920, withdrawals: 300 },
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة الإدارة | منصة المشرق" },
      { name: "description", content: "إدارة المستخدمين والطلبات." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const {
    user,
    users,
    deposits,
    withdrawals,
    logs,
    reviewDeposit,
    reviewWithdrawal,
    toggleUserStatus,
    adjustBalance,
    resetDemo,
  } = useStore();
  const { lang } = useSettings();
  const [tab, setTab] = useState<TabKey>("overview");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredUsers = useMemo(
    () => users.filter((u) => (u.fullName + u.email + u.phone).includes(q.trim())),
    [users, q],
  );

  const filteredDeposits = useMemo(
    () =>
      deposits.filter(
        (d) =>
          (statusFilter === "all" || d.status === statusFilter) &&
          (d.userName + d.method).includes(q.trim()),
      ),
    [deposits, statusFilter, q],
  );

  const filteredWithdrawals = useMemo(
    () =>
      withdrawals.filter(
        (w) =>
          (statusFilter === "all" || w.status === statusFilter) &&
          (w.userName + w.method).includes(q.trim()),
      ),
    [withdrawals, statusFilter, q],
  );

  if (!user || user.role !== "admin") {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="max-w-md text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-gold" />
            <h2 className="mt-4 font-display text-xl text-ivory">
              {lang === "ar" ? "صلاحية الإدارة فقط" : "Admin access only"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "ar" ? "حسابك الحالي ليس لديه صلاحية الوصول لهذه الصفحة." : "Your account does not have admin access."}
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  const totalAssets = users.reduce((a, u) => a + u.balance, 0);
  const pendingD = deposits.filter((d) => d.status === "pending").length;
  const pendingW = withdrawals.filter((w) => w.status === "pending").length;

  const label = (s: string) =>
    (lang === "ar" ? STATUS_LABEL[s] : STATUS_LABEL_EN[s]) ?? s;

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "لوحة الإدارة" : "Admin Panel"}
        subtitle={lang === "ar" ? "إدارة المستخدمين والطلبات والتقارير" : "Manage users, requests, and reports"}
      >
        <Button variant="danger" size="sm" onClick={resetDemo}>
          <Ban className="h-4 w-4" />
          {lang === "ar" ? "إعادة تعيين" : "Reset demo"}
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label={lang === "ar" ? "المستخدمون" : "Users"} value={users.length} icon={<Users className="h-5 w-5" />} accent="violet" />
        <StatCard label={lang === "ar" ? "إجمالي الأصول" : "Total assets"} value={totalAssets} suffix="ج.م" icon={<Wallet className="h-5 w-5" />} accent="gold" />
        <StatCard label={lang === "ar" ? "إيداعات معلّقة" : "Pending deposits"} value={pendingD} icon={<Activity className="h-5 w-5" />} accent="emerald" />
        <StatCard label={lang === "ar" ? "سحوبات معلّقة" : "Pending withdrawals"} value={pendingW} icon={<TrendingUp className="h-5 w-5" />} accent="blue" />
      </div>

      {/* Search & Tabs */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-3 rounded-full border border-border/70 bg-background/40 px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-gold" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === "ar" ? "ابحث بالاسم، البريد، الهاتف أو الوسيلة…" : "Search by name, email, phone or method…"}
            className="min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/50"
          />
        </div>
        <Tabs<TabKey>
          className="overflow-x-auto"
          tabs={[
            { key: "overview", label: lang === "ar" ? "النظرة العامة" : "Overview" },
            { key: "users", label: lang === "ar" ? "المستخدمون" : "Users" },
            { key: "deposits", label: lang === "ar" ? "الإيداعات" : "Deposits" },
            { key: "withdrawals", label: lang === "ar" ? "السحوبات" : "Withdrawals" },
            { key: "logs", label: lang === "ar" ? "السجل" : "Logs" },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl glass p-5 sm:p-6 lg:col-span-2">
            <h3 className="font-display text-base text-ivory sm:text-lg">
              {lang === "ar" ? "الإيداعات مقابل السحوبات" : "Deposits vs withdrawals"}
            </h3>
            <p className="text-xs text-muted-foreground">{lang === "ar" ? "آخر ٦ أشهر (بالألف)" : "Last 6 months (thousands)"}</p>
            <div className="mt-4">
              <AdminBarChart data={MONTHLY_TREND} />
            </div>
          </div>
          <div className="rounded-3xl glass p-5 sm:p-6">
            <h3 className="font-display text-base text-ivory sm:text-lg">{lang === "ar" ? "الباقات المفعّلة" : "Packages"}</h3>
            <p className="text-xs text-muted-foreground">{lang === "ar" ? "توزيع المستخدمين حسب الباقات" : "Users per package"}</p>
            <div className="mt-4 space-y-3">
              {PACKAGES.map((p) => {
                const count = users.filter((u) => u.activePackageId === p.id).length;
                const pct = users.length ? Math.round((count / users.length) * 100) : 0;
                return (
                  <div key={p.id}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{lang === "ar" ? p.nameAr : p.nameEn}</span>
                      <span className="font-semibold text-ivory">{count}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-background/60">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundImage: p.vip ? "var(--gradient-gold)" : "var(--gradient-emerald)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      {tab === "users" && (
        <div className="mt-6 rounded-3xl glass p-5 sm:p-6">
          <h3 className="font-display text-lg text-ivory">{lang === "ar" ? `المستخدمون (${filteredUsers.length})` : `Users (${filteredUsers.length})`}</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-start">
              <thead>
                <tr className="text-[11px] text-muted-foreground">
                  <th className="pb-3 text-start font-medium">{lang === "ar" ? "المستخدم" : "User"}</th>
                  <th className="pb-3 text-start font-medium">{lang === "ar" ? "الباقة" : "Package"}</th>
                  <th className="pb-3 text-start font-medium">{lang === "ar" ? "الرصيد" : "Balance"}</th>
                  <th className="pb-3 text-start font-medium">{lang === "ar" ? "الحالة" : "Status"}</th>
                  <th className="pb-3 text-start font-medium">{lang === "ar" ? "إجراء" : "Action"}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const pkg = PACKAGES.find((p) => p.id === u.activePackageId);
                  return (
                    <tr key={u.id} className="border-t border-border/40 text-sm">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: u.avatarColor }}>{u.fullName.charAt(0)}</div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-ivory">{u.fullName}</p>
                            <p className="truncate text-[11px] text-muted-foreground" dir="ltr">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{pkg ? (lang === "ar" ? pkg.nameAr : pkg.nameEn) : "—"}</td>
                      <td className="py-3 text-xs font-semibold text-gold">{fmtMoney(u.balance, lang)}</td>
                      <td className="py-3">
                        <Badge tone={u.status === "active" ? "success" : "danger"}>
                          {u.status === "active" ? (lang === "ar" ? "نشط" : "Active") : (lang === "ar" ? "موقوف" : "Suspended")}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => { toggleUserStatus(u.id); toast.success(lang === "ar" ? "تم تحديث حالة المستخدم" : "User status updated"); }}
                            className={cn("grid h-8 w-8 place-items-center rounded-full border transition-colors", u.status === "active" ? "border-destructive/40 text-destructive hover:bg-destructive/10" : "border-success/40 text-success hover:bg-success/10")}
                            aria-label="toggle status"
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </button>
                          <AdjustBalanceBtn userId={u.id} userName={u.fullName} adjustBalance={adjustBalance} lang={lang} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredUsers.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">{lang === "ar" ? "لا توجد نتائج" : "No results"}</p>}
          </div>
        </div>
      )}

      {/* Deposits */}
      {tab === "deposits" && (
        <RequestList
          title={lang === "ar" ? `الإيداعات (${filteredDeposits.length})` : `Deposits (${filteredDeposits.length})`}
          items={filteredDeposits}
          onReview={(id, status) => { reviewDeposit(id, status); toast.success(lang === "ar" ? "تم تحديث حالة الإيداع" : "Deposit status updated"); }}
          statusFilter={statusFilter}
          onFilter={setStatusFilter}
          lang={lang}
          label={label}
        />
      )}

      {/* Withdrawals */}
      {tab === "withdrawals" && (
        <RequestList
          title={lang === "ar" ? `السحوبات (${filteredWithdrawals.length})` : `Withdrawals (${filteredWithdrawals.length})`}
          items={filteredWithdrawals}
          onReview={(id, status) => { reviewWithdrawal(id, status); toast.success(lang === "ar" ? "تم تحديث حالة السحب" : "Withdrawal status updated"); }}
          statusFilter={statusFilter}
          onFilter={setStatusFilter}
          lang={lang}
          label={label}
        />
      )}

      {/* Logs */}
      {tab === "logs" && (
        <div className="mt-6 rounded-3xl glass p-5 sm:p-6">
          <h3 className="font-display text-lg text-ivory">{lang === "ar" ? "سجل النشاط" : "Activity log"}</h3>
          <div className="mt-4 space-y-3">
            {logs.map((l) => (
              <div key={l.id} className="flex items-start gap-3 rounded-2xl border border-border/40 p-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <div className="min-w-0">
                  <p className="text-sm text-ivory">{l.action}</p>
                  <p className="text-[11px] text-muted-foreground">{l.actor} — {fmtDateTime(l.at)}</p>
                </div>
              </div>
            ))}
            {logs.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">{lang === "ar" ? "لا يوجد نشاط" : "No activity"}</p>}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function AdjustBalanceBtn({ userId, userName, adjustBalance, lang }: { userId: string; userName: string; adjustBalance: (userId: string, delta: number, reason: string) => void; lang: "ar" | "en" }) {
  const [open, setOpen] = useState(false);
  const [delta, setDelta] = useState("");
  const [reason, setReason] = useState("");

  const apply = (sign: 1 | -1) => {
    const n = parseFloat(delta);
    if (isNaN(n) || n <= 0) { toast.error(lang === "ar" ? "أدخل مبلغًا صحيحًا" : "Enter a valid amount"); return; }
    adjustBalance(userId, sign * n, reason.trim() || (lang === "ar" ? "تعديل يدوي" : "Manual adjustment"));
    setOpen(false); setDelta(""); setReason("");
    toast.success(lang === "ar" ? "تم تعديل الرصيد" : "Balance adjusted");
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10" aria-label="adjust balance">
        <Plus className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute end-0 top-10 z-30 w-64 rounded-2xl glass p-4 shadow-2xl">
          <p className="text-xs font-semibold text-ivory">{lang === "ar" ? `تعديل رصيد ${userName}` : `Adjust balance for ${userName}`}</p>
          <input value={delta} onChange={(e) => setDelta(e.target.value)} placeholder={lang === "ar" ? "المبلغ" : "Amount"} inputMode="numeric" dir="ltr" className="mt-3 w-full rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-sm text-ivory outline-none focus:border-gold/60" />
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder={lang === "ar" ? "السبب (اختياري)" : "Reason (optional)"} className="mt-2 w-full rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-sm text-ivory outline-none focus:border-gold/60" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button onClick={() => apply(1)} className="flex items-center justify-center gap-1 rounded-xl border border-success/40 py-2 text-xs font-semibold text-success hover:bg-success/10"><Plus className="h-3.5 w-3.5" /> {lang === "ar" ? "إضافة" : "Add"}</button>
            <button onClick={() => apply(-1)} className="flex items-center justify-center gap-1 rounded-xl border border-destructive/40 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"><Minus className="h-3.5 w-3.5" /> {lang === "ar" ? "خصم" : "Deduct"}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function RequestList({ title, items, onReview, statusFilter, onFilter, lang, label }: {
  title: string; items: { id: string; userName: string; amount: number; method: string; createdAt: string; status: string; notes?: string }[];
  onReview: (id: string, status: "approved" | "rejected") => void;
  statusFilter: StatusFilter; onFilter: (f: StatusFilter) => void; lang: "ar" | "en"; label: (s: string) => string;
}) {
  const filters: StatusFilter[] = ["all", "pending", "approved", "rejected"];
  return (
    <div className="mt-6 rounded-3xl glass p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg text-ivory">{title}</h3>
        <div className="flex gap-1 rounded-full border border-border/60 p-1">
          {filters.map((f) => (
            <button key={f} onClick={() => onFilter(f)} className={cn("rounded-full px-3 py-1 text-[11px] font-semibold transition-all", statusFilter === f ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory")}>
              {f === "all" ? (lang === "ar" ? "الكل" : "All") : label(f)}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {items.map((r) => (
          <div key={r.id} className="grid gap-3 rounded-2xl border border-border/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ivory">{r.userName} — {fmtMoney(r.amount, lang)} ج.م</p>
              <p className="truncate text-[11px] text-muted-foreground">{r.method} — {fmtDateTime(r.createdAt)}</p>
              {r.notes && <p className="mt-1 truncate text-[11px] text-muted-foreground/70">📝 {r.notes}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={r.status as "pending" | "approved" | "rejected"} />
              {r.status === "pending" && (
                <>
                  <button onClick={() => onReview(r.id, "approved")} className="grid h-8 w-8 place-items-center rounded-full border border-success/40 text-success transition-colors hover:bg-success/10" aria-label="approve"><Check className="h-3.5 w-3.5" /></button>
                  <button onClick={() => onReview(r.id, "rejected")} className="grid h-8 w-8 place-items-center rounded-full border border-destructive/40 text-destructive transition-colors hover:bg-destructive/10" aria-label="reject"><X className="h-3.5 w-3.5" /></button>
                </>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">{lang === "ar" ? "لا توجد طلبات" : "No requests"}</p>}
      </div>
    </div>
  );
}
