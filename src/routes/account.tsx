import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useDemo, PLANS, fmt, fmtDate } from "@/lib/demo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Wallet, TrendingUp, LogOut, Crown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const { user, logout, requests } = useDemo();
  const navigate = useNavigate();

  if (!user) return null;

  const plan = PLANS.find((p) => p.id === user.planId);
  const myRequests = requests.filter((r) => r.userId === user.id);

  const stats = [
    {
      label: "الرصيد الحالي",
      value: fmt(user.balance),
      unit: "ج.م",
      icon: Wallet,
      color: "text-gold",
    },
    {
      label: "إجمالي الأرباح",
      value: fmt(user.profit),
      unit: "ج.م",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "عدد الطلبات",
      value: fmt(myRequests.length),
      unit: "طلب",
      icon: Phone,
      color: "text-accent",
    },
  ];

  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate({ to: "/auth" });
  };

  return (
    <AppShell>
      <PageHeader
        title="حسابي"
        subtitle="إدارة معلومات الحساب والإعدادات الشخصية"
      />

      {/* User Profile Header */}
      <div className="glass rounded-2xl p-6 sm:p-8 mb-6 border border-border/50">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-20 h-20 rounded-2xl glass border border-gold/20 flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-gold" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-display text-ivory mb-1">
              {user.fullName}
            </h2>
            <p className="text-muted-foreground mb-3">
              عضو منذ {fmtDate(user.joinedAt)}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium">
                ✓ موثق
              </span>
              <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium flex items-center gap-1">
                <Crown className="h-3.5 w-3.5" />
                {plan?.name ?? "بدون باقة"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass rounded-2xl p-4 sm:p-6 border border-border/50 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-display text-ivory mt-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">{stat.unit}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color} opacity-60`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Information */}
      <Card className="glass border-border/50 mb-8">
        <CardHeader>
          <CardTitle className="text-xl">معلومات الحساب</CardTitle>
          <CardDescription>بيانات حسابك الشخصية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                الاسم بالكامل
              </label>
              <div className="glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{user.fullName}</span>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                رقم الهاتف
              </label>
              <div className="glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span dir="ltr">{user.phone}</span>
              </div>
            </div>

            {/* Plan */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                الباقة النشطة
              </label>
              <div className="glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3">
                <Crown className="h-4 w-4 text-gold" />
                <span>{plan?.name ?? "بدون باقة"}</span>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                الحالة
              </label>
              <div className="glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-success" : "bg-destructive"}`} />
                <span>{user.status === "active" ? "نشط" : "موقوف"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <button
          onClick={handleLogout}
          className="flex-1 px-6 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          تسجيل الخروج
        </button>
      </div>
    </AppShell>
  );
}