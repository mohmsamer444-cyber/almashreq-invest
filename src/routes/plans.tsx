import { createFileRoute } from "@tanstack/react-router";
import { Check, Crown, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Reveal } from "@/components/cinematic";
import { PLANS, fmt, useDemo, type PlanTier } from "@/lib/demo";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "الباقات الاستثمارية | منصة المشرق" },
      { name: "description", content: "سبع باقات استثمارية تجريبية من الفضية حتى VIP المشرق بعوائد ومزايا متدرجة." },
      { property: "og:title", content: "الباقات الاستثمارية | منصة المشرق" },
      { property: "og:description", content: "قارن الباقات، العوائد اليومية، والمزايا داخل بيئة العرض." },
    ],
  }),
  component: () => (
    <AppShell>
      <Plans />
    </AppShell>
  ),
});

function Plans() {
  const { user, subscribePlan } = useDemo();

  return (
    <>
      <PageHeader
        title="الباقات الاستثمارية"
        subtitle="اختر الباقة المناسبة — التفعيل هنا تجريبي ويحدّث محفظتك داخل المتصفح فقط."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {PLANS.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <PlanCard
              plan={p}
              active={user?.planId === p.id}
              onSelect={() => {
                subscribePlan(p.id);
                toast.success(`تم تفعيل ${p.name} (عرض تجريبي)`);
              }}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-6 rounded-3xl glass p-7 geo-texture">
          <h2 className="font-display text-xl text-ivory">مقارنة سريعة</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-start text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="pb-3 text-start font-normal">الباقة</th>
                  <th className="pb-3 text-start font-normal">رأس المال</th>
                  <th className="pb-3 text-start font-normal">العائد اليومي</th>
                  <th className="pb-3 text-start font-normal">المدة</th>
                  <th className="pb-3 text-start font-normal">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {PLANS.map((p) => (
                  <tr key={p.id} className="border-t border-border/40">
                    <td className="py-3 text-ivory">{p.name}</td>
                    <td className="py-3 text-muted-foreground">{fmt(p.amount)} ج.م</td>
                    <td className="py-3 text-gold">{p.dailyReturn.toLocaleString("ar-EG", { minimumFractionDigits: 1 })}٪</td>
                    <td className="py-3 text-muted-foreground">{p.durationDays} يوم</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] ${
                          user?.planId === p.id ? "bg-success/15 text-success" : "bg-muted/60 text-muted-foreground"
                        }`}
                      >
                        {user?.planId === p.id ? "مفعّلة" : "متاحة"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </>
  );
}

function PlanCard({ plan, active, onSelect }: { plan: PlanTier; active: boolean; onSelect: () => void }) {
  return (
    <article
      className={`lift shine grain relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 ${
        plan.vip ? "border-gold/35" : ""
      }`}
    >
      {plan.vip && (
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
      )}
      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <h3 className="min-w-0 truncate font-display text-xl text-ivory">{plan.name}</h3>
        {plan.badge && (
          <span className="shrink-0 rounded-full bg-gold/15 px-3 py-1 text-[11px] text-gold">{plan.badge}</span>
        )}
      </div>

      <p className="relative mt-5 font-display text-3xl text-gold-gradient">{fmt(plan.amount)} ج.م</p>
      <p className="relative mt-2 text-sm text-muted-foreground">
        عائد يومي {plan.dailyReturn.toLocaleString("ar-EG", { minimumFractionDigits: 1 })}٪ · مدة {plan.durationDays} يوم
      </p>

      <div className="relative mt-5 rounded-2xl glass-soft p-4">
        <p className="text-xs text-muted-foreground">إجمالي العائد المتوقع (تجريبي)</p>
        <p className="mt-1 font-display text-lg text-ivory">
          {fmt(Math.round((plan.amount * plan.dailyReturn * plan.durationDays) / 100))} ج.م
        </p>
      </div>

      <ul className="relative mt-5 flex-1 space-y-2.5 text-sm text-muted-foreground">
        {plan.perks.map((k) => (
          <li key={k} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span className="min-w-0">{k}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={active}
        className={`relative mt-7 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02] ${
          active
            ? "cursor-default border border-success/40 bg-success/10 text-success"
            : plan.vip
              ? "text-primary-foreground"
              : "border border-gold/40 text-gold hover:bg-gold/10"
        }`}
        style={!active && plan.vip ? { backgroundImage: "var(--gradient-gold)" } : undefined}
      >
        {active ? (
          <>
            <Check className="h-4 w-4" /> الباقة المفعّلة
          </>
        ) : plan.vip ? (
          <>
            <Crown className="h-4 w-4" /> طلب دعوة VIP
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> تفعيل الباقة
          </>
        )}
      </button>
    </article>
  );
}
