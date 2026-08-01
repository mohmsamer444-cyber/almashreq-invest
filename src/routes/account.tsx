import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useDemo } from "@/lib/demo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Wallet, TrendingUp, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const { user, logout } = useDemo();
  const [editMode, setEditMode] = useState(false);

  if (!user) return null;

  const stats = [
    {
      label: "الرصيد الحالي",
      value: user.balance.toLocaleString("ar-EG"),
      unit: "ريال",
      icon: Wallet,
      color: "text-gold",
    },
    {
      label: "إجمالي الأرباح",
      value: user.totalProfit.toLocaleString("ar-EG"),
      unit: "ريال",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "عدد الطلبات",
      value: "12",
      unit: "طلب",
      icon: Phone,
      color: "text-accent",
    },
  ];

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
              {user.name}
            </h2>
            <p className="text-muted-foreground mb-3">
              عضو منذ ديسمبر 2024
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium">
                ✓ موثق
              </span>
              <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium">
                الباقة الذهبية
              </span>
            </div>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 rounded-lg bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20 transition-colors font-medium text-sm"
          >
            {editMode ? "إلغاء" : "تعديل"}
          </button>
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
                <span>{user.name}</span>
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                البريد الإلكتروني
              </label>
              <div className="glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span dir="ltr">{user.email || "لم يتم إدخاله"}</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                الموقع
              </label>
              <div className="glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>مصر</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="glass border-border/50 mb-8">
        <CardHeader>
          <CardTitle className="text-xl">الإعدادات</CardTitle>
          <CardDescription>إدارة تفضيلاتك والأمان</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gold" />
                <span className="font-medium">تغيير كلمة المرور</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <span className="font-medium">تحديث البريد الإلكتروني</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <span className="font-medium">تحديث رقم الهاتف</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <button
          onClick={() => logout()}
          className="flex-1 px-6 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          تسجيل الخروج
        </button>
        <button className="flex-1 px-6 py-3 rounded-lg bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-colors font-medium">
          حفظ التغييرات
        </button>
      </div>
    </AppShell>
  );
}
