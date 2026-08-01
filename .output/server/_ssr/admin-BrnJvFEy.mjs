import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { H as Activity, N as Check, d as ShieldCheck, n as Wallet, p as Search, r as Users, t as X } from "../_libs/lucide-react.mjs";
import { c as Reveal, d as fmt, f as fmtDate, h as useDemo, m as statusLabel, n as Counter, s as PLANS } from "./cinematic-CeWt9z_f.mjs";
import { n as PageHeader, t as AppShell } from "./app-shell-Dw57mmAJ.mjs";
import { t as StatusPill } from "./status-pill-DOTrKUYY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, r as BarChart, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BrnJvFEy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"overview",
	"users",
	"requests",
	"logs"
];
var TAB_LABEL = {
	overview: "نظرة عامة",
	users: "المستخدمون",
	requests: "الطلبات",
	logs: "سجل النشاط"
};
var monthly = [
	{
		m: "فبراير",
		d: 320,
		w: 120
	},
	{
		m: "مارس",
		d: 410,
		w: 160
	},
	{
		m: "أبريل",
		d: 385,
		w: 210
	},
	{
		m: "مايو",
		d: 520,
		w: 190
	},
	{
		m: "يونيو",
		d: 610,
		w: 240
	},
	{
		m: "يوليو",
		d: 740,
		w: 275
	}
];
function Admin() {
	const { users, requests, logs, setRequestStatus, toggleUserStatus, notifications } = useDemo();
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filteredUsers = (0, import_react.useMemo)(() => users.filter((u) => (u.fullName + u.phone).includes(q.trim())), [users, q]);
	const filteredRequests = (0, import_react.useMemo)(() => requests.filter((r) => (filter === "all" || r.status === filter) && (r.userName + r.method).includes(q.trim())), [
		requests,
		filter,
		q
	]);
	const totalAssets = users.reduce((a, u) => a + u.balance, 0);
	const pending = requests.filter((r) => r.status === "pending" || r.status === "review").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "لوحة الإدارة",
			subtitle: "إدارة كاملة للمستخدمين والطلبات مع تقارير وسجل نشاط لحظي."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				{
					icon: Users,
					label: "المستخدمون",
					value: users.length,
					suffix: ""
				},
				{
					icon: Wallet,
					label: "إجمالي الأصول (ج.م)",
					value: totalAssets,
					suffix: ""
				},
				{
					icon: Activity,
					label: "طلبات معلّقة",
					value: pending,
					suffix: ""
				},
				{
					icon: ShieldCheck,
					label: "الباقات النشطة",
					value: PLANS.length,
					suffix: ""
				}
			].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 70,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lift grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-3xl glass p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/12 text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-2xl text-ivory",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, { to: s.value })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-xs text-muted-foreground",
							children: s.label
						})]
					})]
				})
			}, s.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-3 rounded-full border border-border/70 bg-background/40 px-4 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "ابحث بالاسم أو الرقم أو الوسيلة…",
					className: "min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/60"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1 rounded-full border border-border/60 p-1",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(t),
					className: `rounded-full px-4 py-2 text-xs transition-all duration-300 ${tab === t ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory"}`,
					children: TAB_LABEL[t]
				}, t))
			})]
		}),
		tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl glass p-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg text-ivory",
					children: "الإيداعات مقابل السحوبات (بالألف)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: monthly,
							margin: {
								top: 6,
								right: 6,
								left: -18,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "m",
									tick: {
										fill: "var(--muted-foreground)",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "var(--muted-foreground)",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: {
										fill: "var(--accent)",
										opacity: .25
									},
									contentStyle: {
										background: "var(--popover)",
										border: "1px solid var(--border)",
										borderRadius: 12,
										color: "var(--foreground)"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "d",
									name: "إيداع",
									fill: "var(--chart-1)",
									radius: [
										6,
										6,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "w",
									name: "سحب",
									fill: "var(--chart-2)",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						})
					})
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 100,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-full rounded-3xl glass p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-ivory",
						children: "إشعارات النظام"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 space-y-3",
						children: notifications.slice(0, 5).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-border/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ivory",
								children: n.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-6 text-muted-foreground",
								children: n.body
							})]
						}, n.id))
					})]
				})
			})]
		}),
		tab === "users" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 rounded-3xl glass p-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-lg text-ivory",
				children: [
					"المستخدمون (",
					filteredUsers.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-start text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "text-xs text-muted-foreground",
						children: [
							"الاسم",
							"الهاتف",
							"الباقة",
							"الرصيد",
							"الحالة",
							"إجراء"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 text-start font-normal",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-ivory",
								children: u.fullName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-muted-foreground",
								children: u.phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-muted-foreground",
								children: PLANS.find((p) => p.id === u.planId)?.name ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-gold",
								children: fmt(u.balance)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-3 py-1 text-[11px] ${u.status === "active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`,
									children: u.status === "active" ? "نشط" : "موقوف"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										toggleUserStatus(u.id);
										toast.success("تم تحديث حالة المستخدم");
									},
									className: "rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold",
									children: u.status === "active" ? "إيقاف" : "تفعيل"
								})
							})
						]
					}, u.id)) })]
				}), filteredUsers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "لا توجد نتائج مطابقة."
				})]
			})]
		}) }),
		tab === "requests" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 rounded-3xl glass p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "min-w-0 font-display text-lg text-ivory",
						children: [
							"الطلبات (",
							filteredRequests.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: [
							"all",
							"pending",
							"review",
							"approved",
							"rejected"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(f),
							className: `rounded-full px-3 py-1.5 text-[11px] transition-colors ${filter === f ? "bg-gold/15 text-gold" : "border border-border/60 text-muted-foreground hover:text-ivory"}`,
							children: f === "all" ? "الكل" : statusLabel[f]
						}, f))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-2",
					children: filteredRequests.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-3 rounded-2xl border border-border/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm text-ivory",
								children: [
									r.userName,
									" · ",
									r.kind === "deposit" ? "إيداع" : "سحب",
									" · ",
									fmt(r.amount),
									" ج.م"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									r.method,
									" — ",
									r.account,
									" — ",
									fmtDate(r.createdAt)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: r.status }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setRequestStatus(r.id, "approved");
										toast.success("تم اعتماد الطلب");
									},
									className: "grid h-8 w-8 place-items-center rounded-full border border-success/40 text-success transition-colors hover:bg-success/10",
									"aria-label": "اعتماد",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setRequestStatus(r.id, "rejected");
										toast("تم رفض الطلب");
									},
									className: "grid h-8 w-8 place-items-center rounded-full border border-destructive/40 text-destructive transition-colors hover:bg-destructive/10",
									"aria-label": "رفض",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})
							]
						})]
					}, r.id))
				}),
				filteredRequests.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "لا توجد طلبات مطابقة."
				})
			]
		}) }),
		tab === "logs" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 rounded-3xl glass p-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg text-ivory",
				children: "سجل النشاط"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 space-y-5",
				children: logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_minmax(0,1fr)] gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-ivory",
							children: l.action
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs text-muted-foreground",
							children: [
								l.actor,
								" — ",
								fmtDate(l.at)
							]
						})]
					})]
				}, l.id))
			})]
		}) })
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Admin, {}) });
//#endregion
export { SplitComponent as component };
