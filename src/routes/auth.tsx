import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  User2,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { z } from "zod";
import { Logo } from "@/components/layout/logo";
import { Button, Input } from "@/components/ui";
import { useStore } from "@/lib/store";
import { generateResetCode } from "@/lib/security";
import { ADMIN_EMAIL } from "@/lib/constants";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | منصة المشرق" },
      { name: "description", content: "أنشئ حسابك أو سجل دخولك إلى منصة المشرق." },
    ],
  }),
  component: AuthPage,
});

const phoneRe = /^01[0-9]{9}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerSchema = z
  .object({
    fullName: z.string().trim().min(3, "الاسم قصير جدًا").max(60, "الاسم طويل جدًا"),
    email: z.string().trim().regex(emailRe, "بريد إلكتروني غير صحيح"),
    phone: z.string().trim().regex(phoneRe, "رقم هاتف مصري غير صحيح"),
    password: z.string().min(8, "كلمة المرور 8 أحرف على الأقل").max(64),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "كلمتا المرور غير متطابقتين" });

const loginSchema = z.object({
  identifier: z.string().trim().min(3, "أدخل البريد أو رقم الهاتف"),
  password: z.string().min(1, "أدخل كلمة المرور"),
});

const forgotSchema = z.object({
  email: z.string().trim().regex(emailRe, "بريد إلكتروني غير صحيح"),
});

const resetSchema = z
  .object({
    code: z.string().trim().length(6, "كود من 6 أرقام"),
    password: z.string().min(8, "كلمة المرور 8 أحرف على الأقل").max(64),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "كلمتا المرور غير متطابقتين" });

type Mode = "login" | "register" | "forgot" | "reset";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  identifier: string;
  code: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  identifier: "",
  code: "",
};

function AuthPage() {
  const { register, login, loginDemo, resetPassword, users } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [resetCode] = useState<string>(() => generateResetCode());

  const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: "" }));
  };

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register") {
      const parsed = registerSchema.safeParse(values);
      if (!parsed.success) return collectErrors(parsed.error.issues);
      return run(async () => {
        const res = await register(parsed.data);
        if (!res.ok) {
          setErrors({ email: res.error ?? "" });
          return;
        }
        toast.success("تم إنشاء حسابك بنجاح");
        navigate({ to: "/" });
      });
    }

    if (mode === "login") {
      const parsed = loginSchema.safeParse(values);
      if (!parsed.success) return collectErrors(parsed.error.issues);
      return run(async () => {
        const res = await login(values.identifier, values.password);
        if (!res.ok) {
          setErrors({ identifier: res.error ?? "" });
          return;
        }
        toast.success("تم تسجيل الدخول بنجاح");
        navigate({ to: "/" });
      });
    }

    if (mode === "forgot") {
      const parsed = forgotSchema.safeParse(values);
      if (!parsed.success) return collectErrors(parsed.error.issues);
      const exists = users.some((u) => u.email.toLowerCase() === values.email.toLowerCase());
      if (!exists) {
        setErrors({ email: "لا يوجد حساب بهذا البريد" });
        return;
      }
      setMode("reset");
      toast.info(`كود إعادة التعيين: ${resetCode}`);
      return;
    }

    // reset
    const parsed = resetSchema.safeParse(values);
    if (!parsed.success) return collectErrors(parsed.error.issues);
    if (values.code !== resetCode) {
      setErrors({ code: "الكود غير صحيح" });
      return;
    }
    return run(async () => {
      const res = await resetPassword(values.email, values.password);
      if (!res.ok) {
        setErrors({ email: res.error ?? "" });
        return;
      }
      toast.success("تم تحديث كلمة المرور — جرّب تسجيل الدخول");
      setMode("login");
      setValues({ ...values, password: "", confirm: "", code: "" });
    });
  };

  const collectErrors = (issues: { path: PropertyKey[]; message: string }[]) => {
    const next: Errors = {};
    for (const issue of issues) {
      const key = String(issue.path[0]) as keyof FormValues;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
  };

  const demoAccounts = [
    { label: "حساب تجريبي", desc: "أحمد محمود", onClick: async () => { await loginDemo("u1"); navigate({ to: "/" }); } },
    { label: "حساب إداري", desc: "إدارة المشرق", onClick: async () => { await login("admin@mashreq.demo", "admin123"); navigate({ to: "/admin" }); } },
  ];

  return (
    <div className="relative grid min-h-screen grain lg:grid-cols-[1.1fr_1fr]">
      {/* Cinematic side */}
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
              منصة متكاملة لإدارة المحافظ الاستثمارية: باقات متدرجة، متابعة لحظية، وطلبات إيداع وسحب
              — كل ذلك بتجربة فاخرة وبيانات تجريبية آمنة.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              ["٧", "باقات استثمارية"],
              ["٢٤/٧", "دعم متواصل"],
              ["٩٩٫٩٪", "جاهزية"],
            ].map(([a, b]) => (
              <div key={b} className="rounded-2xl glass-soft p-4">
                <p className="font-display text-2xl text-gold">{a}</p>
                <p className="mt-1 text-xs text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form side */}
      <section className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md animate-reveal">
          <div className="mb-7 flex items-center justify-between gap-4 lg:hidden">
            <Logo size={38} />
          </div>

          <div className="rounded-3xl glass p-6 sm:p-8">
            {mode !== "login" && mode !== "register" && (
              <button
                type="button"
                onClick={() => setMode(mode === "forgot" ? "login" : "forgot")}
                className="mb-4 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-gold"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> رجوع
              </button>
            )}

            <h1 className="font-display text-2xl text-ivory">
              {mode === "login" && "مرحبًا بعودتك"}
              {mode === "register" && "أنشئ حسابك"}
              {mode === "forgot" && "نسيت كلمة المرور"}
              {mode === "reset" && "إعادة تعيين كلمة المرور"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "login" && "سجّل الدخول للوصول إلى محفظتك وباقاتك"}
              {mode === "register" && "انضم إلى منصة المشرق خلال دقيقة"}
              {mode === "forgot" && "أدخل بريدك وسنرسل لك كود إعادة التعيين"}
              {mode === "reset" && `أدخل الكود المرسل إلى ${values.email}`}
            </p>

            <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
              {mode === "register" && (
                <Input
                  icon={<User2 className="h-4 w-4" />}
                  label="الاسم بالكامل"
                  value={values.fullName}
                  onChange={set("fullName")}
                  error={errors.fullName}
                  placeholder="مثال: أحمد محمود"
                  autoComplete="name"
                />
              )}

              {mode === "login" && (
                <Input
                  icon={<Mail className="h-4 w-4" />}
                  label="البريد الإلكتروني أو رقم الهاتف"
                  value={values.identifier}
                  onChange={set("identifier")}
                  error={errors.identifier}
                  placeholder="example@mail.com أو 01xxxxxxxxx"
                  autoComplete="username"
                />
              )}

              {(mode === "register" || mode === "forgot" || mode === "reset") && (
                <Input
                  icon={<Mail className="h-4 w-4" />}
                  label="البريد الإلكتروني"
                  value={values.email}
                  onChange={set("email")}
                  error={errors.email}
                  placeholder="example@mail.com"
                  autoComplete="email"
                  dir="ltr"
                />
              )}

              {mode === "register" && (
                <Input
                  icon={<Phone className="h-4 w-4" />}
                  label="رقم الهاتف"
                  value={values.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                  placeholder="01xxxxxxxxx"
                  inputMode="numeric"
                  autoComplete="tel"
                  dir="ltr"
                />
              )}

              {mode !== "forgot" && (
                <Input
                  icon={<LockKeyhole className="h-4 w-4" />}
                  label={mode === "reset" ? "كلمة المرور الجديدة" : "كلمة المرور"}
                  value={values.password}
                  onChange={set("password")}
                  error={errors.password}
                  placeholder="********"
                  type={show ? "text" : "password"}
                  autoComplete={mode === "register" || mode === "reset" ? "new-password" : "current-password"}
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
              )}

              {(mode === "register" || mode === "reset") && (
                <Input
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

              {mode === "reset" && (
                <Input
                  icon={<KeyRound className="h-4 w-4" />}
                  label="كود إعادة التعيين"
                  value={values.code}
                  onChange={set("code")}
                  error={errors.code}
                  placeholder="6 أرقام"
                  inputMode="numeric"
                  dir="ltr"
                />
              )}

              {mode === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setErrors({});
                    }}
                    className="text-xs text-muted-foreground transition-colors hover:text-gold"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
              )}

              <Button type="submit" fullWidth size="lg" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "login" && "تسجيل الدخول"}
                {mode === "register" && "إنشاء الحساب"}
                {mode === "forgot" && "إرسال كود التعيين"}
                {mode === "reset" && "تحديث كلمة المرور"}
              </Button>
            </form>

            {mode === "login" || mode === "register" ? (
              <p className="mt-6 text-center text-sm text-muted-foreground">
                {mode === "login" ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{" "}
                <button
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login");
                    setErrors({});
                  }}
                  className="font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  {mode === "login" ? "أنشئ حسابًا جديدًا" : "سجّل الدخول"}
                </button>
              </p>
            ) : null}

            {/* Demo accounts */}
            <div className="mt-7 border-t border-border/50 pt-5">
              <p className="mb-3 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
                دخول سريع للتجربة
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.label}
                    type="button"
                    onClick={acc.onClick}
                    className="rounded-xl border border-border/60 bg-background/40 px-3 py-2.5 text-center transition-all hover:border-gold/50 hover:bg-gold/5"
                  >
                    <p className="text-xs font-semibold text-gold">{acc.label}</p>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{acc.desc}</p>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                المدير: {ADMIN_EMAIL} / admin123 — المستخدمون: 12345678
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

