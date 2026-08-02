import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowLeftRight, Crown, Sparkles, Users, Wallet, TrendingUp, Banknote } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { StatCard } from "@/components/shared/stat-card";
import { PortfolioChart, AllocationChart } from "@/components/shared/charts";
import { TestimonialCarousel } from "@/components/shared/testimonial-carousel";
import { NewsTicker } from "@/components/shared/news-ticker";
import { HeroBanner } from "@/components/shared/hero-banner";
import { PACKAGES, PORTFOLIO_TREND, ALLOCATION, PLATFORM_STATS } from "@/lib/constants";
import { Button } from "@/components/ui";
import { fmtMoney, fmtDateTime } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الرئيسية | حساب المشرق" },
      { name: "description", content: "حساب المشرق — لوحة تحكم استثمارية فاخرة." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { user, transactions } = useStore();
  const { lang } = useSettings();

  if (!user) return null;

  const myTx = transactions.filter((t) => t.userId === user.id).slice(0, 6);
  const pkg = PACKAGES.find((p) => p.id === user.activePackageId);
  const activePackage = pkg
    ? { name: lang === "ar" ? pkg.nameAr : pkg.nameEn, daily: pkg.dailyReturn }
    : null;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return lang === "ar" ? "صباح الخير" : "Good morning";
    if (h < 17) return lang === "ar" ? "مساء الخير" : "Good afternoon";
    return lang === "ar" ? "مساء النور" : "Good evening";
  })();

  return (
    <AppShell>
      {/* Hero banner image */}
      <HeroBanner className="mb-6 animate-reveal" />

      {/* Welcome hero */}
      <div className="animate-reveal relative overflow-hidden rounded-[2rem] glass p-6 sm:p-10">
        <div className="pointer-events-none absolute -end-10 -top-10 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -start-10 h-56 w-56 rounded-full bg-emerald/10 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm text-gold">
              {greeting} 👋 {user.fullName.split(" ")[0]}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ivory sm:text-5xl">
              {lang === "ar" ? "أهلاً بك في" : "Welcome to"}{" "}
              <span className="text-gold-gradient">حساب المشرق</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {lang === "ar"
                ? "إدارة استثماراتك وأرباحك بكل سهولة وأمان."
                : "Manage your investments and profits with ease and security."}
            </p>
            {activePackage && (
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 text-[11px] font-semibold text-success">
                <Sparkles className="h-3.5 w-3.5" />
                {lang === "ar"
                  ? `باقتك النشطة: ${activePackage.name} — عائد يومي ${activePackage.daily}٪`
                  : `Active package: ${activePackage.name} — ${activePackage.daily}% daily`}
              </span>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/investment">
                <Button size="lg">
                  <Sparkles className="h-4 w-4" />
                  {lang === "ar" ? "اكتشف الباقات" : "Explore packages"}
                </Button>
              </Link>
              <Link to="/transfers">
                <Button variant="outline" size="lg">
                  <ArrowLeftRight className="h-4 w-4" />
                  {lang === "ar" ? "إيداع / سحب" : "Deposit / Withdraw"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Balance card */}
          <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/15 to-transparent p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{lang === "ar" ? "الرصيد الكلي" : "Total balance"}</span>
              <Wallet className="h-5 w-5 text-gold" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-ivory">
              {fmtMoney(user.balance, lang)} <span className="text-sm text-gold">ج.م</span>
            </p>
            <div className="mt-4 space-y-2 border-t border-gold/20 pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{lang === "ar" ? "المستثمر" : "Invested"}</span>
                <span className="font-semibold text-ivory">{fmtMoney(user.invested, lang)} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{lang === "ar" ? "إجمالي الأرباح" : "Total profit"}</span>
                <span className="font-semibold text-success">{fmtMoney(user.totalProfit, lang)} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Stats (animated counters) */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label={lang === "ar" ? "المستثمرون النشطون" : "Active investors"} value={PLATFORM_STATS.activeInvestors} icon={<Users className="h-5 w-5" />} accent="gold" />
        <StatCard label={lang === "ar" ? "إجمالي الاستثمارات" : "Total investments"} value={PLATFORM_STATS.totalInvestments} suffix="ج.م" icon={<TrendingUp className="h-5 w-5" />} accent="emerald" />
        <StatCard label={lang === "ar" ? "سحوبات ناجحة" : "Successful withdrawals"} value={PLATFORM_STATS.successfulWithdrawals} icon={<Banknote className="h-5 w-5" />} accent="blue" />
        <StatCard label={lang === "ar" ? "أرباح يومية" : "Daily profit"} value={PLATFORM_STATS.dailyProfit} suffix="ج.م" icon={<Crown className="h-5 w-5" />} accent="violet" />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl glass p-5 sm:p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-ivory">{lang === "ar" ? "نمو المحفظة" : "Portfolio growth"}</h3>
              <p className="text-xs text-muted-foreground">{lang === "ar" ? "آخر ٧ أشهر" : "Last 7 months"}</p>
            </div>
            <span className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success">+38٪</span>
          </div>
          <PortfolioChart data={PORTFOLIO_TREND} />
        </div>

        <div className="rounded-3xl glass p-5 sm:p-6">
          <h3 className="font-display text-lg text-ivory">{lang === "ar" ? "توزيع المحفظة" : "Allocation"}</h3>
          <p className="text-xs text-muted-foreground">{lang === "ar" ? "حسب فئات الأصول" : "By asset class"}</p>
          <AllocationChart data={ALLOCATION} />
          <div className="mt-3 space-y-2">
            {ALLOCATION.map((a) => (
              <div key={a.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
                  <span className="text-muted-foreground">{a.name}</span>
                </span>
                <span className="font-semibold text-ivory">{a.value}٪</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions + News */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl glass p-5 sm:p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg text-ivory">{lang === "ar" ? "آخر العمليات" : "Recent transactions"}</h3>
            <Link to="/wallet" className="flex items-center gap-1 text-xs text-gold transition-colors hover:text-gold-soft">
              {lang === "ar" ? "عرض الكل" : "View all"} <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
          {myTx.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">{lang === "ar" ? "لا توجد عمليات بعد" : "No transactions yet"}</p>
          ) : (
            <div className="divide-y divide-border/40">
              {myTx.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm ${
                        t.type === "deposit" || t.type === "profit"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {t.type === "withdrawal" ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ivory">{t.description}</p>
                      <p className="text-[11px] text-muted-foreground">{fmtDateTime(t.createdAt)}</p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      t.type === "withdrawal" ? "text-destructive" : "text-success"
                    }`}
                  >
                    {t.type === "withdrawal" ? "-" : "+"}
                    {fmtMoney(t.amount, lang)} ج.م
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <NewsTicker />
      </div>

      {/* Testimonials */}
      <div className="mt-12">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Testimonials</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ivory sm:text-3xl">
            {lang === "ar" ? "ماذا يقول عملاؤنا" : "What our clients say"}
          </h2>
          <div className="gold-line mx-auto mt-5 max-w-32" />
        </div>
        <TestimonialCarousel />
      </div>
    </AppShell>
  );
}


