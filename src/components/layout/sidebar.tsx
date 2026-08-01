import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Home,
  TrendingUp,
  Wallet,
  ArrowLeftRight,
  User,
  Bell,
  ShieldCheck,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useSettings } from "./theme";
import { Logo } from "./logo";
import { cn, initials } from "@/lib/utils";

export function Sidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useStore();
  const { lang, isDark, toggleTheme } = useSettings();
  const navigate = useNavigate();

  if (!user) return null;

  const main = [
    { to: "/", labelAr: "الرئيسية", labelEn: "Home", icon: Home },
    { to: "/invest", labelAr: "الاستثمار", labelEn: "Invest", icon: TrendingUp },
    { to: "/wallet", labelAr: "المحفظة", labelEn: "Wallet", icon: Wallet },
    { to: "/transfers", labelAr: "الإيداع والسحب", labelEn: "Transfers", icon: ArrowLeftRight },
    { to: "/account", labelAr: "حسابي", labelEn: "Account", icon: User },
  ];

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  return (
    <aside className="fixed inset-y-0 start-0 z-40 hidden w-[270px] flex-col border-e border-border/50 bg-sidebar/70 backdrop-blur-2xl md:flex">
      <div className="px-6 pt-7">
        <Link to="/" className="inline-block">
          <Logo size={44} />
        </Link>
      </div>

      <div className="mx-6 mt-7 rounded-2xl glass p-4">
        <div className="flex items-center gap-3">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
            style={{ background: user.avatarColor }}
          >
            {initials(user.fullName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ivory">{user.fullName}</p>
            <p className="truncate text-[11px] text-muted-foreground" dir="ltr">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-1 overflow-y-auto px-4">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {lang === "ar" ? "القائمة الرئيسية" : "Main menu"}
        </p>
        {main.map(({ to, labelAr, labelEn, icon: Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-all duration-300",
                active
                  ? "bg-gradient-to-l from-gold/20 to-transparent text-gold shadow-[inset_0_0_0_1px_rgba(212,175,55,0.25)]"
                  : "text-muted-foreground hover:bg-gold/5 hover:text-ivory",
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-xl transition-all duration-300",
                  active
                    ? "bg-gold/15 text-gold"
                    : "bg-background/40 text-muted-foreground group-hover:text-gold",
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.8} />
              </span>
              {lang === "ar" ? labelAr : labelEn}
              {active && <span className="ms-auto h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />}
            </Link>
          );
        })}

        {user.role === "admin" && (
          <>
            <p className="px-3 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {lang === "ar" ? "الإدارة" : "Admin"}
            </p>
            <Link
              to="/admin"
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition-all duration-300",
                isActive("/admin")
                  ? "bg-gradient-to-l from-emerald/25 to-transparent text-emerald shadow-[inset_0_0_0_1px_rgba(45,212,140,0.25)]"
                  : "text-muted-foreground hover:bg-emerald/5 hover:text-ivory",
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-xl transition-all duration-300",
                  isActive("/admin")
                    ? "bg-emerald/15 text-emerald"
                    : "bg-background/40 text-muted-foreground group-hover:text-emerald",
                )}
              >
                <ShieldCheck className="h-[18px] w-[18px]" />
              </span>
              {lang === "ar" ? "لوحة الإدارة" : "Admin"}
            </Link>
          </>
        )}
      </nav>

      <div className="border-t border-border/50 px-4 py-4">
        <Link
          to="/notifications"
          className="mb-1 flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          <Bell className="h-[18px] w-[18px]" />
          {lang === "ar" ? "الإشعارات" : "Notifications"}
        </Link>
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          {isDark ? (lang === "ar" ? "الوضع النهاري" : "Light mode") : lang === "ar" ? "الوضع الليلي" : "Dark mode"}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-destructive"
        >
          <LogOut className="h-[18px] w-[18px]" />
          {lang === "ar" ? "تسجيل الخروج" : "Log out"}
        </button>
      </div>
    </aside>
  );
}

