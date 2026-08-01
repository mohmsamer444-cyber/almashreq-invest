import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as LogOut, i as User, n as Wallet, p as Phone, s as TrendingUp, w as Crown } from "../_libs/lucide-react.mjs";
import { d as fmt, f as fmtDate, h as useDemo, s as PLANS } from "./cinematic-CKTwKQYq.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, t as AppShell } from "./app-shell-D8hIeRxF.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D9j1H0wW.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DjKK8BFV.js
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { user, logout, requests } = useDemo();
	const navigate = useNavigate();
	if (!user) return null;
	const plan = PLANS.find((p) => p.id === user.planId);
	const myRequests = requests.filter((r) => r.userId === user.id);
	const stats = [
		{
			label: "الرصيد الحالي",
			value: fmt(user.balance),
			unit: "ج.م",
			icon: Wallet,
			color: "text-gold"
		},
		{
			label: "إجمالي الأرباح",
			value: fmt(user.profit),
			unit: "ج.م",
			icon: TrendingUp,
			color: "text-success"
		},
		{
			label: "عدد الطلبات",
			value: fmt(myRequests.length),
			unit: "طلب",
			icon: Phone,
			color: "text-accent"
		}
	];
	const handleLogout = () => {
		logout();
		toast.success("تم تسجيل الخروج بنجاح");
		navigate({ to: "/auth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "حسابي",
			subtitle: "إدارة معلومات الحساب والإعدادات الشخصية"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass rounded-2xl p-6 sm:p-8 mb-6 border border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-6 items-start sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-20 h-20 rounded-2xl glass border border-gold/20 flex items-center justify-center flex-shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-10 w-10 text-gold" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl sm:text-3xl font-display text-ivory mb-1",
							children: user.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground mb-3",
							children: ["عضو منذ ", fmtDate(user.joinedAt)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium",
								children: "✓ موثق"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-3.5 w-3.5" }), plan?.name ?? "بدون باقة"]
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8",
			children: stats.map((stat) => {
				const Icon = stat.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-2xl p-4 sm:p-6 border border-border/50 hover:border-gold/40 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: stat.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl sm:text-3xl font-display text-ivory mt-2",
								children: stat.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-xs mt-1",
								children: stat.unit
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-8 w-8 ${stat.color} opacity-60` })]
					})
				}, stat.label);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "glass border-border/50 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-xl",
				children: "معلومات الحساب"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "بيانات حسابك الشخصية" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium text-muted-foreground mb-2",
						children: "الاسم بالكامل"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.fullName })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium text-muted-foreground mb-2",
						children: "رقم الهاتف"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							dir: "ltr",
							children: user.phone
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium text-muted-foreground mb-2",
						children: "الباقة النشطة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-4 w-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: plan?.name ?? "بدون باقة" })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium text-muted-foreground mb-2",
						children: "الحالة"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${user.status === "active" ? "bg-success" : "bg-destructive"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.status === "active" ? "نشط" : "موقوف" })]
					})] })
				]
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-4 flex-col sm:flex-row",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleLogout,
				className: "flex-1 px-6 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors font-medium flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" }), "تسجيل الخروج"]
			})
		})
	] });
}
//#endregion
export { AccountPage as component };
