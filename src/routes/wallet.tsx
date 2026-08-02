import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  Crown,
  Percent,
  Sparkles,
  TrendingUp,
  Wallet as WalletIcon,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { StatCard } from "@/components/shared/stat-card";
import { PortfolioChart, AllocationChart } from "@/components/shared/charts";
import { PACKAGES, PORTFOLIO_TREND, ALLOCATION } from "@/lib/constants";
import { Button, Badge, EmptyState, Progress } from "@/components/ui";
import { cn, fmtMoney, fmtDateTime } from "@/lib/utils";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "المحفظة | حساب المشرق" },
      {
        name: "description",
        content:
          "محفظتك الاستثمارية — الرصيد الأرباح الباقة النشطة وسجل العمليات.",
      },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  const { user, transactions } = useStore();
  const { lang } = useSettings();

  if (!user) return null;

  const myTx = transactions.filter((t) => t.userId === user.id);
  const pkg = PACKAGES.find((p) => p.id === user.activePackageId);

  const dailyProfit = pkg
    ? Math.round(pkg.amount * (pkg.dailyReturn / 100))
    : 0;
  const pendingProfit =
    pkg && user.investmentStartedAt
      ? Math.round(
          dailyProfit *
            Math.min(
              Math.floor(
                (Date.now() - new Date(user.investmentStartedAt).getTime()) /
                  86400000,
              ),
              pkg.durationDays,
            ),
        )
      : 0;

  const activePackage = pkg
    ? {
        name: lang === "ar" ? pkg.nameAr : pkg.nameEn,
        daily: pkg.dailyReturn,
        amount: pkg.amount,
        duration: pkg.durationDays,
        vip: pkg.vip,
      }
    : null;

  const progress =
    pkg && user.investmentStartedAt
      ? Math.min(
          100,
          Math.round(
            ((Date.now() - new Date(user.investmentStartedAt).getTime()) /
              86400000 /
              pkg.durationDays) *
              100,
          ),
        )
      : 0;

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "المحفظة" : "Wallet"}
        subtitle={
          lang === "ar"
            ? "تابع رصيدك وأرباحك وباقتك النشطة في مكان واحد"
            : "Track your balance, profits, and active package in one place"
        }
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-b from-gold/15 to-transparent p-6 sm:p-8">
        <div className="pointer-events-none absolute -end-10 -top-10 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -start-10 h-56 w-56 rounded-full bg-emerald/10 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-sm text-gold">
              <WalletIcon className="h-4 w-4" />
              {lang === "ar" ? "الرصيد الكلي" : "Total balance"}
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-ivory sm:text-5xl">
              {fmtMoney(user.balance, lang)}{" "}
              <span className="text-lg text-gold">ج.م</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="success">
                <TrendingUp className="h-3 w-3" />
                {lang === "ar" ? "إجمالي الأرباح: " : "Total profit: "}
                {fmtMoney(user.totalProfit, lang)} ج.م
              </Badge>
              <Badge tone="gold">
                <Percent className="h-3 w-3" />
                {lang === "ar" ? "المستثمر: " : "Invested: "}
                {fmtMoney(user.invested, lang)} ج.م
              </Badge>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/transfers">
              <Button variant="gold" size="lg">
                <ArrowDownLeft className="h-4 w-4" />
                {lang === "ar" ? "إيداع" : "Deposit"}
              </Button>
            </Link>
            <Link to="/transfers">
              <Button variant="outline" size="lg">
                <ArrowUpRight className="h-4 w-4" />
                {lang === "ar" ? "سحب" : "Withdraw"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label={lang === "ar" ? "الرصيد المتاح" : "Available balance"}
          value={user.balance}
          suffix="ج.م"
          icon={<WalletIcon className="h-5 w-5" />}
          accent="gold"
        />
        <StatCard
          label={lang === "ar" ? "إجمالي الأرباح" : "Total profit"}
          value={user.totalProfit}
          suffix="ج.م"
          icon={<TrendingUp className="h-5 w-5" />}
          accent="emerald"
        />
        <StatCard
          label={lang === "ar" ? "أرباح معلقة" : "Pending profit"}
          value={pendingProfit}
          suffix="ج.م"
          icon={<Sparkles className="h-5 w-5" />}
          accent="violet"
        />
        <StatCard
          label={lang === "ar" ? "المبلغ المستثمر" : "Invested amount"}
          value={user.invested}
          suffix="ج.م"
          icon={<Crown className="h-5 w-5" />}
          accent="blue"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl glass p-5 sm:p-6">
          <h3 className="font-display text-lg text-ivory">
            {lang === "ar" ? "الباقة النشطة" : "Active package"}
          </h3>
          {activePackage ? (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-2xl",
                      activePackage.vip
                        ? "bg-gold/15 text-gold"
                        : "bg-emerald/12 text-emerald",
                    )}
                  >
                    {activePackage.vip ? (
                      <Crown className="h-5 w-5" />
                    ) : (
                      <Sparkles className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ivory">
                      {activePackage.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {lang === "ar" ? "عائد يومي" : "Daily return"}:{" "}
                      {activePackage.daily}%
                    </p>
                  </div>
                </div>
                {activePackage.vip && <Badge tone="gold">VIP</Badge>}
              </div>

              <div className="mt-5 rounded-2xl border border-border/50 bg-background/40 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {lang === "ar" ? "مدة الاستثمار" : "Investment term"}
                  </span>
                  <span className="font-semibold text-ivory">
                    <CalendarDays className="me-1 inline h-3.5 w-3.5 text-gold" />
                    {activePackage.duration} {lang === "ar" ? "يوم" : "days"}
                  </span>
                </div>
                <div className="mt-3">
                  <Progress value={progress} />
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {lang === "ar" ? "اكتمل" : "Completed"}: {progress}%
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-background/40 p-3">
                  <p className="text-sm font-bold text-success">
                    {fmtMoney(dailyProfit, lang)} ج.م
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {lang === "ar" ? "ربح يومي" : "Daily profit"}
                  </p>
                </div>
                <div className="rounded-xl bg-background/40 p-3">
                  <p className="text-sm font-bold text-gold">
                    {fmtMoney(pendingProfit, lang)} ج.م
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {lang === "ar" ? "أرباح متراكمة" : "Accumulated"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<Sparkles className="h-8 w-8" />}
              title={lang === "ar" ? "لا توجد باقة نشطة" : "No active package"}
              body={
                lang === "ar"
                  ? "اشترك في باقة استثمارية لبدء تحقيق الأرباح"
                  : "Subscribe to an investment package to start earning"
              }
            />
          )}
          {!activePackage && (
            <Link to="/investment" className="mt-4 block">
              <Button fullWidth>
                <Sparkles className="h-4 w-4" />
                {lang === "ar" ? "استكشف الباقات" : "Explore packages"}
              </Button>
            </Link>
          )}
        </div>

        <div className="rounded-3xl glass p-5 sm:p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-ivory">
                {lang === "ar" ? "نمو المحفظة" : "Portfolio growth"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {lang === "ar" ? "آخر ٧ أشهر" : "Last 7 months"}
              </p>
            </div>
            <span className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success">
              +38٪
            </span>
          </div>
          <PortfolioChart data={PORTFOLIO_TREND} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl glass p-5 sm:p-6">
          <h3 className="font-display text-lg text-ivory">
            {lang === "ar" ? "توزيع المحفظة" : "Allocation"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {lang === "ar" ? "حسب فئات الأصول" : "By asset class"}
          </p>
          <AllocationChart data={ALLOCATION} />
          <div className="mt-3 space-y-2">
            {ALLOCATION.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: a.color }}
                  />
                  <span className="text-muted-foreground">{a.name}</span>
                </span>
                <span className="font-semibold text-ivory">{a.value}٪</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl glass p-5 sm:p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg text-ivory">
              {lang === "ar" ? "سجل العمليات" : "Transaction history"}
            </h3>
            <Link
              to="/transfers"
              className="flex items-center gap-1 text-xs text-gold transition-colors hover:text-gold-soft"
            >
              {lang === "ar" ? "إيداع / سحب" : "Transfers"}
            </Link>
          </div>
          {myTx.length === 0 ? (
            <EmptyState
              icon={<WalletIcon className="h-8 w-8" />}
              title={
                lang === "ar" ? "لا توجد عمليات بعد" : "No transactions yet"
              }
              body={
                lang === "ar"
                  ? "ستظهر عملياتك هنا عند إجراء أي إيداع أو سحب"
                  : "Your transactions will appear here"
              }
            />
          ) : (
            <div className="divide-y divide-border/40">
              {myTx.slice(0, 8).map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm",
                        t.type === "withdrawal"
                          ? "bg-destructive/10 text-destructive"
                          : t.type === "subscription"
                            ? "bg-gold/10 text-gold"
                            : "bg-success/10 text-success",
                      )}
                    >
                      {t.type === "withdrawal" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : t.type === "subscription" ? (
                        <Sparkles className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ivory">
                        {t.description}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {fmtDateTime(t.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold",
                      t.type === "withdrawal"
                        ? "text-destructive"
                        : "text-success",
                    )}
                  >
                    {t.type === "withdrawal" ? "-" : "+"}
                    {fmtMoney(t.amount, lang)} ج.م
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
