import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, ReactNode } from "react";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useDemo } from "@/lib/demo";
import { Logo } from "./cinematic";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useDemo();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate({ to: "/auth" });
    }
  }, [user, navigate]);

  if (!user) return null;

  const navItems = [
    { to: "/" as const, label: "الرئيسية" },
    { to: "/dashboard" as const, label: "لوحة التحكم" },
    { to: "/plans" as const, label: "الباقات" },
    { to: "/requests" as const, label: "الطلبات" },
    { to: "/admin" as const, label: "الإدارة" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hidden on mobile */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl transition-all duration-300 hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo size={40} />
          </Link>

          {/* Desktop nav */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-gold hover:bg-gold/5 active:bg-gold/10"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* User menu */}
          <div className="flex items-center gap-2">
            <button
              className="relative inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-accent/40 transition-all"
              aria-label="الإشعارات"
              title="الإشعارات"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1 h-2 w-2 rounded-full bg-gold animate-pulse" />
            </button>

            <button
              onClick={() => logout()}
              className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-destructive/50 hover:text-destructive hover:bg-destructive/5"
              title="تسجيل الخروج"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {sidebarOpen && (
          <nav className="animate-reveal border-t border-border/40 bg-background/50 lg:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-gold hover:bg-gold/5"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Mobile Header - Visible only on mobile */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl transition-all duration-300 md:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo size={32} />
          </Link>

          {/* Mobile user menu */}
          <div className="flex items-center gap-2">
            <button
              className="relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-gold hover:bg-accent/40 transition-all"
              aria-label="الإشعارات"
              title="الإشعارات"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1 h-2 w-2 rounded-full bg-gold animate-pulse" />
            </button>

            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 p-2 text-sm font-medium text-muted-foreground transition-all hover:border-destructive/50 hover:text-destructive hover:bg-destructive/5"
              title="تسجيل الخروج"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content - Add padding for mobile bottom nav */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-28 md:pb-8">
        {children}
      </main>

      {/* Bottom Navigation - Mobile only */}
      <BottomNav />
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-10 animate-reveal">
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-ivory">{title}</h1>
      <p className="mt-4 max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground">{subtitle}</p>
      <div className="gold-line mt-6 max-w-32" />
    </div>
  );
}
