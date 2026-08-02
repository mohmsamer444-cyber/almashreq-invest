import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  Check,
  Copy,
  Crown,
  Percent,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
  Send,
  AlertTriangle,
  ImageIcon,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { PACKAGES, PAYMENT_METHODS } from "@/lib/constants";
import { Button } from "@/components/ui";
import { cn, fmtMoney } from "@/lib/utils";
import type { InvestmentPackage } from "@/lib/types";

export function PackagesPage() {
  const { user, subscribePackage, submitDeposit } = useStore();
  const { lang } = useSettings();
  const [selectedPkg, setSelectedPkg] = useState<InvestmentPackage | null>(
    null,
  );
  const [confirmPkg, setConfirmPkg] = useState<InvestmentPackage | null>(null);

  if (!user) return null;

  const handleSubscribe = (pkg: InvestmentPackage) => {
    if (user.activePackageId === pkg.id) return;
    if (user.balance >= pkg.amount) {
      // Sufficient balance — show confirmation dialog (never instant activation)
      setConfirmPkg(pkg);
    } else {
      // Insufficient balance — open Premium Deposit Modal
      setSelectedPkg(pkg);
    }
  };

  const handleConfirmSubscription = () => {
    if (!confirmPkg) return;
    subscribePackage(confirmPkg.id);
    setConfirmPkg(null);
    toast.success(
      lang === "ar"
        ? "تم الاشتراك في الباقة بنجاح 🎉"
        : "Package subscribed successfully 🎉",
    );
  };

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
          {
            icon: Percent,
            label: lang === "ar" ? "عوائد يومية" : "Daily returns",
            value: lang === "ar" ? "حتى ١٫٨٪" : "Up to 1.8%",
          },
          {
            icon: CalendarDays,
            label: lang === "ar" ? "مدة مرنة" : "Flexible terms",
            value: lang === "ar" ? "من ٩٠ يوم" : "From 90 days",
          },
          {
            icon: Wallet,
            label: lang === "ar" ? "أرباح متوقعة" : "Expected profit",
            value: lang === "ar" ? "واضحة مسبقًا" : "Clear upfront",
          },
          {
            icon: Sparkles,
            label: lang === "ar" ? "إدارة احترافية" : "Pro management",
            value: lang === "ar" ? "على مدار الساعة" : "24/7",
          },
        ].map(({ icon: Icon, label, value }, i) => (
          <div
            key={label}
            className="animate-card-stagger flex items-center gap-3 rounded-2xl glass p-3.5 sm:p-4"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] text-muted-foreground">
                {label}
              </p>
              <p className="truncate text-xs font-semibold text-ivory">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Packages grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((pkg, i) => {
          const active = user.activePackageId === pkg.id;
          const dailyProfit = Math.round(pkg.amount * (pkg.dailyReturn / 100));
          const monthlyProfit = Math.round(dailyProfit * 30);
          const totalProfit = Math.round(dailyProfit * pkg.durationDays);
          return (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              active={active}
              dailyProfit={dailyProfit}
              monthlyProfit={monthlyProfit}
              totalProfit={totalProfit}
              lang={lang}
              balance={user.balance}
              staggerIndex={i}
              onSubscribe={() => handleSubscribe(pkg)}
            />
          );
        })}
      </div>

      {/* Premium Deposit Modal */}
      {selectedPkg && (
        <DepositModal
          pkg={selectedPkg}
          lang={lang}
          onClose={() => setSelectedPkg(null)}
          onSubmit={(data) => {
            submitDeposit(data);
            setSelectedPkg(null);
            toast.success(
              lang === "ar"
                ? "✅ تم إرسال طلب الإيداع بنجاح\nطلبك الآن قيد مراجعة الإدارة.\nوسيتم إضافة الرصيد بعد تأكيد التحويل."
                : "✅ Deposit request submitted successfully.\nYour request is now pending admin review.\nBalance will be added after transfer confirmation.",
            );
          }}
        />
      )}

      {/* Subscription confirmation dialog */}
      {confirmPkg && (
        <ConfirmDialog
          pkg={confirmPkg}
          lang={lang}
          balance={user.balance}
          onClose={() => setConfirmPkg(null)}
          onConfirm={handleConfirmSubscription}
        />
      )}
    </AppShell>
  );
}

interface CardProps {
  pkg: (typeof PACKAGES)[number];
  active: boolean;
  dailyProfit: number;
  monthlyProfit: number;
  totalProfit: number;
  lang: "ar" | "en";
  balance: number;
  staggerIndex?: number;
  onSubscribe: () => void;
}

function PackageCard({
  pkg,
  active,
  dailyProfit,
  monthlyProfit,
  totalProfit,
  lang,
  balance,
  staggerIndex = 0,
  onSubscribe,
}: CardProps) {
  const name = lang === "ar" ? pkg.nameAr : pkg.nameEn;
  const features = lang === "ar" ? pkg.featuresAr : pkg.featuresEn;
  const insufficient = balance < pkg.amount;

  return (
    <div
      className={cn(
        "lift animate-card-stagger group relative overflow-hidden rounded-[1.75rem] border p-[1px] transition-all duration-500",
        pkg.vip
          ? "border-gold/50 shadow-[0_18px_60px_-22px_oklch(0.78_0.14_80/0.55)]"
          : "border-border/60",
      )}
      style={{ animationDelay: `${staggerIndex * 70}ms` }}
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
            <h3 className="mt-1.5 font-display text-xl font-bold text-ivory">
              {name}
            </h3>
          </div>
          {pkg.vip && (
            <span className="flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold">
              <Crown className="h-3 w-3" /> VIP
            </span>
          )}
        </div>

        {/* Amount + returns */}
        <div className="mt-4 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/10 to-transparent p-4">
          <p className="text-[11px] text-muted-foreground">
            {lang === "ar" ? "الحد الأدنى للاستثمار" : "Minimum investment"}
          </p>
          <p
            className="mt-1 font-display text-2xl font-bold text-gold-gradient"
            dir="ltr"
          >
            {fmtMoney(pkg.amount, "en")}{" "}
            <span className="text-sm">{lang === "ar" ? "ج.م" : "EGP"}</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-background/50 p-2.5">
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-success">
                <Percent className="h-3.5 w-3.5" /> {pkg.dailyReturn}%
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {lang === "ar" ? "عائد يومي" : "Daily return"}
              </p>
            </div>
            <div className="rounded-xl bg-background/50 p-2.5">
              <p className="flex items-center justify-center gap-1 text-sm font-bold text-ivory">
                <CalendarDays className="h-3.5 w-3.5" /> {pkg.durationDays}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {lang === "ar" ? "يوم" : "days"}
              </p>
            </div>
          </div>
        </div>

        {/* Expected profit */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <MiniStat
            label={lang === "ar" ? "يوميًا" : "Daily"}
            value={dailyProfit}
            lang={lang}
          />
          <MiniStat
            label={lang === "ar" ? "شهريًا" : "Monthly"}
            value={monthlyProfit}
            lang={lang}
          />
          <MiniStat
            label={lang === "ar" ? "إجمالي" : "Total"}
            value={totalProfit}
            lang={lang}
            highlight
          />
        </div>

        {/* Features */}
        <ul className="mt-4 space-y-2">
          {features.slice(0, 4).map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <span
                className={cn(
                  "grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full",
                  pkg.vip
                    ? "bg-gold/15 text-gold"
                    : "bg-success/12 text-success",
                )}
              >
                <Check className="h-3 w-3" />
              </span>
              <span className="leading-5">{f}</span>
            </li>
          ))}
        </ul>

        {/* Balance warning */}
        {insufficient && !active && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/8 p-3">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
            <p className="text-[11px] leading-5 text-warning">
              {lang === "ar"
                ? "رصيدك غير كافٍ. سيتم فتح نافذة إيداع لشحن محفظتك."
                : "Insufficient balance. A deposit window will open to fund your wallet."}
            </p>
          </div>
        )}

        {/* Subscribe */}
        <div className="mt-5 flex-1" />
        <Button
          fullWidth
          size="lg"
          variant={pkg.vip ? "gold" : "outline"}
          className={cn(pkg.vip ? "" : "hover:border-gold/60")}
          onClick={onSubscribe}
          disabled={active}
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

function MiniStat({
  label,
  value,
  lang,
  highlight,
}: {
  label: string;
  value: number;
  lang: "ar" | "en";
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-2 text-center",
        highlight
          ? "border-gold/30 bg-gold/8"
          : "border-border/50 bg-background/40",
      )}
    >
      <p className={cn("text-[10px] text-muted-foreground")}>{label}</p>
      <p
        className={cn(
          "mt-0.5 text-xs font-bold",
          highlight ? "text-gold" : "text-ivory",
        )}
        dir="ltr"
      >
        {fmtMoney(value, "en")}
      </p>
    </div>
  );
}

/* ---------- Confirmation Dialog ---------- */

function ConfirmDialog({
  pkg,
  lang,
  balance,
  onClose,
  onConfirm,
}: {
  pkg: InvestmentPackage;
  lang: "ar" | "en";
  balance: number;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const name = lang === "ar" ? pkg.nameAr : pkg.nameEn;
  const after = balance - pkg.amount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl border border-gold/20 bg-[#141414] shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold animate-glow-pulse">
            <Wallet className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-center font-display text-xl font-bold text-ivory">
            {lang === "ar" ? "تأكيد الاشتراك" : "Confirm subscription"}
          </h3>
          <p className="mt-1 text-center text-sm text-gold">
            {lang === "ar" ? `باقة ${name}` : `${name} package`}
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {lang === "ar"
              ? `سيتم خصم ${fmtMoney(pkg.amount, "en")} ج.م من رصيدك لتفعيل الباقة.`
              : `${fmtMoney(pkg.amount, "en")} EGP will be deducted from your balance to activate the package.`}
          </p>

          {/* Summary */}
          <div className="mt-5 space-y-2 rounded-2xl border border-border/50 bg-background/40 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {lang === "ar" ? "قيمة الباقة" : "Package price"}
              </span>
              <span className="font-semibold text-gold" dir="ltr">
                {fmtMoney(pkg.amount, "en")} ج.م
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {lang === "ar" ? "رصيدك الحالي" : "Your balance"}
              </span>
              <span className="font-semibold text-ivory" dir="ltr">
                {fmtMoney(balance, "en")} ج.م
              </span>
            </div>
            <div className="flex justify-between border-t border-border/40 pt-2 text-sm">
              <span className="text-muted-foreground">
                {lang === "ar" ? "الرصيد بعد الخصم" : "Balance after"}
              </span>
              <span
                className={cn(
                  "font-semibold",
                  after >= 0 ? "text-success" : "text-destructive",
                )}
                dir="ltr"
              >
                {fmtMoney(after, "en")} ج.م
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={onClose}>
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button
              variant="gold"
              onClick={onConfirm}
              className="gold-btn shine"
            >
              <Check className="h-4 w-4" />
              {lang === "ar" ? "تأكيد الاشتراك" : "Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Premium Deposit Modal ---------- */

interface DepositModalProps {
  pkg: InvestmentPackage;
  lang: "ar" | "en";
  onClose: () => void;
  onSubmit: (data: {
    method: string;
    senderPhone: string;
    amount: number;
    receiptName: string;
    receiptData?: string;
    notes?: string;
  }) => void;
}

function DepositModal({ pkg, lang, onClose, onSubmit }: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(PAYMENT_METHODS[0]!.id);
  const [senderPhone, setSenderPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [receiptName, setReceiptName] = useState("");
  const [receiptData, setReceiptData] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"number" | "name" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedMethod =
    PAYMENT_METHODS.find((m) => m.id === method) ?? PAYMENT_METHODS[0]!;
  const name = lang === "ar" ? pkg.nameAr : pkg.nameEn;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(
        lang === "ar"
          ? "يرجى رفع صورة للإيصال"
          : "Please upload an image receipt",
      );
      return;
    }
    setReceiptName(file.name);
    setError("");
    const reader = new FileReader();
    reader.onload = () => setReceiptData(reader.result as string);
    reader.readAsDataURL(file);
  };

  const copyToClipboard = async (text: string, which: "number" | "name") => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate payment method
    if (!method) {
      setError(
        lang === "ar"
          ? "يرجى اختيار وسيلة الدفع"
          : "Please select a payment method",
      );
      return;
    }
    // Validate amount
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setError(
        lang === "ar" ? "يرجى إدخال مبلغ صحيح" : "Please enter a valid amount",
      );
      return;
    }
    // Validate sender number
    if (!senderPhone.trim()) {
      setError(
        lang === "ar"
          ? "يرجى إدخال رقم الهاتف أو الحساب الذي تم التحويل منه"
          : "Please enter the sender phone or account number",
      );
      return;
    }
    // Validate receipt
    if (!receiptName || !receiptData) {
      setError(
        lang === "ar"
          ? "يرجى رفع إيصال التحويل"
          : "Please upload the transfer receipt",
      );
      return;
    }
    setError("");
    const payload: {
      method: string;
      senderPhone: string;
      amount: number;
      receiptName: string;
      receiptData?: string;
      notes?: string;
    } = {
      method: selectedMethod.labelAr,
      senderPhone: senderPhone.trim(),
      amount: amt,
      receiptName,
      receiptData,
    };
    if (notes.trim()) payload.notes = notes.trim();
    onSubmit(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-gold/20 bg-[#141414] shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              {lang === "ar"
                ? "طلب إيداع — إيداع بريميوم"
                : "Deposit Request — Premium"}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold text-ivory">
              {lang === "ar" ? `باقة ${name}` : `${name} Package`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:text-ivory"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] space-y-4 overflow-y-auto p-5"
        >
          {/* 1 — Package name + price (read only) */}
          <div className="rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/10 to-transparent p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {lang === "ar" ? "الباقة" : "Package"}
              </span>
              <span className="text-sm font-bold text-ivory">{name}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {lang === "ar" ? "سعر الباقة" : "Package price"}
              </span>
              <span
                className="font-display text-lg font-bold text-gold-gradient"
                dir="ltr"
              >
                {fmtMoney(pkg.amount, "en")}{" "}
                <span className="text-xs">{lang === "ar" ? "ج.م" : "EGP"}</span>
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {lang === "ar" ? "العائد اليومي" : "Daily return"}
              </span>
              <span className="text-sm font-bold text-success">
                {pkg.dailyReturn}%
              </span>
            </div>
          </div>

          {/* 2 — Deposit Amount */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              {lang === "ar" ? "مبلغ الإيداع (ج.م)" : "Deposit amount (EGP)"}
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={
                lang === "ar"
                  ? `الحد الأدنى ${fmtMoney(pkg.amount, "en")} ج.م`
                  : `Minimum ${fmtMoney(pkg.amount, "en")} EGP`
              }
              inputMode="numeric"
              dir="ltr"
              className="w-full rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-ivory outline-none transition-all focus:border-gold/60 focus:shadow-[0_0_0_4px_oklch(0.78_0.14_80/0.12)]"
            />
          </div>

          {/* 3 — Payment Method Dropdown */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              {lang === "ar" ? "وسيلة الدفع" : "Payment method"}
            </label>
            <div className="relative">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-ivory outline-none transition-all focus:border-gold/60 focus:shadow-[0_0_0_4px_oklch(0.78_0.14_80/0.12)]"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.icon} {lang === "ar" ? m.labelAr : m.labelEn}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gold">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* 4 — Payment account info with copy */}
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
              {lang === "ar" ? "بيانات الحساب" : "Account details"}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {lang === "ar"
                ? `حوّل المبلغ إلى ${selectedMethod.labelAr} ثم ارفع الإيصال.`
                : `Transfer to ${selectedMethod.labelEn} then upload the receipt.`}
            </p>
            <div className="mt-3 space-y-2">
              {/* Account number */}
              <div className="flex items-center justify-between gap-2 rounded-xl bg-background/50 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">
                    {lang === "ar" ? "رقم الحساب" : "Account number"}
                  </p>
                  <p
                    className="truncate font-mono text-sm font-semibold text-gold"
                    dir="ltr"
                  >
                    {selectedMethod.accountNumber}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(selectedMethod.accountNumber, "number")
                  }
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-gold/30 text-gold transition-colors hover:bg-gold/10"
                  aria-label="copy account number"
                >
                  {copied === "number" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              {/* Account holder */}
              <div className="flex items-center justify-between gap-2 rounded-xl bg-background/50 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">
                    {lang === "ar" ? "اسم المستفيد" : "Account holder"}
                  </p>
                  <p className="truncate text-sm font-semibold text-ivory">
                    {selectedMethod.accountName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(selectedMethod.accountName, "name")
                  }
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-gold/30 text-gold transition-colors hover:bg-gold/10"
                  aria-label="copy account holder name"
                >
                  {copied === "name" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 5 — Sender Number */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              {lang === "ar"
                ? "رقم الهاتف أو الحساب الذي تم التحويل منه"
                : "Sender phone or account number"}
            </label>
            <input
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
              placeholder={selectedMethod.hint}
              inputMode="numeric"
              dir="ltr"
              className="w-full rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-ivory outline-none transition-all focus:border-gold/60 focus:shadow-[0_0_0_4px_oklch(0.78_0.14_80/0.12)]"
            />
          </div>

          {/* 6 — Receipt upload with preview */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              {lang === "ar"
                ? "إيصال التحويل (مطلوب)"
                : "Transfer receipt (required)"}
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
            {receiptData ? (
              <div className="overflow-hidden rounded-2xl border border-success/30 bg-background/40">
                <img
                  src={receiptData}
                  alt="receipt preview"
                  className="max-h-52 w-full object-contain"
                />
                <div className="flex items-center justify-between gap-2 border-t border-border/40 p-3">
                  <p className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-success">
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{receiptName}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="shrink-0 rounded-lg border border-border/60 px-2.5 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    {lang === "ar" ? "تغيير" : "Change"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className={cn(
                  "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-sm transition-all",
                  "border-border/60 text-muted-foreground hover:border-gold/40 hover:bg-gold/5 hover:text-gold",
                )}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/10 text-gold">
                  <ImageIcon className="h-5 w-5" />
                </span>
                <span>
                  {lang === "ar"
                    ? "اضغط لرفع صورة الإيصال"
                    : "Click to upload receipt image"}
                </span>
                <span className="text-[10px] text-muted-foreground/60">
                  {lang === "ar" ? "PNG · JPG" : "PNG · JPG"}
                </span>
              </button>
            )}
          </div>

          {/* 7 — Optional Notes */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              {lang === "ar" ? "ملاحظات (اختياري)" : "Notes (optional)"}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                lang === "ar" ? "أي ملاحظات إضافية…" : "Any additional notes…"
              }
              rows={2}
              className="w-full resize-none rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-ivory outline-none transition-all focus:border-gold/60 focus:shadow-[0_0_0_4px_oklch(0.78_0.14_80/0.12)]"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive animate-fade-up">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Submit — Gold Button */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            className="gold-btn shine !rounded-2xl !py-4 text-base font-bold text-graphite"
          >
            <Send className="h-4 w-4" />
            {lang === "ar" ? "إرسال طلب الإيداع" : "Submit Deposit Request"}
          </Button>

          <p className="pb-2 text-center text-[10px] text-muted-foreground/60">
            {lang === "ar"
              ? "لن يتم تفعيل الباقة أو إضافة الرصيد إلا بعد اعتماد الإدارة للتحويل."
              : "The package will not be activated or balance added until admin approves the transfer."}
          </p>
        </form>
      </div>
    </div>
  );
}
