import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { I as Bell, N as Check, j as CircleAlert, s as TrendingUp, x as Info } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as AppShell } from "./app-shell-Dw57mmAJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-DQC8zieP.js
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "الإشعارات",
			subtitle: "تابع جميع تحديثاتك وعملياتك الأخيرة"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:gap-4",
			children: [
				{
					id: 1,
					type: "success",
					title: "تم تأكيد الإيداع",
					description: "تم إيداع 500 ريال في محفظتك بنجاح",
					time: "منذ 2 ساعة",
					icon: Check,
					color: "bg-success/10 border-success/20",
					iconColor: "text-success"
				},
				{
					id: 2,
					type: "alert",
					title: "جديد: عرض خاص",
					description: "احصل على 50% إضافي على كل عملية إيداع",
					time: "منذ 4 ساعات",
					icon: TrendingUp,
					color: "bg-gold/10 border-gold/20",
					iconColor: "text-gold"
				},
				{
					id: 3,
					type: "info",
					title: "تحديث الأمان",
					description: "يُرجى تحديث كلمة المرور الخاصة بك",
					time: "منذ يوم",
					icon: Info,
					color: "bg-accent/10 border-accent/20",
					iconColor: "text-accent"
				},
				{
					id: 4,
					type: "warning",
					title: "انتهاء الباقة",
					description: "سينتهي اشتراكك في الباقة الذهبية خلال 3 أيام",
					time: "منذ يومين",
					icon: CircleAlert,
					color: "bg-warning/10 border-warning/20",
					iconColor: "text-warning"
				},
				{
					id: 5,
					type: "success",
					title: "سحب موافق عليه",
					description: "تمت الموافقة على طلب السحب برقم #54321",
					time: "منذ 3 أيام",
					icon: Check,
					color: "bg-success/10 border-success/20",
					iconColor: "text-success"
				},
				{
					id: 6,
					type: "info",
					title: "جديد: ميزة الإحالة",
					description: "قم بدعوة الأصدقاء واحصل على عمولة على أرباحهم",
					time: "منذ أسبوع",
					icon: Bell,
					color: "bg-accent/10 border-accent/20",
					iconColor: "text-accent"
				}
			].map((notification) => {
				const Icon = notification.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `glass rounded-2xl p-4 sm:p-5 border transition-all duration-300 hover:border-gold/40 ${notification.color} group cursor-pointer`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-1 rounded-lg p-2.5 ${notification.color} ${notification.iconColor}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-ivory text-sm sm:text-base group-hover:text-gold transition-colors",
										children: notification.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-2",
										children: notification.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground/60 text-xs mt-2",
										children: notification.time
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-shrink-0 h-2 w-2 rounded-full bg-gold/60 mt-2 group-hover:scale-150 transition-transform" })
						]
					})
				}, notification.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 text-center py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-16 h-16 rounded-full glass flex items-center justify-center mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-8 w-8 text-muted-foreground" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "ستظهر الإشعارات الجديدة هنا"
			})]
		})
	] });
}
//#endregion
export { NotificationsPage as component };
