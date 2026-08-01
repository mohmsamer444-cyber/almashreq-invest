import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Bell, Check, AlertCircle, Info, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "تم تأكيد الإيداع",
      description: "تم إيداع 500 ريال في محفظتك بنجاح",
      time: "منذ 2 ساعة",
      icon: Check,
      color: "bg-success/10 border-success/20",
      iconColor: "text-success",
    },
    {
      id: 2,
      type: "alert",
      title: "جديد: عرض خاص",
      description: "احصل على 50% إضافي على كل عملية إيداع",
      time: "منذ 4 ساعات",
      icon: TrendingUp,
      color: "bg-gold/10 border-gold/20",
      iconColor: "text-gold",
    },
    {
      id: 3,
      type: "info",
      title: "تحديث الأمان",
      description: "يُرجى تحديث كلمة المرور الخاصة بك",
      time: "منذ يوم",
      icon: Info,
      color: "bg-accent/10 border-accent/20",
      iconColor: "text-accent",
    },
    {
      id: 4,
      type: "warning",
      title: "انتهاء الباقة",
      description: "سينتهي اشتراكك في الباقة الذهبية خلال 3 أيام",
      time: "منذ يومين",
      icon: AlertCircle,
      color: "bg-warning/10 border-warning/20",
      iconColor: "text-warning",
    },
    {
      id: 5,
      type: "success",
      title: "سحب موافق عليه",
      description: "تمت الموافقة على طلب السحب برقم #54321",
      time: "منذ 3 أيام",
      icon: Check,
      color: "bg-success/10 border-success/20",
      iconColor: "text-success",
    },
    {
      id: 6,
      type: "info",
      title: "جديد: ميزة الإحالة",
      description: "قم بدعوة الأصدقاء واحصل على عمولة على أرباحهم",
      time: "منذ أسبوع",
      icon: Bell,
      color: "bg-accent/10 border-accent/20",
      iconColor: "text-accent",
    },
  ];

  return (
    <AppShell>
      <PageHeader
        title="الإشعارات"
        subtitle="تابع جميع تحديثاتك وعملياتك الأخيرة"
      />

      {/* Notifications List */}
      <div className="grid gap-3 sm:gap-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`glass rounded-2xl p-4 sm:p-5 border transition-all duration-300 hover:border-gold/40 ${notification.color} group cursor-pointer`}
            >
              <div className="flex gap-4">
                <div
                  className={`mt-1 rounded-lg p-2.5 ${notification.color} ${notification.iconColor}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ivory text-sm sm:text-base group-hover:text-gold transition-colors">
                    {notification.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-muted-foreground/60 text-xs mt-2">
                    {notification.time}
                  </p>
                </div>

                <div className="flex-shrink-0 h-2 w-2 rounded-full bg-gold/60 mt-2 group-hover:scale-150 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state placeholder */}
      <div className="mt-8 text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          ستظهر الإشعارات الجديدة هنا
        </p>
      </div>
    </AppShell>
  );
}
