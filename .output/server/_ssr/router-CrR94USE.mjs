import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { r as DemoProvider, t as CinematicBackdrop } from "./cinematic-CeWt9z_f.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CrR94USE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-oQTdfEx9.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	const errorData = {
		message: error.message,
		stack: error.stack,
		context,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		url: window.location.href
	};
	console.error("[Lovable Error]", errorData);
	if (window.__lovable_error_reporter) try {
		window.__lovable_error_reporter(errorData);
	} catch (e) {
		console.error("Failed to report error to Lovable", e);
	}
}
function Toaster$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		...props,
		theme: "dark",
		toastOptions: { classNames: {
			toast: "bg-background border border-border rounded-lg shadow-lg",
			description: "text-muted-foreground",
			success: "border-success/40",
			error: "border-destructive/40",
			warning: "border-warning/40"
		} }
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl text-gold-gradient",
					children: "٤٠٤"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-xl text-ivory",
					children: "الصفحة غير موجودة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "الرابط الذي تبحث عنه غير متاح أو تم نقله."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
						children: "العودة للرئيسية"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl text-ivory",
					children: "تعذّر تحميل الصفحة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "حدث خطأ غير متوقع، جرّب التحديث."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground",
						children: "إعادة المحاولة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-border px-5 py-2.5 text-sm text-foreground",
						children: "الرئيسية"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "منصة المشرق | Al-Mashreq Platform" },
			{
				name: "description",
				content: "منصة المشرق — بيئة عرض تجريبية فاخرة لإدارة المحافظ والباقات الاستثمارية."
			},
			{
				name: "author",
				content: "Al-Mashreq"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DemoProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicBackdrop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		] })
	});
}
var $$splitComponentImporter$9 = () => import("./routes-CHnTS7Tu.mjs");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "منصة المشرق | إدارة ثروات بتجربة سينمائية" },
		{
			name: "description",
			content: "منصة المشرق: بيئة عرض تجريبية فاخرة لإدارة المحافظ والباقات الاستثمارية مع لوحة تحكم ولوحة إدارة كاملة."
		},
		{
			property: "og:title",
			content: "منصة المشرق | إدارة ثروات بتجربة سينمائية"
		},
		{
			property: "og:description",
			content: "باقات استثمارية، محفظة لحظية، وطلبات إيداع وسحب — بيئة تجريبية متكاملة."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./account-CG_E62tg.mjs");
var Route$8 = createFileRoute("/account")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./admin-BrnJvFEy.mjs");
var Route$7 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "لوحة الإدارة | منصة المشرق" },
		{
			name: "description",
			content: "إدارة المستخدمين والطلبات والباقات والتقارير وسجل النشاط في منصة المشرق."
		},
		{
			property: "og:title",
			content: "لوحة الإدارة | منصة المشرق"
		},
		{
			property: "og:description",
			content: "بحث، فلاتر، رسوم بيانية، واعتماد الطلبات ضمن بيئة تجريبية."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./auth-Cx5GSkNH.mjs");
var Route$6 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "تسجيل الدخول | منصة المشرق" },
		{
			name: "description",
			content: "سجل الدخول أو أنشئ حسابًا جديدًا للدخول إلى منصة المشرق الفاخرة."
		},
		{
			property: "og:title",
			content: "تسجيل الدخول | منصة المشرق"
		},
		{
			property: "og:description",
			content: "بوابة الدخول الآمنة والمشفرة لمنصة إدارة المحافظ الاستثمارية."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./dashboard-0btXfp4I.mjs");
var Route$5 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "لوحة التحكم | منصة المشرق" },
		{
			name: "description",
			content: "تابع رصيدك ومحفظتك وأرباحك وآخر الطلبات داخل منصة المشرق."
		},
		{
			property: "og:title",
			content: "لوحة التحكم | منصة المشرق"
		},
		{
			property: "og:description",
			content: "محفظة لحظية، رسوم بيانية، وإشعارات داخل بيئة العرض التجريبية."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./deposit-request-BE1mn9Kd.mjs");
var Route$4 = createFileRoute("/deposit-request")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./notifications-DQC8zieP.mjs");
var Route$3 = createFileRoute("/notifications")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./plans-vvq8YoEf.mjs");
var Route$2 = createFileRoute("/plans")({
	head: () => ({ meta: [
		{ title: "الباقات الاستثمارية | منصة المشرق" },
		{
			name: "description",
			content: "سبع باقات استثمارية تجريبية من الفضية حتى VIP المشرق بعوائد ومزايا متدرجة."
		},
		{
			property: "og:title",
			content: "الباقات الاستثمارية | منصة المشرق"
		},
		{
			property: "og:description",
			content: "قارن الباقات، العوائد اليومية، والمزايا داخل بيئة العرض."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./requests-CyguIe7p.mjs");
var Route$1 = createFileRoute("/requests")({
	head: () => ({ meta: [
		{ title: "طلبات الإيداع والسحب | منصة المشرق" },
		{
			name: "description",
			content: "قدّم طلبات إيداع وسحب تجريبية عبر المحافظ الإلكترونية والتحويل البنكي مع خط زمني للحالة."
		},
		{
			property: "og:title",
			content: "طلبات الإيداع والسحب | منصة المشرق"
		},
		{
			property: "og:description",
			content: "نماذج طلبات بتحقق كامل، رفع إيصال، وسجل حالات."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./withdrawal-request-BJv9Azn5.mjs");
var Route = createFileRoute("/withdrawal-request")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	AccountRoute: Route$8.update({
		id: "/account",
		path: "/account",
		getParentRoute: () => Route$10
	}),
	AdminRoute: Route$7.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$10
	}),
	AuthRoute: Route$6.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$10
	}),
	DashboardRoute: Route$5.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$10
	}),
	DepositRequestRoute: Route$4.update({
		id: "/deposit-request",
		path: "/deposit-request",
		getParentRoute: () => Route$10
	}),
	NotificationsRoute: Route$3.update({
		id: "/notifications",
		path: "/notifications",
		getParentRoute: () => Route$10
	}),
	PlansRoute: Route$2.update({
		id: "/plans",
		path: "/plans",
		getParentRoute: () => Route$10
	}),
	RequestsRoute: Route$1.update({
		id: "/requests",
		path: "/requests",
		getParentRoute: () => Route$10
	}),
	WithdrawalRequestRoute: Route.update({
		id: "/withdrawal-request",
		path: "/withdrawal-request",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
