import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, LockKeyhole, Phone, User2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Logo, CinematicBackdrop } from "@/components/cinematic";
import { useDemo } from "@/lib/demo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | منصة المشرق" },
      { name: "description", content: "سجل الدخول أو أنشئ حسابًا جديدًا للدخول إلى منصة المشرق الفاخرة." },
      { property: "og:title", content: "تسجيل الدخول | منصة المشرق" },
      { property: "og:description", content: "بوابة الدخول الآمنة والمشفرة لمنصة إدارة المحافظ الاستثمارية." },
    ],
  }),
  component: AuthPage,
});

const phoneRe = /^01[0-9]{9}$/;

const registerSchema = z
  .object({
    fullName: z.string().trim().min(3, "الاسم قصير جدًا (3 أحرف على الأقل)").max(60, "الاسم طويل جدًا"),
    phone: z.string().trim().regex(phoneRe, "رقم هاتف مصري غير صحيح (مثال: 01001234567)"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").max(64, "كلمة المرور طويلة جدًا"),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "كلمات المرور غير متطابقة" });

const loginSchema = z.object({
  phone: z.string().trim().regex(phoneRe, "رقم هاتف غير صحيح"),
  password: z.string().min(1, "أدخل كلمة المرور"),
});

type Errors = Partial<Record<"fullName" | "phone" | "password" | "confirm", string>>;

function AuthPage() {
  const { register, login } = useDemo();
  const navigate = useNavigate();
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [mode, setMode] = useState<"register" | "login">("register");
  const [values, setValues] = useState({ fullName: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed =
      mode === "register" ? registerSchema.safeParse(values) : loginSchema.safeParse(values);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setBusy(true);
    window.setTimeout(() => {
      if (mode === "register") {
        register({ fullName: values.fullName.trim(), phone: values.phone.trim(), password: values.password });
        toast.success("تم إنشاء حسابك التجريبي بنجاح");
      } else {
        const u = login({ phone: values.phone.trim(), password: values.password });
        if (!u) {
          setBusy(false);
          setErrors({ phone: "لا يوجد حساب تجريبي بهذا الرقم — أنشئ حسابًا جديدًا" });
          return;
        }
        toast.success(`أهلًا بعودتك، ${u.fullName}`);
      }
      navigate({ to: "/dashboard" });
    }, 850);
  };

  return (
    <div className="relative grid min-h-screen grain lg:grid-cols-[1.1fr_1fr]">
      {/* cinematic side */}
      <section className="relative hidden overflow-hidden border-e border-border/50 lg:block">
        <div className="absolute inset-0 geo-texture opacity-60" />
        <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15 animate-ring-spin" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 animate-ring-spin [animation-direction:reverse]" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo size={48} />
          <div className="max-w-lg animate-fade-blur">
            <p className="text-sm tracking-[0.35em] text-gold">AL-MASHREQ</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.25] text-ivory">
              حيث تلتقي <span className="text-gold-gradient">الأصالة</span> بإدارة الثروات الحديثة
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              بيئة عرض متكاملة تحاكي منصة استثمار حقيقية: محافظ، باقات، طلبات، وتقارير لحظية — كل ذلك
              ببيانات تجريبية آمنة تمامًا.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              ["١٢٨ ألف", "مستخدم تجريبي"],
              ["٩٩.٩٪", "زمن التشغيل"],
              ["٧", "باقات استثمارية"],
            ].map(([a, b]) => (
              <div key={b} className="rounded-2xl glass-soft p-4">
                <p className="font-display text-2xl text-gold">{a}</p>
                <p className="mt-1 text-xs text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* form side */}
      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md animate-reveal">
          <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
            <Logo size={40} />
          </div>

          <div className="rounded-3xl glass p-6 sm:p-8">
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-border/60 p-1">
              {(["register", "login"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    setErrors({});
                  }}
                  className={`rounded-full py-2 text-sm transition-all duration-300 ${
                    mode === m ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory"
                  }`}
                >
                  {m === "register" ? "حساب جديد" : "تسجيل الدخول"}
                </button>
              ))}
            </div>

            <h1 className="font-display text-2xl text-ivory">
              {mode === "register" ? "أنشئ حسابك التجريبي" : "مرحبًا بعودتك"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "register"
                ? "لن تُرسل أي بيانات إلى خوادم — كل شيء يعمل محليًا للعرض."
                : "استخدم رقم الهاتف الذي سجّلت به سابقًا."}
            </p>

            <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
              {mode === "register" && (
                <Field
                  icon={<User2 className="h-4 w-4" />}
                  label="الاسم بالكامل"
                  value={values.fullName}
                  onChange={set("fullName")}
                  error={errors.fullName}
                  placeholder="مثال: أحمد محمود"
                  autoComplete="name"
                />
              )}
              <Field
                icon={<Phone className="h-4 w-4" />}
                label="رقم الهاتف"
                value={values.phone}
                onChange={set("phone")}
                error={errors.phone}
                placeholder="01xxxxxxxxx"
                inputMode="numeric"
                autoComplete="tel"
              />
              <Field
                icon={<LockKeyhole className="h-4 w-4" />}
                label="كلمة المرور"
                value={values.password}
                onChange={set("password")}
                error={errors.password}
                placeholder="********"
                type={show ? "text" : "password"}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                trailing={
                  <button
                    type="button"
                    aria-label="إظهار كلمة المرور"
                    onClick={() => setShow((v) => !v)}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              {mode === "register" && (
                <Field
                  icon={<LockKeyhole className="h-4 w-4" />}
                  label="تأكيد كلمة المرور"
                  value={values.confirm}
                  onChange={set("confirm")}
                  error={errors.confirm}
                  placeholder="********"
                  type={show ? "text" : "password"}
                  autoComplete="new-password"
                />
              )}

              <button
                type="submit"
                disabled={busy}
                className="shine mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.01] disabled:opacity-70"
                style={{ backgroundImage: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "register" ? "إنشاء الحساب والدخول" : "دخول"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-6 text-muted-foreground">
              بالمتابعة أنت توافق على أن هذه بيئة تجريبية لأغراض العرض فقط.
              <br />
              <Link to="/" className="text-gold underline-offset-4 hover:underline">
                تصفّح الصفحة التعريفية
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  icon,
  label,
  error,
  trailing,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  label: string;
  error?: string | undefined;
  trailing?: React.ReactNode | undefined;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-muted-foreground">{label}</span>
      <span
        className={`flex items-center gap-3 rounded-2xl border bg-background/40 px-4 py-3 transition-colors focus-within:border-gold/60 ${
          error ? "border-destructive/70" : "border-border/70"
        }`}
      >
        <span className="shrink-0 text-gold/80">{icon}</span>
        <input
          {...props}
          className="min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/60"
        />
        {trailing}
      </span>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
