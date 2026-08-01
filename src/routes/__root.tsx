import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { StoreProvider, useStore } from "@/lib/store";
import { SettingsProvider, useSettings } from "@/components/layout/theme";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-gold-gradient">٤٠٤</h1>
        <h2 className="mt-4 font-display text-xl text-ivory">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">الرابط الذي تبحث عنه غير متاح أو تم نقله.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-graphite"
          style={{ backgroundImage: "var(--gradient-gold)" }}
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-ivory">تعذّر تحميل الصفحة</h1>
        <p className="mt-2 text-sm text-muted-foreground">حدث خطأ غير متوقع، جرّب إعادة المحاولة.</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-graphite"
          style={{ backgroundImage: "var(--gradient-gold)" }}
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "منصة المشرق | Al-Mashreq Platform" },
      { name: "description", content: "منصة المشرق — منصة متكاملة لإدارة المحافظ الاستثمارية بتجربة فاخرة." },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#101014" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AuthGuard({ children }: { children: ReactNode }) {
  const { user } = useStore();
  const navigate = useNavigate();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  const isAuthPage = pathname === "/auth";

  useEffect(() => {
    if (!user && !isAuthPage) {
      navigate({ to: "/auth" });
    }
  }, [user, isAuthPage, navigate]);

  if (!user && !isAuthPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="skeleton h-8 w-48 rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <SettingsProvider>
          <AuthGuard>
            <Outlet />
            <Toaster position="top-center" richColors />
          </AuthGuard>
        </SettingsProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

