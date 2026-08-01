import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertCircle, TrendingUp, User } from "lucide-react";

interface Activity {
  id: string;
  type: "deposit" | "withdrawal" | "plan-upgrade" | "profile-update";
  name: string;
  action: string;
  amount?: number;
  timestamp: Date;
}

const SAMPLE_ACTIVITIES: Activity[] = [
  { id: "1", type: "deposit", name: "أحمد محمود", action: "قدّم طلب إيداع", amount: 25000, timestamp: new Date(Date.now() - 5 * 60000) },
  { id: "2", type: "plan-upgrade", name: "فاطمة علي", action: "ترقت إلى الباقة الذهبية", timestamp: new Date(Date.now() - 15 * 60000) },
  { id: "3", type: "withdrawal", name: "محمد حسن", action: "أكمل طلب السحب", amount: 50000, timestamp: new Date(Date.now() - 25 * 60000) },
  { id: "4", type: "deposit", name: "سارة يوسف", action: "قدّمت طلب إيداع", amount: 15000, timestamp: new Date(Date.now() - 40 * 60000) },
  { id: "5", type: "plan-upgrade", name: "علي محمود", action: "انضم للمنصة", timestamp: new Date(Date.now() - 55 * 60000) },
  { id: "6", type: "withdrawal", name: "ليلى إبراهيم", action: "أكمل عملية السحب", amount: 30000, timestamp: new Date(Date.now() - 70 * 60000) },
  { id: "7", type: "deposit", name: "خالد أحمد", action: "قدّم طلب إيداع", amount: 75000, timestamp: new Date(Date.now() - 85 * 60000) },
  { id: "8", type: "plan-upgrade", name: "نور الدين", action: "ترقت إلى الباقة البلاتينية", timestamp: new Date(Date.now() - 100 * 60000) },
];

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 60) return "منذ دقيقة";
  if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
  return `منذ ${Math.floor(diff / 86400)} يوم`;
}

function getActivityIcon(type: Activity["type"]) {
  const icons = {
    deposit: { Icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
    withdrawal: { Icon: CheckCircle2, color: "text-emerald", bg: "bg-emerald/10" },
    "plan-upgrade": { Icon: AlertCircle, color: "text-gold", bg: "bg-gold/10" },
    "profile-update": { Icon: User, color: "text-accent", bg: "bg-accent/10" },
  };
  return icons[type] || icons.deposit;
}

export function ActivityTicker() {
  const [activities, setActivities] = useState<Activity[]>(SAMPLE_ACTIVITIES);
  const [visibleActivityIndex, setVisibleActivityIndex] = useState(0);

  useEffect(() => {
    // Animate activities
    const interval = setInterval(() => {
      setVisibleActivityIndex((prev) => (prev + 1) % activities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activities.length]);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg sm:text-xl text-ivory">📊 نشاط الشبكة</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">عمليات حية من المستثمرين</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">مباشر</span>
        </div>
      </div>

      {/* Ticker Container */}
      <div className="space-y-2">
        {activities.map((activity, idx) => {
          const isActive = idx === visibleActivityIndex;
          const { Icon, color, bg } = getActivityIcon(activity.type);

          return (
            <div
              key={activity.id}
              className={`glass rounded-xl p-3 sm:p-4 border transition-all duration-500 transform ${
                isActive
                  ? "border-gold/40 scale-100 opacity-100 translate-x-0"
                  : "border-border/40 scale-95 opacity-60 translate-x-2"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className={`${bg} rounded-lg p-2 flex-shrink-0`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-semibold text-sm sm:text-base text-ivory truncate">{activity.name}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{activity.action}</span>
                    {activity.amount && (
                      <span className="text-xs sm:text-sm font-semibold text-gold">
                        +{activity.amount.toLocaleString("ar-EG")} ج.م
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground/70 mt-1">{getTimeAgo(activity.timestamp)}</p>
                </div>

                {/* Indicator */}
                {isActive && <div className="h-2 w-2 rounded-full bg-gold animate-pulse flex-shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-4 pt-3 border-t border-border/40">
        {activities.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setVisibleActivityIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === visibleActivityIndex
                ? "w-6 bg-gold"
                : "w-2 bg-border hover:bg-gold/40"
            }`}
            aria-label={`أنشطة ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
