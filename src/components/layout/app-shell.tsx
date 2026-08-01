import { type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useSettings } from "./theme";
import { Sidebar } from "./sidebar";
import { BottomNav } from "./bottom-nav";
import { LogoMark } from "./logo";
import { cn, initials } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout, notifications } = useStore();
  const { lang, isDark, toggleTheme } = useSettings();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  if (!user) return null;

  const unread = notifications.filter((n) => n.userId === user.id || n.userId === "all").filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen">
      <Sidebar />

      {/* Mobile header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link to="/">
            <LogoMark size={36} />
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-gold"
              aria-label="Theme"
            >
              {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <Link
              to="/notifications"
              className="relative grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-gold"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              {unread > 0 && (
                <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-gold animate-pulse" />
              )}
            </Link>
            <button
              onClick={() => setMobileMenu((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-gold"
              aria-label="Menu"
            >
              {mobileMenu ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="animate-reveal border-t border-border/40 px-4 py-4">
            <div className="flex items-center gap-3 rounded-2xl glass p-3">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                style={{ background: user.avatarColor }}
              >
                {initials(user.fullName)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ivory">{user.fullName}</p>
                <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-destructive"
            >
              <LogOut className="h-[18px] w-[18px]" />
              {lang === "ar" ? "تسجيل الخروج" : "Log out"}
            </button>
          </div>
        )}
      </header>

      <main className="md:ms-[270px]">
        <div className={cn("mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 md:pb-12 lg:px-10")}>
          {children}
        </div>
      </main>

      <BottomNav lang={lang} />
    </div>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-8 animate-reveal">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ivory sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{subtitle}</p>}
        </div>
        {children}
      </div>
      <div className="gold-line mt-6 max-w-32" />
    </div>
  );
}

