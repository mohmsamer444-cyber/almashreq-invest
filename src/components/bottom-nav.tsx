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
      label: "استثماراتي",
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Premium blur background effect */}
      <div className="absolute inset-0 -top-12 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none" />

      {/* Nav container with premium floating effect */}
      <div className="relative mx-4 mb-5 rounded-2xl glass p-3 shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between gap-1">
          {navItems.map(({ to, label, icon: Icon, testId }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                data-testid={testId}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-xs font-medium transition-all duration-400 flex-1 ${
                  active
                    ? "bg-gradient-to-b from-gold/30 to-gold/15 text-gold shadow-lg scale-105 animate-glow-pulse"
                    : "text-muted-foreground hover:text-gold hover:bg-gold/10"
                }`}
                title={label}
              >
                <div className={`relative transition-all duration-400 ${active ? "scale-125" : ""}`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  {active && (
                    <div className="absolute -inset-2 rounded-lg border border-gold/40 animate-pulse blur-sm" />
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-center line-clamp-1">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
