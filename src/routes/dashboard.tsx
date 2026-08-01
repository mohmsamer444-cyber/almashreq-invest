import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownLeft, ArrowUpRight, Bell, PieChart as PieIcon, TrendingUp, Wallet } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Counter, Reveal } from "@/components/cinematic";
import { PLANS, allocation, fmt, fmtDate, portfolioSeries, statusLabel, useDemo } from "@/lib/demo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | منصة المشرق" },
      { name: "description", content: "تابع رصيدك ومحفظتك وأرباحك وآخر الطلبات داخل منصة المشرق." },
      { property: "og:title", content: "لوحة التحكم | منصة المشرق" },
      { property: "og:description", content: "محفظة لحظية، رسوم بيانية، وإشعارات داخل بيئة العرض التجريبية." },
    ],
  }),
  component: () => (
    <AppShell>
      <Dashboard />
    </AppShell>
  ),
});

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

function Dashboard() {
  const { user, requests, notifications } = useDemo();
  if (!user) return null;
  const plan = PLANS.find((p) => p.id === user.planId);
  const mine = requests.slice(0, 5);

  return (
    <>
      <PageHeader
        title={`أهلًا، ${user.fullName}`}
        subtitle="نظرة شاملة على محفظتك التجريبية وأدائها خلال آخر سبعة أشهر."
      />

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-3xl glass p-7">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">الرصيد الحالي</p>
                <p className="mt-2 font-display text-4xl text-ivory sm:text-5xl">
                  <Counter to={user.balance} /> <span className="text-lg text-gold">ج.م</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  الباقة النشطة: <span className="text-gold">{plan?.name ?? "بدون باقة"}</span>
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-success/15 px-3 py-1.5 text-xs text-success">
                +{((user.profit / Math.max(user.invested, 1)) * 100).toLocaleString("ar-EG", { maximumFractionDigits: 1 })}٪
              </span>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Metric icon={Wallet} label="رأس المال" value={fmt(user.invested)} />
              <Metric icon={TrendingUp} label="الأرباح" value={fmt(user.profit)} />
              <Metric icon={PieIcon} label="العائد اليومي" value={`${(plan?.dailyReturn ?? 0).toLocaleString("ar-EG", { minimumFractionDigits: 1 })}٪`} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="h-full rounded-3xl glass p-7">
            <h2 className="font-display text-lg text-ivory">توزيع المحفظة</h2>
            <div className="mt-3 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocation} dataKey="value" innerRadius={54} outerRadius={82} paddingAngle={3} stroke="none">
                    {allocation.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--foreground)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              {allocation.map((a, i) => (
                <li key={a.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  {a.name} · {a.value.toLocaleString("ar-EG")}٪
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="mt-5 rounded-3xl glass p-7">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="min-w-0 font-display text-lg text-ivory">أداء المحفظة (بالألف)</h2>
            <span className="shrink-0 text-xs text-muted-foreground">آخر ٧ أشهر</span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioSeries} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--foreground)",
                  }}
                />
                <Area type="monotone" dataKey="v" name="المحفظة" stroke="var(--chart-1)" strokeWidth={2} fill="url(#gv)" />
                <Area type="monotone" dataKey="p" name="الأرباح" stroke="var(--chart-2)" strokeWidth={2} fill="url(#gp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Reveal>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal delay={80}>
          <div className="rounded-3xl glass p-7">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <h2 className="min-w-0 font-display text-lg text-ivory">آخر العمليات</h2>
              <Link to="/requests" className="shrink-0 text-xs text-gold hover:underline">
                عرض الكل
              </Link>
            </div>
            <ul className="mt-5 space-y-2">
              {mine.map((r) => (
                <li
                  key={r.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border/50 p-4 transition-colors hover:border-gold/30"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                      r.kind === "deposit" ? "bg-success/12 text-success" : "bg-warning/12 text-warning"
                    }`}
                  >
                    {r.kind === "deposit" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ivory">
                      {r.kind === "deposit" ? "إيداع" : "سحب"} · {r.method}
                    </span>
                    <span className="block text-xs text-muted-foreground">{fmtDate(r.createdAt)}</span>
                  </span>
                  <span className="shrink-0 text-end">
                    <span className="block text-sm text-ivory">{fmt(r.amount)}</span>
                    <span className="block text-[11px] text-muted-foreground">{statusLabel[r.status]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="h-full rounded-3xl glass p-7">
            <h2 className="flex items-center gap-2 font-display text-lg text-ivory">
              <Bell className="h-4 w-4 text-gold" /> الإشعارات
            </h2>
            <ul className="mt-5 space-y-3">
              {notifications.slice(0, 4).map((n) => (
                <li key={n.id} className="rounded-2xl border border-border/50 p-4">
                  <p className="text-sm text-ivory">{n.title}</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">{n.body}</p>
                  <p className="mt-2 text-[11px] text-muted-foreground/70">{fmtDate(n.createdAt)}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="mt-5 rounded-3xl glass p-7">
          <h2 className="font-display text-lg text-ivory">الملف الشخصي</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["الاسم", user.fullName],
              ["رقم الهاتف", user.phone],
              ["تاريخ الانضمام", fmtDate(user.joinedAt)],
              ["الحالة", user.status === "active" ? "نشط" : "موقوف"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border/50 p-4">
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="mt-1.5 truncate text-sm text-ivory">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl glass-soft p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate text-sm text-ivory">{value}</span>
      </span>
    </div>
  );
}
