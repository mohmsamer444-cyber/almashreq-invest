import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  ChevronDown,
  Gem,
  Menu,
  ShieldCheck,
  Sparkles,
  Timer,
  Wallet,
  X,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Counter, DemoRibbon, Logo, Reveal, Typing } from "@/components/cinematic";
import { PLANS, fmt } from "@/lib/demo";
import { TestimonialsSection } from "@/components/testimonials";
import { AppShell, PageHeader } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "منصة المشرق | إدارة ثروات بتجربة سينمائية" },
      {
        name: "description",
        content:
          "منصة المشرق: بيئة عرض تجريبية فاخرة لإدارة المحافظ والباقات الاستثمارية مع لوحة تحكم ولوحة إدارة كاملة.",
      },
      { property: "og:title", content: "منصة المشرق | إدارة ثروات بتجربة سينمائية" },
      {
        property: "og:description",
        content: "باقات استثمارية، محفظة لحظية، وطلبات إيداع وسحب — بيئة تجريبية متكاملة.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <Landing />
    </AppShell>
  ),
});

const SECTIONS = [
  { href: "#features", label: "المزايا" },
  { href: "#plans", label: "الباقات" },
  { href: "#faq", label: "الأسئلة" },
];

const FEATURES = [
  { icon: Wallet, title: "محفظة لحظية", body: "تتبع الرصيد والأرباح والتوزيع لحظة بلحظة عبر واجهة واحدة واضحة." },
  { icon: ShieldCheck, title: "حوكمة وأمان", body: "سجل نشاط كامل، صلاحيات متدرجة، ومراجعة يدوية لكل طلب حساس." },
  { icon: BarChart3, title: "تحليلات عميقة", body: "رسوم بيانية للأداء الشهري ونِسب التوزيع ومؤشرات النمو التراكمي." },
  { icon: Timer, title: "تنفيذ سريع", body: "دورة طلب من التقديم حتى الاعتماد بخط زمني مرئي وتحديثات فورية." },
  { icon: Gem, title: "تجربة فاخرة", body: "لغة بصرية سينمائية بألوان الفحم والزيتون والذهب الدافئ." },
  { icon: Sparkles, title: "بيانات تجريبية حية", body: "كل الأرقام والحركات تتولد ديناميكيًا لعرض واقعي دون أي مخاطرة." },
];

const FAQ = [
  { q: "هل هذه منصة حقيقية للاستثمار؟", a: "لا. منصة المشرق بيئة عرض تجريبية بالكامل. جميع الأرصدة والطلبات والتقارير بيانات وهمية تعمل داخل متصفحك فقط." },
  { q: "كيف أدخل إلى لوحة التحكم؟", a: "أنشئ حسابًا تجريبيًا من صفحة الدخول بالاسم ورقم الهاتف وكلمة المرور، وسيتم تحويلك مباشرة إلى لوحة التحكم." },
  { q: "كيف أصل إلى لوحة الإدارة؟", a: "لوحة الإدارة متاحة للعرض من القائمة العلوية، وتُظهر إدارة المستخدمين والطلبات والتقارير وسجل النشاط." },
  { q: "ما وسائل الدفع المدعومة في العرض؟", a: "فودافون كاش، أورانج كاش، اتصالات كاش، إنستا باي، والتحويل البنكي — جميعها ضمن سيناريو تجريبي." },
  { q: "هل بياناتي محفوظة؟", a: "تُخزَّن محليًا في متصفحك فقط ويمكنك مسحها في أي وقت بتسجيل الخروج وحذف بيانات الموقع." },
];

function Landing() {
  const [open, setOpen] = useState(false);

  return (
    <div className="grain min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
          <Link to="/" className="min-w-0">
            <Logo size={38} />
          </Link>
          <nav className="hidden items-center justify-center gap-2 md:flex">
            {SECTIONS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/40 hover:text-ivory"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/auth"
              className="shine hidden rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-flex"
              style={{ backgroundImage: "var(--gradient-gold)" }}
            >
              ابدأ الآن
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-border/70 md:hidden"
              aria-label="القائمة"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="animate-reveal border-t border-border/50 px-4 py-3 md:hidden">
            {SECTIONS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-accent/40"
              >
                {s.label}
              </a>
            ))}
            <Link
              to="/auth"
              className="mt-2 block rounded-xl bg-gold/15 px-3 py-3 text-center text-sm text-gold"
            >
              ابدأ الآن
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3 animate-reveal">
                <DemoRibbon />
                <span className="text-xs tracking-[0.3em] text-muted-foreground">EST. ٢٠٢٦ — CAIRO</span>
              </div>
              <h1 className="animate-fade-blur font-display text-4xl leading-[1.3] text-ivory sm:text-6xl sm:leading-[1.25]">
                إدارة ثروتك
                <br />
                <span className="text-gold-gradient">
                  <Typing words={["بأناقة شرقية", "بشفافية كاملة", "بتقنية حديثة"]} />
                </span>
              </h1>
              <p className="mt-7 max-w-xl animate-reveal text-base leading-8 text-muted-foreground [animation-delay:200ms]">
                منصة المشرق تجمع بين لغة بصرية فاخرة ومحرّك عرض واقعي: محافظ، باقات استثمارية، طلبات
                إيداع وسحب، ولوحة إدارة كاملة — كل ذلك في بيئة تجريبية آمنة تمامًا.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3 animate-reveal [animation-delay:320ms]">
                <Link
                  to="/auth"
                  className="shine inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
                >
                  ادخل المنصة
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <a
                  href="#plans"
                  className="rounded-full border border-border/70 px-7 py-3.5 text-sm text-ivory transition-colors hover:border-gold/50 hover:text-gold"
                >
                  استعرض الباقات
                </a>
              </div>
            </div>

            <div className="relative animate-fade-blur [animation-delay:250ms]">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gold/5 blur-3xl" />
              <div className="relative rounded-[2rem] glass p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">إجمالي المحفظة</p>
                    <p className="mt-1 font-display text-3xl text-ivory">
                      <Counter to={1847320} /> <span className="text-base text-gold">ج.م</span>
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-success/15 px-3 py-1 text-xs text-success">+١٨٫٤٪</span>
                </div>
                <div className="mt-6 flex h-36 items-end gap-2">
                  {[38, 52, 45, 68, 61, 84, 72, 96, 88, 112, 104, 128].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-olive/40 to-gold/70"
                      style={{ height: `${(h / 128) * 100}%`, animation: `reveal-up .8s ${i * 60}ms both` }}
                    />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    ["نشط", "الحالة"],
                    ["٢٫٧٪", "عائد يومي"],
                    ["١٢٠ يوم", "المدة"],
                  ].map(([a, b]) => (
                    <div key={b} className="rounded-2xl glass-soft p-3 text-center">
                      <p className="font-display text-sm text-gold">{a}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { to: 128400, suffix: "+", label: "مستخدم تجريبي" },
              { to: 3.2, suffix: "٪", label: "أعلى عائد يومي", decimals: 1 },
              { to: 7, suffix: "", label: "باقات استثمارية" },
              { to: 99.9, suffix: "٪", label: "جاهزية النظام", decimals: 1 },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="lift rounded-3xl glass p-6 text-center">
                  <p className="font-display text-4xl text-gold-gradient">
                    <Counter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ACTIVITY FEED */}
          <div className="mt-20 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <Reveal delay={90}>
              <div className="rounded-3xl glass p-8 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-ivory">آخر العمليات</h3>
                    <p className="text-xs text-muted-foreground">تحديث لحظي للنشاط</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle2, color: "text-success", title: "إيداع موافق عليه", desc: "أحمد محمد +500 ج.م", time: "منذ 5 دقائق" },
                    { icon: TrendingUp, color: "text-gold", title: "ربح يومي محقق", desc: "محفظتك +127.50 ج.م", time: "منذ 15 دقيقة" },
                    { icon: CheckCircle2, color: "text-success", title: "سحب مكتمل", desc: "سارة عبد الله -250 ج.م", time: "منذ 35 دقيقة" },
                    { icon: AlertCircle, color: "text-warning", title: "طلب قيد المراجعة", desc: "محمد علي +1000 ج.م", time: "منذ ساعة" },
                  ].map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer">
                        <Icon className={`w-4 h-4 mt-0.5 ${activity.color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-ivory font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{activity.desc}</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl glass p-8 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-ivory">أداء المنصة</h3>
                    <p className="text-xs text-muted-foreground">إحصائيات شاملة</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "إجمالي الأرصدة", value: "4.7M", percent: 89, color: "from-gold/40 to-gold/20" },
                    { label: "عمليات اليوم", value: "284", percent: 74, color: "from-success/40 to-success/20" },
                    { label: "معدل الموافقة", value: "98.7%", percent: 98, color: "from-accent/40 to-accent/20" },
                    { label: "وقت الاستجابة", value: "42ms", percent: 95, color: "from-warning/40 to-warning/20" },
                  ].map((metric, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{metric.label}</span>
                        <span className="font-semibold text-ivory">{metric.value}</span>
                      </div>
                      <div className="w-full h-2 bg-background/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000`}
                          style={{ width: `${metric.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-2 gap-4">
                  {[
                    { label: "المستخدمون النشطون", value: "12.4K" },
                    { label: "إجمالي العائدات", value: "156.2K" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <p className="font-display text-lg text-gold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-24 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm tracking-[0.3em] text-gold">المزايا</p>
            <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">منظومة متكاملة، بتفاصيل مصقولة</h2>
            <div className="gold-line mt-6 max-w-40" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <article className="lift shine group h-full rounded-3xl glass p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/12 text-gold transition-transform duration-500 group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-ivory">{f.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* PLANS */}
      <section id="plans" className="scroll-mt-24 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-sm tracking-[0.3em] text-gold">الباقات</p>
            <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">اختر مستواك في المشرق</h2>
            <div className="gold-line mt-6 max-w-40" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PLANS.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <article className="lift shine flex h-full flex-col rounded-3xl glass p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-ivory">{p.name}</h3>
                    {p.badge && (
                      <span className="shrink-0 rounded-full bg-gold/15 px-3 py-1 text-[11px] text-gold">{p.badge}</span>
                    )}
                  </div>
                  <p className="mt-5 font-display text-3xl text-gold-gradient">{fmt(p.amount)} ج.م</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    عائد يومي {p.dailyReturn.toLocaleString("ar-EG", { minimumFractionDigits: 1 })}٪ · {p.durationDays} يوم
                  </p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                    {p.perks.map((k) => (
                      <li key={k} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {k}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/plans"
                    className="mt-7 rounded-full border border-gold/40 py-2.5 text-center text-sm text-gold transition-colors hover:bg-gold/10"
                  >
                    التفاصيل
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-6 overflow-hidden rounded-3xl glass p-8 text-center geo-texture">
              <p className="text-xs tracking-[0.3em] text-gold">VIP</p>
              <h3 className="mt-3 font-display text-3xl text-ivory">VIP المشرق — بالدعوة فقط</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                محفظة مُدارة بالكامل، مستشار خاص، وأولوية قصوى في التنفيذ مع عائد يومي يصل إلى ٣٫٢٪.
              </p>
              <Link
                to="/plans"
                className="shine mt-7 inline-flex rounded-full px-8 py-3 text-sm font-semibold text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                استعرض VIP
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-sm tracking-[0.3em] text-gold">الأسئلة الشائعة</p>
            <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">كل ما تحتاج معرفته</h2>
            <div className="gold-line mt-6 max-w-40" />
          </Reveal>
          <div className="mt-10 space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Logo size={44} />
              <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                منصة المشرق — تجربة عرض متكاملة تحاكي منصات إدارة الثروات الحديثة بلغة بصرية شرقية فاخرة.
              </p>
            </div>
            <div>
              <p className="font-display text-ivory">المنصة</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-gold">لوحة التحكم</Link></li>
                <li><Link to="/plans" className="hover:text-gold">الباقات</Link></li>
                <li><Link to="/requests" className="hover:text-gold">الطلبات</Link></li>
                <li><Link to="/admin" className="hover:text-gold">لوحة الإدارة</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-display text-ivory">تواصل</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>القاهرة الجديدة، مصر</li>
                <li>demo@al-mashreq.example</li>
                <li>٩ ص — ٦ م (بتوقيت القاهرة)</li>
              </ul>
            </div>
          </div>
          <div className="gold-line my-8" />
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>© ٢٠٢٦ منصة المشرق. جميع البيانات تجريبية.</span>
            <DemoRibbon />
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl glass">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
        aria-expanded={open}
      >
        <span className="min-w-0 text-sm text-ivory sm:text-base">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className="grid transition-all duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-7 text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}
