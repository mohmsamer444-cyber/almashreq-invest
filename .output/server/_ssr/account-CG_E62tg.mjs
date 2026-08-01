import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Mail, f as Settings, g as MapPin, i as User, m as Phone, n as Wallet, s as TrendingUp, v as LogOut } from "../_libs/lucide-react.mjs";
import { h as useDemo } from "./cinematic-CeWt9z_f.mjs";
import { n as PageHeader, t as AppShell } from "./app-shell-Dw57mmAJ.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D9j1H0wW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-CG_E62tg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { user, logout } = useDemo();
	const [editMode, setEditMode] = (0, import_react.useState)(false);
	if (!user) return null;
	const stats = [
		{
			label: "الرصيد الحالي",
			value: user.balance.toLocaleString("ar-EG"),
			unit: "ريال",
			icon: Wallet,
			color: "text-gold"
		},
		{
			label: "إجمالي الأرباح",
			value: user.totalProfit.toLocaleString("ar-EG"),
			unit: "ريال",
			icon: TrendingUp,
			color: "text-success"
		},
		{
			label: "عدد الطلبات",
			value: "12",
			unit: "طلب",
			icon: Phone,
			color: "text-accent"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "حسابي",
			subtitle: "إدارة معلومات الحساب والإعدادات الشخصية"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass rounded-2xl p-6 sm:p-8 mb-6 border border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-6 items-start sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 rounded-2xl glass border border-gold/20 flex items-center justify-center flex-shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-10 w-10 text-gold" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl font-display text-ivory mb-1",
								children: user.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground mb-3",
								children: "عضو منذ ديسمبر 2024"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium",
									children: "✓ موثق"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium",
									children: "الباقة الذهبية"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setEditMode(!editMode),
						className: "px-4 py-2 rounded-lg bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20 transition-colors font-medium text-sm",
						children: editMode ? "إلغاء" : "تعديل"
					})
				]
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.name })]
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
						children: "البريد الإلكتروني"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							dir: "ltr",
							children: user.email || "لم يتم إدخاله"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium text-muted-foreground mb-2",
						children: "الموقع"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg px-4 py-3 border border-border/50 text-ivory flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مصر" })]
					})] })
				]
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "glass border-border/50 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-xl",
				children: "الإعدادات"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "إدارة تفضيلاتك والأمان" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "تغيير كلمة المرور"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "→"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "تحديث البريد الإلكتروني"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "→"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 rounded-lg hover:bg-gold/5 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "تحديث رقم الهاتف"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "→"
						})]
					})
				]
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-4 flex-col sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => logout(),
				className: "flex-1 px-6 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors font-medium flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" }), "تسجيل الخروج"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "flex-1 px-6 py-3 rounded-lg bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-colors font-medium",
				children: "حفظ التغييرات"
			})]
		})
	] });
}
//#endregion
export { AccountPage as component };
