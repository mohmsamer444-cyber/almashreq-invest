import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { I as Bell, R as ArrowUpDown, S as House, i as User, n as Wallet, s as TrendingUp, v as LogOut } from "../_libs/lucide-react.mjs";
import { a as Logo, h as useDemo } from "./cinematic-CeWt9z_f.mjs";
import { g as Link, l as useLocation, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-Dw57mmAJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BottomNav() {
	const location = useLocation();
	const navItems = [
		{
			to: "/",
			label: "الرئيسية",
			icon: House,
			testId: "nav-home"
		},
		{
			to: "/dashboard",
			label: "استثماراتي",
			icon: TrendingUp,
			testId: "nav-investments"
		},
		{
			to: "/plans",
			label: "المحفظة",
			icon: Wallet,
			testId: "nav-wallet"
		},
		{
			to: "/requests",
			label: "الإيداع والسحب",
			icon: ArrowUpDown,
			testId: "nav-transfers"
		},
		{
			to: "/account",
			label: "حسابي",
			icon: User,
			testId: "nav-account"
		}
	];
	const isActive = (path) => {
		if (path === "/") return location.pathname === "/";
		if (path === "/dashboard") return location.pathname.startsWith("/dashboard");
		return location.pathname.startsWith(path);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "fixed bottom-0 left-0 right-0 z-50 md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -top-12 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-4 mb-5 rounded-2xl glass p-3 shadow-2xl animate-slide-in-right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between gap-1",
				children: navItems.map(({ to, label, icon: Icon, testId }) => {
					const active = isActive(to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						"data-testid": testId,
						className: `flex flex-col items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-xs font-medium transition-all duration-400 flex-1 ${active ? "bg-gradient-to-b from-gold/30 to-gold/15 text-gold shadow-lg scale-105 animate-glow-pulse" : "text-muted-foreground hover:text-gold hover:bg-gold/10"}`,
						title: label,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative transition-all duration-400 ${active ? "scale-125" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 sm:h-6 sm:w-6" }), active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-2 rounded-lg border border-gold/40 animate-pulse blur-sm" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] sm:text-xs text-center line-clamp-1",
							children: label
						})]
					}, to);
				})
			})
		})]
	});
}
function AppShell({ children }) {
	const { user, logout } = useDemo();
	const navigate = useNavigate();
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth" });
	}, [user, navigate]);
	if (!user) return null;
	const navItems = [
		{
			to: "/",
			label: "الرئيسية"
		},
		{
			to: "/dashboard",
			label: "لوحة التحكم"
		},
		{
			to: "/plans",
			label: "الباقات"
		},
		{
			to: "/requests",
			label: "الطلبات"
		},
		{
			to: "/admin",
			label: "الإدارة"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border/40 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl transition-all duration-300 hidden md:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex items-center gap-3 hover:opacity-80 transition-opacity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 40 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex items-center gap-1",
							children: navItems.map(({ to, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to,
								className: "rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-gold hover:bg-gold/5 active:bg-gold/10",
								children: label
							}, to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "relative inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-accent/40 transition-all",
								"aria-label": "الإشعارات",
								title: "الإشعارات",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1 h-2 w-2 rounded-full bg-gold animate-pulse" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => logout(),
								className: "flex items-center gap-2 rounded-full border border-border/70 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-destructive/50 hover:text-destructive hover:bg-destructive/5",
								title: "تسجيل الخروج",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "خروج"
								})]
							})]
						})
					]
				}), sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "animate-reveal border-t border-border/40 bg-background/50 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1 px-4 py-3",
						children: navItems.map(({ to, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to,
							onClick: () => setSidebarOpen(false),
							className: "rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-gold hover:bg-gold/5",
							children: label
						}, to))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/40 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl transition-all duration-300 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex items-center gap-3 hover:opacity-80 transition-opacity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 32 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-gold hover:bg-accent/40 transition-all",
							"aria-label": "الإشعارات",
							title: "الإشعارات",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1 h-2 w-2 rounded-full bg-gold animate-pulse" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => logout(),
							className: "inline-flex items-center gap-2 rounded-full border border-border/70 p-2 text-sm font-medium text-muted-foreground transition-all hover:border-destructive/50 hover:text-destructive hover:bg-destructive/5",
							title: "تسجيل الخروج",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pb-28 md:pb-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
}
function PageHeader({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-10 animate-reveal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-ivory",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground",
				children: subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-line mt-6 max-w-32" })
		]
	});
}
//#endregion
export { PageHeader as n, AppShell as t };
