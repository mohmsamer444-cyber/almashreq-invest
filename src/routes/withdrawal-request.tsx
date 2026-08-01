import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FormField, Input, TextArea, Button } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useDemo, PAYMENT_METHODS, fmt, fmtDate } from "@/lib/demo";
import { toast } from "sonner";

export const Route = createFileRoute("/withdrawal-request")({
  component: WithdrawalRequestPage,
});

function WithdrawalRequestPage() {
  const navigate = useNavigate();
  const { user, submitRequest, requests } = useDemo();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    amount: "",
    withdrawalMethod: "فودافون كاش",
    destinationAccount: "",
    notes: "",
  });

  const myWithdrawals = requests.filter((r) => r.kind === "withdraw" && r.userId === user?.id).slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!formData.fullName.trim()) {
      toast.error("الرجاء إدخال الاسم بالكامل");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("الرجاء إدخال رقم الهاتف");
      return;
    }
    if (!formData.amount) {
      toast.error("الرجاء إدخال المبلغ المطلوب");
      return;
    }
    if (!formData.destinationAccount.trim()) {
      toast.error("الرجاء إدخال رقم الحساب المستلم");
      return;
    }

    const amountNum = parseFloat(formData.amount);
    if (isNaN(amountNum) || amountNum < 50) {
      toast.error("الحد الأدنى للسحب هو 50 ج.م");
      return;
    }

    if (user && amountNum > user.balance) {
      toast.error("الرصيد غير كافٍ لهذا السحب");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      submitRequest({
        kind: "withdraw",
        method: formData.withdrawalMethod,
        amount: amountNum,
        account: formData.destinationAccount,
        status: "pending",
        ...(formData.notes.trim() ? { note: formData.notes.trim() } : {}),
      });
      setLoading(false);
      setSuccess(true);
      toast.success("تم إرسال طلب السحب بنجاح");
    }, 800);
  };

  if (success) {
    return (
      <AppShell>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="glass rounded-3xl p-8 sm:p-12 border border-gold/20 text-center max-w-md animate-reveal">
            <div className="mb-6 flex justify-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full bg-success/20 animate-pulse" />
                <div className="absolute inset-2 rounded-full bg-success/30 animate-pulse animation-delay-100" />
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-success animate-bounce" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display text-ivory mb-3">
              تم بنجاح!
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              تم استقبال طلب السحب الخاص بك. سيتم المراجعة خلال ساعات قليلة.
            </p>

            <div className="mb-6 glass rounded-xl p-4 border border-success/20 text-sm text-muted-foreground text-right">
              <p className="mb-2 font-medium text-ivory">رقم الطلب: #54322</p>
              <p>ستتلقى الأموال في غضون 24 ساعة عمل</p>
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
        title="طلب سحب"
        subtitle="اسحب أموالك من محفظتك بسهولة وأمان"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="glass border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="text-xl">معلومات السحب</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <FormField
                  label="الاسم بالكامل"
                  icon="👤"
                  error={!formData.fullName ? "الاسم مطلوب" : ""}
                >
                  <Input
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    disabled={!!user?.fullName}
                  />
                </FormField>

                {/* Phone */}
                <FormField
                  label="رقم الهاتف"
                  icon="📱"
                  error={!formData.phone ? "رقم الهاتف مطلوب" : ""}
                >
                  <Input
                    type="tel"
                    placeholder="مثال: 01012345678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={!!user?.phone}
                    dir="ltr"
                  />
                </FormField>

                {/* Amount */}
                <FormField
                  label="المبلغ المطلوب"
                  icon="💰"
                  error={!formData.amount ? "المبلغ مطلوب" : ""}
                >
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="الحد الأدنى: 50 ج.م"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      min="50"
                      step="10"
                      dir="ltr"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      ج.م
                    </span>
                  </div>
                  {user && (
                    <p className="text-xs text-muted-foreground mt-2">
                      الرصيد المتاح: {fmt(user.balance)} ج.م
                    </p>
                  )}
                </FormField>

                {/* Withdrawal Method */}
                <FormField label="طريقة الاستلام" icon="🏦">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, withdrawalMethod: method.label })
                        }
                        className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                          formData.withdrawalMethod === method.label
                            ? "bg-gold/20 border-gold/40 text-gold"
                            : "border-border/50 text-muted-foreground hover:border-gold/30 hover:bg-gold/5"
                        }`}
                      >
                        <span className="block text-xl mb-1">{method.icon}</span>
                        {method.label}
                      </button>
                    ))}
                  </div>
                </FormField>

                {/* Destination Account */}
                <FormField
                  label="رقم الحساب المستلم"
                  icon="💳"
                  error={!formData.destinationAccount ? "رقم الحساب مطلوب" : ""}
                >
                  <Input
                    type="text"
                    placeholder="أدخل رقم المحفظة أو الحساب البنكي"
                    value={formData.destinationAccount}
                    onChange={(e) =>
                      setFormData({ ...formData, destinationAccount: e.target.value })
                    }
                    dir="ltr"
                  />
                </FormField>

                {/* Notes */}
                <FormField label="ملاحظات (اختيارية)" icon="📝">
                  <TextArea
                    placeholder="أضف أي ملاحظات إضافية..."
                    rows={4}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </FormField>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    طلب السحب
                  </Button>
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/requests" })}
                    className="px-6 py-3 rounded-lg border border-border/50 text-muted-foreground hover:bg-gold/5 transition-colors font-medium"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <div className="lg:col-span-1">
          <Card className="glass border-border/50 mb-8 sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">معلومات السحب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-4 rounded-lg bg-gold/5 border border-gold/20">
                <p className="font-medium text-gold mb-2">الحد الأدنى:</p>
                <p className="text-muted-foreground text-xs">50 ج.م</p>
              </div>

              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <p className="font-medium text-accent mb-2">وقت المعالجة:</p>
                <p className="text-muted-foreground text-xs">
                  تتم معالجة الطلبات خلال 24 ساعة عمل
                </p>
              </div>

              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <p className="font-medium text-success mb-2">الرسوم:</p>
                <p className="text-muted-foreground text-xs">بدون رسوم إضافية</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Withdrawals */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">السحبيات الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myWithdrawals.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    لا توجد سحبيات سابقة بعد
                  </p>
                )}
                {myWithdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="p-3 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium text-ivory">
                        {fmt(withdrawal.amount)} ج.م
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {withdrawal.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mt-1">
                        {fmtDate(withdrawal.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
