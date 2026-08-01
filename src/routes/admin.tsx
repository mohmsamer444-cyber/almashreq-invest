import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Check, Search, ShieldCheck, Users, Wallet, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Counter, Reveal } from "@/components/cinematic";
import { PLANS, fmt, fmtDate, statusLabel, useDemo, type RequestStatus } from "@/lib/demo";
import { StatusPill } from "@/components/status-pill";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة الإدارة | منصة المشرق" },
      { name: "description", content: "إدارة المستخدمين والطلبات والباقات والتقارير وسجل النشاط في منصة المشرق." },
      { property: "og:title", content: "لوحة الإدارة | منصة المشرق" },
      { property: "og:description", content: "بحث، فلاتر، رسوم بيانية، واعتماد الطلبات ضمن بيئة تجريبية." },
    ],
  }),
  component: () => (
    <AppShell>
      <Admin />
    </AppShell>
  ),
});

const TABS = ["overview", "users", "requests", "logs"] as const;
const TAB_LABEL: Record<(typeof TABS)[number], string> = {
  overview: "نظرة عامة",
  users: "المستخدمون",
  requests: "الطلبات",
  logs: "سجل النشاط",
};

const monthly = [
  { m: "فبراير", d: 320, w: 120 },
  { m: "مارس", d: 410, w: 160 },
  { m: "أبريل", d: 385, w: 210 },
  { m: "مايو", d: 520, w: 190 },
  { m: "يونيو", d: 610, w: 240 },
  { m: "يوليو", d: 740, w: 275 },
];

function Admin() {
  const { users, requests, logs, setRequestStatus, toggleUserStatus, notifications } = useDemo();
  const [tab, setTab] = useState<(typeof TABS)[number]>("overview");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<RequestStatus | "all">("all");

  const filteredUsers = useMemo(
    () => users.filter((u) => (u.fullName + u.phone).includes(q.trim())),
    [users, q],
  );
  const filteredRequests = useMemo(
    () =>
      requests.filter(
        (r) => (filter === "all" || r.status === filter) && (r.userName + r.method).includes(q.trim()),
      ),
    [requests, filter, q],
  );

  const totalAssets = users.reduce((a, u) => a + u.balance, 0);
  const pending = requests.filter((r) => r.status === "pending" || r.status === "review").length;

  return (
    <>
      <PageHeader title="لوحة الإدارة" subtitle="إدارة كاملة للمستخدمين والطلبات مع تقارير وسجل نشاط لحظي." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: Users, label: "المستخدمون", value: users.length, suffix: "" },
          { icon: Wallet, label: "إجمالي الأصول (ج.م)", value: totalAssets, suffix: "" },
          { icon: Activity, label: "طلبات معلّقة", value: pending, suffix: "" },
          { icon: ShieldCheck, label: "الباقات النشطة", value: PLANS.length, suffix: "" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 70}>
            <div className="lift grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-3xl glass p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/12 text-gold">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-2xl text-ivory">
                  <Counter to={s.value} />
                </span>
                <span className="block truncate text-xs text-muted-foreground">{s.label}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="flex min-w-0 items-center gap-3 rounded-full border border-border/70 bg-background/40 px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-gold" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث بالاسم أو الرقم أو الوسيلة…"
            className="min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="flex flex-wrap gap-1 rounded-full border border-border/60 p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-xs transition-all duration-300 ${
                tab === t ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory"
              }`}
            >
              {TAB_LABEL[t]}
            </button>
          ))}
        </div>
      </div>

      {tab === "overview" && (
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="rounded-3xl glass p-7">
              <h2 className="font-display text-lg text-ivory">الإيداعات مقابل السحوبات (بالألف)</h2>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthly} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="m" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: "var(--accent)", opacity: 0.25 }}
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--foreground)",
                      }}
                    />
                    <Bar dataKey="d" name="إيداع" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="w" name="سحب" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl glass p-7">
              <h2 className="font-display text-lg text-ivory">إشعارات النظام</h2>
              <ul className="mt-5 space-y-3">
                {notifications.slice(0, 5).map((n) => (
                  <li key={n.id} className="rounded-2xl border border-border/50 p-4">
                    <p className="text-sm text-ivory">{n.title}</p>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">{n.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      )}

      {tab === "users" && (
        <Reveal>
          <div className="mt-5 rounded-3xl glass p-7">
            <h2 className="font-display text-lg text-ivory">المستخدمون ({filteredUsers.length})</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] text-start text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground">
                    {["الاسم", "الهاتف", "الباقة", "الرصيد", "الحالة", "إجراء"].map((h) => (
                      <th key={h} className="pb-3 text-start font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-t border-border/40">
                      <td className="py-3 text-ivory">{u.fullName}</td>
                      <td className="py-3 text-muted-foreground">{u.phone}</td>
                      <td className="py-3 text-muted-foreground">{PLANS.find((p) => p.id === u.planId)?.name ?? "—"}</td>
                      <td className="py-3 text-gold">{fmt(u.balance)}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] ${
                            u.status === "active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          {u.status === "active" ? "نشط" : "موقوف"}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => {
                            toggleUserStatus(u.id);
                            toast.success("تم تحديث حالة المستخدم");
                          }}
                          className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
                        >
                          {u.status === "active" ? "إيقاف" : "تفعيل"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <p className="py-10 text-center text-sm text-muted-foreground">لا توجد نتائج مطابقة.</p>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {tab === "requests" && (
        <Reveal>
          <div className="mt-5 rounded-3xl glass p-7">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <h2 className="min-w-0 font-display text-lg text-ivory">الطلبات ({filteredRequests.length})</h2>
              <div className="flex flex-wrap gap-1">
                {(["all", "pending", "review", "approved", "rejected"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-3 py-1.5 text-[11px] transition-colors ${
                      filter === f ? "bg-gold/15 text-gold" : "border border-border/60 text-muted-foreground hover:text-ivory"
                    }`}
                  >
                    {f === "all" ? "الكل" : statusLabel[f]}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-5 space-y-2">
              {filteredRequests.map((r) => (
                <li key={r.id} className="grid gap-3 rounded-2xl border border-border/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ivory">
                      {r.userName} · {r.kind === "deposit" ? "إيداع" : "سحب"} · {fmt(r.amount)} ج.م
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.method} — {r.account} — {fmtDate(r.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill status={r.status} />
                    <button
                      onClick={() => {
                        setRequestStatus(r.id, "approved");
                        toast.success("تم اعتماد الطلب");
                      }}
                      className="grid h-8 w-8 place-items-center rounded-full border border-success/40 text-success transition-colors hover:bg-success/10"
                      aria-label="اعتماد"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setRequestStatus(r.id, "rejected");
                        toast("تم رفض الطلب");
                      }}
                      className="grid h-8 w-8 place-items-center rounded-full border border-destructive/40 text-destructive transition-colors hover:bg-destructive/10"
                      aria-label="رفض"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {filteredRequests.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">لا توجد طلبات مطابقة.</p>
            )}
          </div>
        </Reveal>
      )}

      {tab === "logs" && (
        <Reveal>
          <div className="mt-5 rounded-3xl glass p-7">
            <h2 className="font-display text-lg text-ivory">سجل النشاط</h2>
            <ol className="mt-6 space-y-5">
              {logs.map((l) => (
                <li key={l.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <span className="min-w-0">
                    <span className="block text-sm text-ivory">{l.action}</span>
                    <span className="block text-xs text-muted-foreground">
                      {l.actor} — {fmtDate(l.at)}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      )}
    </>
  );
}
