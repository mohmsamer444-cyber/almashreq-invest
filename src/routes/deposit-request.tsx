import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Upload, Check, ArrowRight, Loader2 } from "lucide-react";
import { useDemo, PAYMENT_METHODS, fmt } from "@/lib/demo";
import { toast } from "sonner";

export const Route = createFileRoute("/deposit-request")({
  component: DepositRequestPage,
});

function DepositRequestPage() {
  const navigate = useNavigate();
  const { user, submitRequest } = useDemo();
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<"method" | "form" | "review">("method");
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    phone: "",
    fileName: null as string | null,
  });

  const handleMethodSelect = (methodId: number) => {
    setSelectedMethod(methodId);
    setStep("form");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.phone || !formData.fileName) {
      toast.error("الرجاء ملء جميع الحقول");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount < 50) {
      toast.error("الحد الأدنى للإيداع هو 50 ريال");
      return;
    }

    setStep("review");
  };

  const handleConfirm = () => {
    if (!selectedMethod) return;
    
    setLoading(true);
    const method = PAYMENT_METHODS.find((m) => m.id === selectedMethod);
    
    setTimeout(() => {
      submitRequest({
        kind: "deposit",
        method: method?.label || "Unknown",
        amount: parseFloat(formData.amount),
        account: formData.phone,
        status: "pending",
      });
      
      setSuccess(true);
      setLoading(false);
      toast.success("تم إرسال طلب الإيداع");
      
      setTimeout(() => {
        navigate({ to: "/requests" });
      }, 2500);
    }, 1200);
  };

  if (success) {
    return (
      <AppShell>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="glass rounded-3xl p-8 sm:p-12 border border-gold/20 text-center max-w-md animate-reveal">
            <div className="mb-6 flex justify-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full bg-success/20 animate-pulse" />
                <div className="absolute inset-2 rounded-full bg-success/30" />
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-success animate-bounce" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display text-ivory mb-3">تم بنجاح!</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              تم استقبال طلب الإيداع الخاص بك بقيمة {fmt(parseFloat(formData.amount))} ج.م
            </p>

            <div className="mb-6 glass rounded-xl p-4 border border-success/20 text-sm text-muted-foreground text-right space-y-2">
              <p className="font-medium text-ivory">🎫 رقم الطلب: #{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
              <p>⏱️ المدة المتوقعة: 2-4 ساعات</p>
            </div>

            <button
              onClick={() => navigate({ to: "/requests" })}
              className="w-full px-6 py-3 rounded-xl bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 transition-all font-medium flex items-center justify-center gap-2"
            >
              العودة للطلبات
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title={step === "method" ? "طريقة الإيداع" : step === "form" ? "بيانات الإيداع" : "تأكيد الطلب"}
        subtitle={
          step === "method"
            ? "اختر طريقة الإيداع المناسبة لك"
            : step === "form"
              ? "أدخل تفاصيل عملية الإيداع"
              : "تحقق من البيانات وأكد الطلب"
        }
      />

      {step === "method" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className="group lift relative overflow-hidden rounded-2xl glass p-6 border border-border/60 text-right transition-all hover:border-gold/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-3xl">{method.icon}</div>
                <div className="text-right flex-1">
                  <p className="font-display text-lg text-ivory">{method.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{method.hint}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2 text-gold group-hover:gap-3 transition-all">
                <span className="text-xs">اختر</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      )}

      {step === "form" && selectedMethod && (
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">المبلغ المراد إيداعه</label>
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  max="10000000"
                  step="100"
                  placeholder="أدخل المبلغ"
                  value={formData.amount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                  className="w-full px-6 py-4 rounded-2xl glass border border-border/60 bg-background/40 text-xl font-display text-ivory placeholder:text-muted-foreground/60 outline-none transition-all focus:border-gold/60"
                />
                <span className="absolute left-6 top-4 text-gold font-display text-xl">ج.م</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">الحد الأدنى: 50 ج.م</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">رقم المحفظة أو الحساب</label>
              <input
                type="tel"
                placeholder={PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.hint}
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-6 py-4 rounded-2xl glass border border-border/60 bg-background/40 text-ivory placeholder:text-muted-foreground/60 outline-none transition-all focus:border-gold/60"
                dir="ltr"
              />
            </div>

            {/* Receipt Upload */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">صورة الإيصال</label>
              <label className="relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gold/30 rounded-2xl cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-all glass">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gold mb-3" />
                  <p className="text-sm text-muted-foreground">
                    {formData.fileName ? (
                      <span className="font-medium text-gold">{formData.fileName}</span>
                    ) : (
                      <>
                        <span className="font-medium block">انقر لاختيار الملف</span>
                        <span className="text-xs block mt-1">أو اسحب الملف هنا</span>
                      </>
                    )}
                  </p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-4 rounded-xl bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 transition-all font-medium flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                المراجعة
              </button>
              <button
                type="button"
                onClick={() => setStep("method")}
                className="px-6 py-4 rounded-xl border border-border/50 text-muted-foreground hover:bg-gold/5 transition-colors font-medium"
              >
                رجوع
              </button>
            </div>
          </form>
        </div>
      )}

      {step === "review" && (
        <div className="max-w-2xl">
          <div className="glass rounded-3xl p-8 border border-border/60 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">طريقة الإيداع</p>
                <p className="font-display text-lg text-ivory">{PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.label}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">المبلغ</p>
                <p className="font-display text-lg text-gold">{fmt(parseFloat(formData.amount))} ج.م</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">رقم الحساب</p>
                <p className="font-mono text-sm text-ivory" dir="ltr">{formData.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">الإيصال</p>
                <p className="text-sm text-success">✓ {formData.fileName}</p>
              </div>
            </div>

            <div className="rounded-xl bg-gold/5 border border-gold/20 p-4">
              <p className="text-xs text-muted-foreground">
                💡 هذه بيئة عرض تجريبية. لن تتم أي عمليات حقيقية.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-xl bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 disabled:opacity-70 transition-all font-medium flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    جاري المعالجة...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    تأكيد الطلب
                  </>
                )}
              </button>
              <button
                onClick={() => setStep("form")}
                disabled={loading}
                className="px-6 py-4 rounded-xl border border-border/50 text-muted-foreground hover:bg-gold/5 disabled:opacity-70 transition-colors font-medium"
              >
                رجوع
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
