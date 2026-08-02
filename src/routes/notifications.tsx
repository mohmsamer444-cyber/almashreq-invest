import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "@/components/layout/theme";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/ui";
import { cn, fmtDateTime } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "الإشعارات | منصة المشرق" },
      { name: "description", content: "جميع إشعارات وتنبيهات المنصة." },
    ],
  }),
  component: NotificationsPage,
});

function getIcon(title: string, body: string) {
  const t = (title + " " + body).toLowerCase();
  if (
    t.includes("اعتماد") ||
    t.includes("approved") ||
    t.includes("إيداع") ||
    t.includes("deposit")
  )
    return { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" };
  if (t.includes("رفض") || t.includes("rejected") || t.includes("reject"))
    return {
      icon: XCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    };
  if (t.includes("ربح") || t.includes("profit") || t.includes("return"))
    return { icon: TrendingUp, color: "text-gold", bg: "bg-gold/10" };
  if (t.includes("تحذير") || t.includes("warning") || t.includes("تنبيه"))
    return { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" };
  if (
    t.includes("ترقية") ||
    t.includes("upgrade") ||
    t.includes("باقة") ||
    t.includes("package")
  )
    return { icon: TrendingUp, color: "text-emerald", bg: "bg-emerald/10" };
  if (
    t.includes("جديد") ||
    t.includes("new") ||
    t.includes("مستخدم") ||
    t.includes("user")
  )
    return { icon: UserPlus, color: "text-blue-400", bg: "bg-blue-400/10" };
  return { icon: Bell, color: "text-accent", bg: "bg-accent/10" };
}

function NotificationsPage() {
  const { notifications, user } = useStore();
  const { lang } = useSettings();

  if (!user) return null;

  const userNotifications = notifications.filter(
    (n) => n.userId === "all" || n.userId === user.id,
  );
  const unread = userNotifications.filter((n) => !n.read).length;

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "الإشعارات" : "Notifications"}
        subtitle={
          lang === "ar"
            ? `لديك ${unread} إشعار غير مقروء`
            : `You have ${unread} unread notification${unread !== 1 ? "s" : ""}`
        }
      />

      {userNotifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="h-8 w-8" />}
          title={lang === "ar" ? "لا توجد إشعارات" : "No notifications"}
          body={
            lang === "ar"
              ? "ستظهر الإشعارات الجديدة هنا"
              : "New notifications will appear here"
          }
        />
      ) : (
        <div className="grid gap-3">
          {userNotifications.map((n) => {
            const { icon: Icon, color, bg } = getIcon(n.title, n.body);
            return (
              <div
                key={n.id}
                className={cn(
                  "glass rounded-2xl border p-5 transition-all duration-300 hover:border-gold/40",
                  n.read ? "border-border/40" : "border-gold/20",
                )}
              >
                <div className="flex gap-4">
                  <div className={cn("shrink-0 rounded-xl p-2.5", bg)}>
                    <Icon className={cn("h-5 w-5", color)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3
                          className={cn(
                            "text-sm font-semibold",
                            n.read ? "text-muted-foreground" : "text-ivory",
                          )}
                        >
                          {n.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-1 text-xs leading-6",
                            n.read
                              ? "text-muted-foreground/60"
                              : "text-muted-foreground",
                          )}
                        >
                          {n.body}
                        </p>
                      </div>
                      {!n.read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                      )}
                    </div>
                    <p className="mt-2 text-[11px] text-muted-foreground/60">
                      {fmtDateTime(n.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
