import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CalendarDays, Check, Crown, Percent, Sparkles, TrendingUp, Wallet } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { PACKAGES } from "@/lib/constants";
import { Button } from "@/components/ui";
import { cn, fmtMoney } from "@/lib/utils";

export function PackagesPage() {
  const { user, subscribePackage } = useStore();
  const { lang } = useSettings();

  if (!user) return null;

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "باقات الاستثمار" : "Investment Packages"}
        subtitle={
          lang === "ar"
            ? "اختر الباقة التي تناسب أهدافك — ٧ باقات متدرجة بعوائد يومية تصل إلى ١٫٨٪"
            : "Choose the package that fits your goals — 7 tiers with daily returns up to 1.8%"
        }
      />

      {/* Quick trust strip */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: Percent, label: lang === "ar" ? "عوائد يومية" : "Daily returns", value: lang === "ar" ? "حتى ١٫٨٪" : "Up to 1.8%" },
          { icon: CalendarDays, label: lang === "ar" ? "مدة مرنة" : "Flexible terms", value: lang === "ar" ? "من ٩٠ يوم" : "From 90 days" },
          { icon: Wallet, label: lang === "ar" ? "أرباح متوقعة" : "Expected profit", value: lang === "ar" ? "واضحة مسبقًا" : "Clear upfront" },
          { icon: Sparkles, label: lang === "ar" ? "إدارة احترافية" : "Pro management", value: lang === "ar" ? "على مدار الساعة" : "24/7" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl glass p-3.5 sm:p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] text-muted-foreground">{label}</p>
              <p className="truncate text-xs font-semibold text-ivory">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Packages grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((pkg, idx) => {
          const active = user.activePackageId === pkg.id;
          const dailyProfit = Math.round(pkg.amount * (pkg.dailyReturn / 100));
          const monthlyProfit = Math.round(dailyProfit * 30);
          const totalProfit = Math.round(dailyProfit * pkg.durationDays);
          return (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={idx}
              active={active}
              dailyProfit={dailyProfit}
              monthlyProfit={monthlyProfit}
              totalProfit={totalProfit}
              lang={lang}
              onSubscribe={() => {
                subscribePackage(pkg.id);
                toast.success(
                  lang === "ar"
                    ? `تم تفعيل باقة ${pkg.nameAr} بنجاح 🎉`
                    : `Package ${pkg.nameEn} activated 🎉`,
                );
              }}
            />
          );
        })}
      </div>
    </AppShell>
  );
}

interface CardProps {
  pkg: (typeof PACKAGES)[number];
  index: number;
  active: boolean;
  dailyProfit: number;
  monthlyProfit: number;
  totalProfit: number;
  lang: "ar" | "en";
  onSubscribe: () => void;
}

function PackageCard({ pkg, index, active, dailyProfit, monthlyProfit, totalProfit, lang, onSubscribe }: CardProps) {
  const { user } = useStore();
  const [flip, setFlip] = useState(false);
  const name = lang === "ar" ? pkg.nameAr : pkg.nameEn;
  const features = lang === "ar" ? pkg.featuresAr : pkg.featuresEn;

  return (
    <div
      className={cn(
        "lift group relative overflow-hidden rounded-[1.75rem] border p-[1px] transition-all duration-500",
        pkg.vip
          ? "border-gold/50 shadow-[0_18px_60px_-22px_oklch(0.78_0.14_80/0.55)]"
          : "border-border/60",
      )}
    >
      {/* Gradient top glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          pkg.vip
            ? "bg-[radial-gradient(600px_300px_at_50%_-10%,oklch(0.78_0.14_80/0.25),transparent)]"
            : "bg-[radial-gradient(600px_300px_at_50%_-10%,oklch(0.76_0.14_74/0.14),transparent)]",
        )}
      />
      <div className="relative flex h-full flex-col rounded-[calc(1.75rem-1px)] bg-card/80 p-6 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              {lang === "ar" ? "باقة استثمارية" : "Investment plan"}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-bold text-ivory">{name}</h3>
          </div>
          {pkg.vip && (
            <span className="flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold">
              <Crown className="h-3 w-3" /> VIP
            </span>
          )}
        </div>

        {/* Amount + returns */}
        <div className="mt-4 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/10 to-transparent p-4">
          <p className="text-[11px] text-muted-foreground">{lang === "ar" ? "الحد الأدنى للاستثمار" : "Minimum investment"}</p>
          <p className="mt-1 font-display text-2xl font-bold text-gold-gradient" dir="ltr">
            {fmtMoney(pkg.amount, "en")} <span className="text-sm">{lang === "ar" ? "ج.م" : "EGP"}</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-background/50 p-2.5">
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-success">
                <Percent className="h-3.5 w-3.5" /> {pkg.dailyReturn}%
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{lang === "ar" ? "عائد يومي" : "Daily return"}</p>
            </div>
            <div className="rounded-xl bg-background/50 p-2.5">
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-ivory">
                <CalendarDays className="h-3.5 w-3.5" /> {pkg.durationDays}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{lang === "ar" ? "يوم" : "days"}</p>
            </div>
          </div>
        </div>

        {/* Expected profit */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <MiniStat label={lang === "ar" ? "يوميًا" : "Daily"} value={dailyProfit} lang={lang} />
          <MiniStat label={lang === "ar" ? "شهريًا" : "Monthly"} value={monthlyProfit} lang={lang} />
          <MiniStat label={lang === "ar" ? "إجمالي" : "Total"} value={totalProfit} lang={lang} highlight />
        </div>

        {/* Features */}
        <ul className="mt-4 space-y-2">
          {features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={cn("grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full", pkg.vip ? "bg-gold/15 text-gold" : "bg-success/12 text-success")}>
                <Check className="h-3 w-3" />
              </span>
              <span className="leading-5">{f}</span>
            </li>
          ))}
        </ul>

        {/* Subscribe */}
        <div className="mt-5 flex-1" />
        <Button
          fullWidth
          size="lg"
          variant={pkg.vip ? "gold" : "outline"}
          className={cn(pkg.vip ? "" : "hover:border-gold/60")}
          onClick={onSubscribe}
        >
          {active ? (
            <>
              <Sparkles className="h-4 w-4" />
              {lang === "ar" ? "باقتك النشطة ✓" : "Active package ✓"}
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4" />
              {lang === "ar" ? "اشترك الآن" : "Subscribe now"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function MiniStat({ label, value, lang, highlight }: { label: string; value: number; lang: "ar" | "en"; highlight?: boolean }) {
  return (
    <div className={cn("rounded-xl border p-2 text-center", highlight ? "border-gold/30 bg-gold/8" : "border-border/50 bg-background/40")}>
      <p className={cn("text-[10px] text-muted-foreground")}>{label}</p>
      <p className={cn("mt-0.5 text-xs font-bold", highlight ? "text-gold" : "text-ivory")} dir="ltr">
        {fmtMoney(value, "en")}
      </p>
    </div>
  );
}

