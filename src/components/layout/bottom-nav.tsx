import { Link, useLocation } from "@tanstack/react-router";
import { Home, TrendingUp, Wallet, ArrowLeftRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/" as const, labelAr: "الرئيسية", labelEn: "Home", icon: Home },
  { to: "/invest" as const, labelAr: "الاستثمار", labelEn: "Invest", icon: TrendingUp },
  { to: "/wallet" as const, labelAr: "المحفظة", labelEn: "Wallet", icon: Wallet },
  { to: "/transfers" as const, labelAr: "الإيداع والسحب", labelEn: "Transfers", icon: ArrowLeftRight },
  { to: "/account" as const, labelAr: "حسابي", labelEn: "Account", icon: User },
];

function isActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function BottomNav({ lang }: { lang: "ar" | "en" }) {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="absolute inset-0 -top-10 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none" />
      <div className="relative mx-3 mb-3 rounded-[1.4rem] glass p-1.5 shadow-2xl">
        <div className="flex items-stretch justify-between gap-0.5">
          {ITEMS.map(({ to, labelAr, labelEn, icon: Icon }) => {
            const active = isActive(pathname, to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "group relative flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-semibold transition-all duration-300",
                  active ? "text-gold" : "text-muted-foreground hover:text-gold",
                )}
                aria-label={lang === "ar" ? labelAr : labelEn}
              >
                {active && (
                  <span className="absolute -top-1 h-1 w-8 rounded-full bg-gradient-to-r from-gold via-gold-soft to-gold shadow-[0_0_14px_rgba(212,175,55,0.6)]" />
                )}
                <span
                  className={cn(
                    "relative grid place-items-center rounded-xl transition-all duration-300",
                    active
                      ? "scale-110 bg-gradient-to-b from-gold/25 to-gold/5 text-gold shadow-[0_4px_18px_-4px_rgba(212,175,55,0.5)]"
                      : "group-hover:scale-105",
                  )}
                  style={{ width: 42, height: 30 }}
                >
                  <Icon
                    className={cn(
                      "transition-all duration-300",
                      active ? "h-5 w-5 animate-bounce-sm" : "h-5 w-5",
                    )}
                    strokeWidth={active ? 2.3 : 1.8}
                  />
                  {active && (
                    <span className="absolute inset-0 rounded-xl border border-gold/40 animate-pulse" />
                  )}
                </span>
                <span className={cn("truncate max-w-full leading-tight", active && "font-bold")}>
                  {lang === "ar" ? labelAr : labelEn}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

