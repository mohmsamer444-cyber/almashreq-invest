import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Clock, FileUp, Loader2, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Reveal } from "@/components/cinematic";
import { StatusPill } from "@/components/status-pill";
import {
  PAYMENT_METHODS,
  fmt,
  fmtDate,
  statusLabel,
  useDemo,
  type RequestKind,
  type RequestStatus,
} from "@/lib/demo";

export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "طلبات الإيداع والسحب | منصة المشرق" },
      { name: "description", content: "قدّم طلبات إيداع وسحب تجريبية عبر المحافظ الإلكترونية والتحويل البنكي مع خط زمني للحالة." },
      { property: "og:title", content: "طلبات الإيداع والسحب | منصة المشرق" },
      { property: "og:description", content: "نماذج طلبات بتحقق كامل، رفع إيصال، وسجل حالات." },
    ],
  }),
  component: () => (
    <AppShell>
      <Requests />
    </AppShell>
  ),
});

const schema = z.object({
  amount: z.coerce.number().min(500, "أقل مبلغ هو ٥٠٠ ج.م").max(1000000, "أقصى مبلغ هو ١٬٠٠٠٬٠٠٠ ج.م"),
  method: z.string().min(1, "اختر وسيلة الدفع"),
  account: z.string().trim().min(6, "أدخل رقم محفظة أو حساب صحيح").max(60),
  note: z.string().trim().max(200, "الملاحظة طويلة جدًا").optional(),
});

const TIMELINE: RequestStatus[] = ["pending", "review", "approved"];

function Requests() {
  const { requests, submitRequest } = useDemo();
  const [kind, setKind] = useState<RequestKind>("deposit");
  const [method, setMethod] = useState<string>(PAYMENT_METHODS[0].label);
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [note, setNote] = useState("");
  const [receipt, setReceipt] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const activeMethod = PAYMENT_METHODS.find((m) => m.label === method);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ amount, method, account, note });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    if (kind === "deposit" && !receipt) {
      setErrors({ receipt: "أرفق صورة الإيصال لإتمام طلب الإيداع" });
      return;
    }
    setErrors({});
    setBusy(true);
    window.setTimeout(() => {
      submitRequest({
        kind,
        method,
        amount: parsed.data.amount,
        account: parsed.data.account,
        ...(parsed.data.note ? { note: parsed.data.note } : {}),
        ...(receipt ? { receiptName: receipt } : {}),
      });
      setBusy(false);
      setAmount("");
      setAccount("");
      setNote("");
      setReceipt("");
      toast.success("تم إرسال الطلب — سيظهر في السجل بحالة قيد الانتظار");
    }, 800);
  };

  return (
    <>
      <PageHeader
        title="الطلبات"
        subtitle="قدّم طلب إيداع أو سحب تجريبي، وتابع مراحله عبر الخط الزمني وسجل الطلبات."
      />

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/deposit-request"
          className="glass rounded-2xl p-4 sm:p-5 border border-border/50 hover:border-gold/40 transition-all group cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="font-semibold text-ivory group-hover:text-gold transition-colors">
              💳 طلب إيداع جديد
            </h3>
            <p className="text-sm text-muted-foreground mt-1">أضف أموالاً إلى محفظتك</p>
          </div>
          <ArrowLeft className="w-5 h-5 text-gold opacity-60 group-hover:opacity-100" />
        </Link>

        <Link
          to="/withdrawal-request"
          className="glass rounded-2xl p-4 sm:p-5 border border-border/50 hover:border-gold/40 transition-all group cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="font-semibold text-ivory group-hover:text-gold transition-colors">
              💰 طلب سحب جديد
            </h3>
            <p className="text-sm text-muted-foreground mt-1">اسحب أموالك من محفظتك</p>
          </div>
          <ArrowLeft className="w-5 h-5 text-gold opacity-60 group-hover:opacity-100" />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <form onSubmit={submit} className="rounded-3xl glass p-7" noValidate>
            <div className="grid grid-cols-2 gap-1 rounded-full border border-border/60 p-1">
              {(["deposit", "withdraw"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  className={`rounded-full py-2 text-sm transition-all duration-300 ${
                    kind === k ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory"
                  }`}
                >
                  {k === "deposit" ? "إيداع" : "سحب"}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold tracking-widest text-gold">اختر وسيلة الدفع</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.label)}
                    className={`shine group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                      method === m.label
                        ? "border-gold/60 bg-gradient-to-br from-gold/20 to-gold/10"
                        : "border-border/60 bg-background/40 hover:border-gold/40 hover:bg-background/60"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10" style={{ backgroundImage: "var(--gradient-gold)" }} />
                    <div className="relative px-3 py-4 text-center">
                      <span className="block text-2xl">{m.icon}</span>
                      <span className={`mt-2 block text-xs font-medium ${
                        method === m.label ? "text-gold" : "text-muted-foreground"
                      }`}>
                        {m.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {activeMethod && (
                <p className="mt-3 text-xs text-muted-foreground">
                  💡 <span className="text-gold">المثال:</span> {activeMethod.hint}
                </p>
              )}
            </div>

            <div className="mt-7 space-y-4">
              <Input 
                label="المبلغ (جنيه مصري)" 
                value={amount} 
                onChange={setAmount} 
                error={errors["amount"]} 
                placeholder={kind === "deposit" ? "المبلغ المراد إيداعه" : "المبلغ المراد سحبه"} 
                inputMode="numeric" 
              />
              <Input
                label={kind === "deposit" ? "رقم المحفظة/الحساب المُحوَّل منه" : "رقم المحفظة/الحساب المُحوَّل إليه"}
                value={account}
                onChange={setAccount}
                error={errors["account"]}
                placeholder={activeMethod?.hint ?? "أدخل رقم المحفظة أو الحساب"}
              />
              <label className="block">
                <span className="mb-3 block text-xs font-semibold tracking-widest text-gold">ملاحظة — اختيارية</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold/60"
                  placeholder="أضف أي تفاصيل إضافية تتعلق بالطلب (اختياري)"
                />
                {errors["note"] && <span className="mt-1.5 block text-xs text-destructive">⚠ {errors["note"]}</span>}
              </label>

              <div>
                <span className="mb-3 block text-xs font-semibold tracking-widest text-gold">إيصال التحويل {kind === "deposit" ? "— مطلوب" : "— اختياري"}</span>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className={`shine group relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
                    errors["receipt"]
                      ? "border-destructive/70 bg-destructive/5"
                      : receipt
                        ? "border-success/70 bg-success/5"
                        : "border-border/70 bg-background/40 hover:border-gold/50 hover:bg-gold/5"
                  }`}
                >
                  <div className="relative flex flex-col items-center gap-3 px-4 py-8">
                    <span className={`text-3xl transition-transform duration-300 group-hover:scale-110 ${
                      errors["receipt"] ? "text-destructive" : receipt ? "text-success" : "text-gold"
                    }`}>
                      {receipt ? "✓" : <FileUp className="h-6 w-6" />}
                    </span>
                    <div className="min-w-0 text-start">
                      <p className={`text-xs font-semibold ${
                        errors["receipt"] ? "text-destructive" : receipt ? "text-success" : "text-ivory"
                      }`}>
                        {receipt ? `تم التحميل: ${receipt}` : "اضغط أو اسحب صورة الإيصال"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">PNG / JPG / WebP — بحد أقصى 5 MB</p>
                    </div>
                  </div>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setReceipt(f.name);
                      setErrors((x) => ({ ...x, receipt: "" }));
                    }
                  }}
                />
                {errors["receipt"] && <span className="mt-2 block text-xs text-destructive">⚠ {errors["receipt"]}</span>}
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="shine mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.01] disabled:opacity-70"
              style={{ backgroundImage: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              إرسال الطلب
            </button>
          </form>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={90}>
            <div className="rounded-3xl glass p-7">
              <h2 className="font-display text-lg text-ivory">مراحل الطلب</h2>
              <ol className="mt-6 space-y-6">
                {TIMELINE.map((s, i) => (
                  <li key={s} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/12 text-gold">
                      {i === 0 ? <Clock className="h-4 w-4" /> : i === 1 ? <Loader2 className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      {i < TIMELINE.length - 1 && (
                        <span className="absolute top-9 h-6 w-px bg-border" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-ivory">{statusLabel[s]}</span>
                      <span className="block text-xs leading-6 text-muted-foreground">
                        {i === 0
                          ? "تم استلام الطلب وإضافته إلى قائمة المعالجة."
                          : i === 1
                            ? "يقوم فريق العمليات بمطابقة الإيصال والبيانات."
                            : "اعتماد الطلب وتحديث رصيد المحفظة."}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-3xl glass p-7">
              <h2 className="font-display text-lg text-ivory">سجل الطلبات</h2>
              <ul className="mt-5 space-y-2">
                {requests.map((r) => (
                  <li
                    key={r.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border/50 p-4"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-ivory">
                        {r.kind === "deposit" ? "إيداع" : "سحب"} · {r.method} · {fmt(r.amount)} ج.م
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {r.userName} — {fmtDate(r.createdAt)}
                        {r.receiptName ? ` · ${r.receiptName}` : ""}
                      </span>
                    </span>
                    <StatusPill status={r.status} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs font-semibold tracking-widest text-gold">{label}</span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl border bg-background/40 px-4 py-3.5 text-sm text-ivory outline-none transition-all duration-300 focus:scale-105 focus:border-gold/60 ${
          error ? "border-destructive/70 focus:border-destructive/70" : "border-border/70 focus:border-gold/60"
        }`}
      />
      {error && <span className="mt-1.5 block text-xs text-destructive">⚠ {error}</span>}
    </label>
  );
}
