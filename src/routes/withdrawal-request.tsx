import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FormField, Input, TextArea, SelectButton, Button } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Clock, CheckCircle, XCircle } from "lucide-react";
import { useDemo } from "@/lib/demo";

export const Route = createFileRoute("/withdrawal-request")({
  component: WithdrawalRequestPage,
});

function WithdrawalRequestPage() {
  const navigate = useNavigate();
  const { user } = useDemo();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    amount: "",
    withdrawalMethod: "vodafone",
    notes: "",
  });

  const withdrawalMethods = [
    { id: "vodafone", label: "📱 فودافون", icon: "📱" },
    { id: "orange", label: "🟠 أورانج", icon: "🟠" },
    { id: "etisalat", label: "📲 اتصالات", icon: "📲" },
    { id: "we-pay", label: "💳 WE Pay", icon: "💳" },
    { id: "instapay", label: "✨ InstaPay", icon: "✨" },
    { id: "bank", label: "🏦 تحويل بنكي", icon: "🏦" },
  ];

  const withdrawalHistory = [
    {
      id: 1,
      amount: 500,
      method: "فودافون",
      date: "2024-12-15",
      status: "completed",
      statusAr: "مكتمل",
    },
    {
      id: 2,
      amount: 1000,
      method: "أورانج",
      date: "2024-12-10",
      status: "completed",
      statusAr: "مكتمل",
    },
    {
      id: 3,
      amount: 250,
      method: "اتصالات",
      date: "2024-12-08",
      status: "pending",
      statusAr: "قيد المراجعة",
    },
    {
      id: 4,
      amount: 750,
      method: "WE Pay",
      date: "2024-12-05",
      status: "completed",
      statusAr: "مكتمل",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!formData.fullName || !formData.phone || !formData.amount) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    const amountNum = parseFloat(formData.amount);
    if (amountNum < 50) {
      alert("الحد الأدنى للسحب هو 50 ريال");
      return;
    }

    if (user && amountNum > user.balance) {
      alert("الرصيد غير كافي");
      return;
    }

    // Show success animation
    setSuccess(true);
    setTimeout(() => {
      navigate({ to: "/requests" });
    }, 2500);
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
                    disabled={!!user?.name}
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
                      placeholder="الحد الأدنى: 50 ريال"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      min="50"
                      step="10"
                      dir="ltr"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      ريال
                    </span>
                  </div>
                  {user && (
                    <p className="text-xs text-muted-foreground mt-2">
                      الرصيد المتاح: {user.balance.toLocaleString("ar-EG")} ريال
                    </p>
                  )}
                </FormField>

                {/* Withdrawal Method */}
                <FormField label="طريقة الاستلام" icon="🏦">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {withdrawalMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, withdrawalMethod: method.id })
                        }
                        className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                          formData.withdrawalMethod === method.id
                            ? "bg-gold/20 border-gold/40 text-gold"
                            : "border-border/50 text-muted-foreground hover:border-gold/30 hover:bg-gold/5"
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
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
                <p className="text-muted-foreground text-xs">50 ريال</p>
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
                {withdrawalHistory.map((withdrawal) => {
                  const StatusIcon =
                    withdrawal.status === "completed" ? CheckCircle : Clock;
                  const statusColor =
                    withdrawal.status === "completed"
                      ? "text-success"
                      : "text-warning";

                  return (
                    <div
                      key={withdrawal.id}
                      className="p-3 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium text-ivory">
                          {withdrawal.amount} ريال
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {withdrawal.method}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                        <p className="text-xs text-muted-foreground mt-1">
                          {withdrawal.statusAr}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
