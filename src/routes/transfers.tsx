import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowDownLeft, ArrowUpRight, Download, FileText, Image as ImageIcon, UploadCloud, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { PAYMENT_METHODS } from "@/lib/constants";
import { Button, Input, Textarea, Tabs, Badge } from "@/components/ui";
import { StatusTimeline } from "@/components/shared/status-timeline";
import { cn, fmtMoney, fmtDateTime } from "@/lib/utils";

export const Route = createFileRoute("/transfers")({
  head: () => ({
    meta: [
      { title: "الإيداع والسحب | منصة المشرق" },
      { name: "description", content: "قدّم طلبات الإيداع والسحب عبر وسائل دفع متعددة." },
    ],
  }),
  component: TransfersPage,
});

type TabKey = "deposit" | "withdraw";
type StatusKey = "pending" | "approved" | "rejected";

const STATUS_LABEL: Record<StatusKey, string> = {
  pending: "قيد المراجعة",
  approved: "مقبول",
  rejected: "مرفوض",
};

const STATUS_LABEL_EN: Record<StatusKey, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

function TransfersPage() {
  const { user, submitDeposit, submitWithdrawal, deposits, withdrawals } = useStore();
  const { lang } = useSettings();
  const [tab, setTab] = useState<TabKey>("deposit");

  if (!user) return null;

  const myDeposits = deposits.filter((d) => d.userId === user.id);
  const myWithdrawals = withdrawals.filter((w) => w.userId === user.id);

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "الإيداع والسحب" : "Transfers"}
        subtitle={lang === "ar" ? "قدّم طلبات الإيداع أو السحب وتابع حالتها" : "Submit deposit or withdrawal requests"}
      />

      <Tabs
        tabs={[
          { key: "deposit" as const, label: lang === "ar" ? "إيداع" : "Deposit", icon: <ArrowDownLeft className="h-4 w-4" /> },
          { key: "withdraw" as const, label: lang === "ar" ? "سحب" : "Withdraw", icon: <ArrowUpRight className="h-4 w-4" /> },
        ]}
        value={tab}
        onChange={setTab}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {tab === "deposit" ? (
          <DepositForm
            onDone={() => setTab("withdraw")}
          />
        ) : (
          <WithdrawForm />
        )}

        {/* History */}
        <div className="space-y-4">
          <div className="rounded-3xl glass p-5 sm:p-6">
            <h3 className="font-display text-base text-ivory sm:text-lg">
              {lang === "ar" ? "الإيداعات السابقة" : "Deposit history"}
            </h3>
            {myDeposits.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">
                {lang === "ar" ? "لا توجد إيداعات بعد" : "No deposits yet"}
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                {myDeposits.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ivory">{fmtMoney(d.amount, lang)} ج.م</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {d.method} — {fmtDateTime(d.createdAt)}
                      </p>
                    </div>
                    <Badge tone={d.status === "approved" ? "success" : d.status === "pending" ? "warning" : "danger"}>
                      {lang === "ar" ? STATUS_LABEL[d.status] : STATUS_LABEL_EN[d.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl glass p-5 sm:p-6">
            <h3 className="font-display text-base text-ivory sm:text-lg">
              {lang === "ar" ? "السحوبات السابقة" : "Withdrawal history"}
            </h3>
            {myWithdrawals.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">
                {lang === "ar" ? "لا توجد سحوبات بعد" : "No withdrawals yet"}
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                {myWithdrawals.map((w) => (
                  <div
                    key={w.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ivory">{fmtMoney(w.amount, lang)} ج.م</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {w.method} — {fmtDateTime(w.createdAt)}
                      </p>
                    </div>
                    <Badge tone={w.status === "approved" ? "success" : w.status === "pending" ? "warning" : "danger"}>
                      {lang === "ar" ? STATUS_LABEL[w.status] : STATUS_LABEL_EN[w.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl glass p-5 sm:p-6">
            <h3 className="font-display text-base text-ivory sm:text-lg">
              {lang === "ar" ? "مراحل الطلب" : "Status timeline"}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {lang === "ar" ? "مسار عملية الطلب من التقديم حتى الاعتماد" : "Request lifecycle"}
            </p>
            <div className="mt-5">
              <StatusTimeline />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function DepositForm({ onDone }: { onDone: () => void }) {
  const { user, submitDeposit } = useStore();
  const { lang } = useSettings();
  const [methodId, setMethodId] = useState<string>(PAYMENT_METHODS[0]!.id);
  const [senderPhone, setSenderPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [receiptName, setReceiptName] = useState<string>("");
  const [receiptData, setReceiptData] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const method = PAYMENT_METHODS.find((m) => m.id === methodId)!;

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const okType = ["image/png", "image/jpeg", "application/pdf"].includes(file.type);
    if (!okType) {
      toast.error(lang === "ar" ? "صيغة الملف غير مدعومة (PNG, JPG, PDF فقط)" : "Unsupported file type (PNG, JPG, PDF only)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(lang === "ar" ? "حجم الملف يجب أن يكون أقل من 5MB" : "File must be under 5MB");
      return;
    }
    setReceiptName(file.name);
    const reader = new FileReader();
    reader.onload = () => setReceiptData(String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 50) {
      toast.error(lang === "ar" ? "أدخل مبلغًا صحيحًا (الحد الأدنى 50 ج.م)" : "Enter a valid amount (min 50 EGP)");
      return;
    }
    if (!senderPhone.trim()) {
      toast.error(lang === "ar" ? "أدخل رقم المحفظة/الحساب" : "Enter the sender phone/account");
      return;
    }
    if (!receiptName) {
      toast.error(lang === "ar" ? "ارفع إيصال التحويل (PNG/JPG/PDF)" : "Upload a receipt (PNG/JPG/PDF)");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      submitDeposit({
        method: lang === "ar" ? method.labelAr : method.labelEn,
        senderPhone: senderPhone.trim(),
        amount: amountNum,
        receiptName,
        ...(receiptData ? { receiptData } : {}),
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      });
      setBusy(false);
      setAmount("");
      setSenderPhone("");
      setNotes("");
      setReceiptName("");
      setReceiptData("");
      toast.success(lang === "ar" ? "تم إرسال طلب الإيداع بنجاح" : "Deposit request submitted");
      onDone();
    }, 700);
  };

  return (
    <form onSubmit={submit} className="rounded-3xl glass p-5 sm:p-6">
      <h3 className="font-display text-base text-ivory sm:text-lg">
        {lang === "ar" ? "طلب إيداع جديد" : "New deposit"}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {lang === "ar" ? `رصيدك بعد الاعتماد سيُحدَّث تلقائيًا من الإدارة` : `Balance updates after approval`}
      </p>

      {/* Method selection */}
      <div className="mt-5">
        <p className="mb-3 text-xs font-semibold text-gold">{lang === "ar" ? "وسيلة الدفع" : "Payment method"}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethodId(m.id)}
              className={cn(
                "rounded-2xl border p-3 text-center transition-all duration-300",
                methodId === m.id
                  ? "border-gold/60 bg-gold/10"
                  : "border-border/50 bg-background/40 hover:border-gold/30",
              )}
            >
              <span className="block text-xl">{m.icon}</span>
              <span className={cn("mt-1 block text-[11px] font-medium", methodId === m.id ? "text-gold" : "text-muted-foreground")}>
                {lang === "ar" ? m.labelAr : m.labelEn}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">{method.hint}</p>
      </div>

      <div className="mt-5 space-y-4">
        <Input
          label={lang === "ar" ? "رقم هاتف المُرسِل" : "Sender phone"}
          value={senderPhone}
          onChange={(e) => setSenderPhone(e.target.value)}
          placeholder="01xxxxxxxxx"
          dir="ltr"
        />
        <Input
          label={lang === "ar" ? "المبلغ (ج.م)" : "Amount (EGP)"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={lang === "ar" ? "أدخل المبلغ" : "Enter amount"}
          inputMode="numeric"
          dir="ltr"
        />

        {/* Receipt upload */}
        <div>
          <p className="mb-2 block text-xs font-medium text-muted-foreground">
            {lang === "ar" ? "إيصال التحويل (مطلوب)" : "Transfer receipt (required)"}
          </p>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => fileRef.current?.click()}
            className={cn(
              "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300",
              dragging ? "border-gold bg-gold/5" : "border-border/60 hover:border-gold/40 hover:bg-gold/5",
            )}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {receiptName ? (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-success/10 text-success">
                  <FileText className="h-6 w-6" />
                </span>
                <p className="text-sm font-semibold text-success">{receiptName}</p>
                <p className="text-[11px] text-muted-foreground">
                  {lang === "ar" ? "اضغط للتغيير" : "Click to change"}
                </p>
              </>
            ) : (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold">
                  <UploadCloud className="h-6 w-6" />
                </span>
                <p className="text-sm font-semibold text-ivory">
                  {lang === "ar" ? "اسحب الملف هنا أو اضغط للاختيار" : "Drag & drop or click"}
                </p>
                <p className="text-[11px] text-muted-foreground">PNG · JPG · PDF — max 5MB</p>
              </>
            )}
          </div>
        </div>

        <Textarea
          label={lang === "ar" ? "ملاحظات (اختياري)" : "Notes (optional)"}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder={lang === "ar" ? "أي تفاصيل إضافية" : "Any additional details"}
        />
      </div>

      <Button fullWidth className="mt-6" disabled={busy} type="submit">
        {busy ? <span className="skeleton h-4 w-20 rounded-full" /> : lang === "ar" ? "إرسال طلب الإيداع" : "Submit deposit"}
      </Button>
    </form>
  );
}

function WithdrawForm() {
  const { user, submitWithdrawal } = useStore();
  const { lang } = useSettings();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [amount, setAmount] = useState("");
  const [methodId, setMethodId] = useState<string>(PAYMENT_METHODS[0]!.id);
  const [destination, setDestination] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  const method = PAYMENT_METHODS.find((m) => m.id === methodId)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (!fullName.trim()) {
      toast.error(lang === "ar" ? "أدخل الاسم بالكامل" : "Enter full name");
      return;
    }
    if (!phone.trim()) {
      toast.error(lang === "ar" ? "أدخل رقم الهاتف" : "Enter phone");
      return;
    }
    if (isNaN(amountNum) || amountNum < 50) {
      toast.error(lang === "ar" ? "أدخل مبلغًا صحيحًا (الحد الأدنى 50 ج.م)" : "Enter a valid amount (min 50 EGP)");
      return;
    }
    if (amountNum > user.balance) {
      toast.error(lang === "ar" ? "الرصيد غير كافٍ" : "Insufficient balance");
      return;
    }
    if (!destination.trim()) {
      toast.error(lang === "ar" ? "أدخل حساب الوجهة" : "Enter destination account");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      submitWithdrawal({
        fullName: fullName.trim(),
        phone: phone.trim(),
        amount: amountNum,
        method: lang === "ar" ? method.labelAr : method.labelEn,
        destination: destination.trim(),
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      });
      setBusy(false);
      setAmount("");
      setDestination("");
      setNotes("");
      toast.success(lang === "ar" ? "تم إرسال طلب السحب بنجاح" : "Withdrawal request submitted");
    }, 700);
  };

  return (
    <form onSubmit={submit} className="rounded-3xl glass p-5 sm:p-6">
      <h3 className="font-display text-base text-ivory sm:text-lg">{lang === "ar" ? "طلب سحب جديد" : "New withdrawal"}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {lang === "ar" ? `الرصيد المتاح: ${fmtMoney(user.balance, lang)} ج.م` : `Available: ${fmtMoney(user.balance, lang)} EGP`}
      </p>

      <div className="mt-5 space-y-4">
        <Input label={lang === "ar" ? "الاسم بالكامل" : "Full name"} value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <Input label={lang === "ar" ? "رقم الهاتف" : "Phone"} value={phone} onChange={(e) => setPhone(e.target.value)} dir="ltr" />
        <Input
          label={lang === "ar" ? "المبلغ (ج.م)" : "Amount (EGP)"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric"
          dir="ltr"
        />

        <div>
          <p className="mb-3 text-xs font-semibold text-gold">{lang === "ar" ? "طريقة الاستلام" : "Withdrawal method"}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethodId(m.id)}
                className={cn(
                  "rounded-2xl border p-3 text-center transition-all duration-300",
                  methodId === m.id
                    ? "border-gold/60 bg-gold/10"
                    : "border-border/50 bg-background/40 hover:border-gold/30",
                )}
              >
                <span className="block text-xl">{m.icon}</span>
                <span className={cn("mt-1 block text-[11px] font-medium", methodId === m.id ? "text-gold" : "text-muted-foreground")}>
                  {lang === "ar" ? m.labelAr : m.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Input
          label={lang === "ar" ? "رقم الحساب المستلم" : "Destination account"}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder={method.hint}
          dir="ltr"
        />
        <Textarea
          label={lang === "ar" ? "ملاحظات (اختياري)" : "Notes (optional)"}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder={lang === "ar" ? "أي تفاصيل إضافية" : "Any additional details"}
        />
      </div>

      <Button fullWidth className="mt-6" disabled={busy} type="submit">
        {busy ? <span className="skeleton h-4 w-20 rounded-full" /> : lang === "ar" ? "إرسال طلب السحب" : "Submit withdrawal"}
      </Button>
    </form>
  );
}

