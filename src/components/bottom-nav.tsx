import { Link, useLocation } from "@tanstack/react-router";
import { Home, TrendingUp, Wallet, ArrowUpDown, User } from "lucide-react";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    {
      to: "/" as const,
      label: "الرئيسية",
      icon: Home,
      testId: "nav-home",
    },
    {
      to: "/dashboard" as const,
      label: "الاستثمار",
      icon: TrendingUp,
      testId: "nav-investments",
    },
    {
      to: "/plans" as const,
      label: "المحفظة",
      icon: Wallet,
      testId: "nav-wallet",
    },
    {
      to: "/requests" as const,
      label: "الإيداع والسحب",
      icon: ArrowUpDown,
      testId: "nav-transfers",
    },
    {
      to: "/account" as const,
      label: "حسابي",
      icon: User,
      testId: "nav-account",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/dashboard") {
      return location.pathname.startsWith("/dashboard");
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      {/* Premium blur background effect */}
      <div className="absolute inset-0 -top-12 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none" />

      {/* Nav container with premium floating effect */}
      <div className="relative mx-3 mb-3 rounded-2xl glass p-2 shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between gap-0.5">
          {navItems.map(({ to, label, icon: Icon, testId }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                data-testid={testId}
                className={`relative flex flex-col items-center justify-center gap-1.5 rounded-xl px-1.5 py-2.5 text-[10px] font-semibold transition-all duration-300 flex-1 will-change-transform ${
                  active
                    ? "text-gold"
                    : "text-muted-foreground hover:text-gold hover:bg-gold/5"
                }`}
                title={label}
              >
                {/* Active indicator pill - top accent */}
                {active && (
                  <span className="absolute -top-1 h-1.5 w-7 rounded-full bg-gradient-to-r from-gold via-gold/80 to-gold/60 shadow-[0_0_16px_rgba(212,175,55,0.6)] animate-pulse" />
                )}

                {/* Icon container */}
                <span
                  className={`relative grid place-items-center rounded-xl transition-all duration-300 will-change-transform ${
                    active
                      ? "bg-gradient-to-b from-gold/25 to-gold/10 text-gold scale-110 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.5)]"
                      : ""
                  }`}
                  style={{ width: 36, height: 28 }}
                >
                  <Icon 
                    className={`transition-all duration-300 will-change-transform ${
                      active ? "h-5 w-5 animate-bounce-sm" : "h-5 w-5"
                    }`}
                    strokeWidth={active ? 2.2 : 1.8}
                  />
                  {active && (
                    <span className="absolute inset-0 rounded-xl border border-gold/40 animate-pulse" />
                  )}
                </span>

                {/* Label */}
                <span 
                  className={`leading-tight truncate max-w-full transition-all duration-300 ${
                    active ? "text-gold font-bold" : ""
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}