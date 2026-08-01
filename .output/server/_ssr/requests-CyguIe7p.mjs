import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as ArrowLeft, O as Clock, b as LoaderCircle, k as CircleCheck, w as FileUp } from "../_libs/lucide-react.mjs";
import { c as Reveal, d as fmt, f as fmtDate, h as useDemo, m as statusLabel, o as PAYMENT_METHODS } from "./cinematic-CeWt9z_f.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, t as AppShell } from "./app-shell-Dw57mmAJ.mjs";
import { t as StatusPill } from "./status-pill-DOTrKUYY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as objectType, r as stringType, t as coerce } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/requests-CyguIe7p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	amount: coerce.number().min(500, "أقل مبلغ هو ٥٠٠ ج.م").max(1e6, "أقصى مبلغ هو ١٬٠٠٠٬٠٠٠ ج.م"),
	method: stringType().min(1, "اختر وسيلة الدفع"),
	account: stringType().trim().min(6, "أدخل رقم محفظة أو حساب صحيح").max(60),
	note: stringType().trim().max(200, "الملاحظة طويلة جدًا").optional()
});
var TIMELINE = [
	"pending",
	"review",
	"approved"
];
function Requests() {
	const { requests, submitRequest } = useDemo();
	const [kind, setKind] = (0, import_react.useState)("deposit");
	const [method, setMethod] = (0, import_react.useState)(PAYMENT_METHODS[0].label);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [account, setAccount] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [receipt, setReceipt] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const activeMethod = PAYMENT_METHODS.find((m) => m.label === method);
	const submit = (e) => {
		e.preventDefault();
		const parsed = schema.safeParse({
			amount,
			method,
			account,
			note
		});
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = String(issue.path[0]);
				if (!next[key]) next[key] = issue.message;
			}
			setErrors(next);
			return;
		}
		if (kind === "deposit" && !receipt) {
			setErrors({ receipt: "أرفق صورة الإيصال لإتمام طلب الإيداع" });
			return;
		}
		setErrors({});
		setBusy(true);
		window.setTimeout(() => {
			submitRequest({
				kind,
				method,
				amount: parsed.data.amount,
				account: parsed.data.account,
				...parsed.data.note ? { note: parsed.data.note } : {},
				...receipt ? { receiptName: receipt } : {}
			});
			setBusy(false);
			setAmount("");
			setAccount("");
			setNote("");
			setReceipt("");
			toast.success("تم إرسال الطلب — سيظهر في السجل بحالة قيد الانتظار");
		}, 800);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "الطلبات",
			subtitle: "قدّم طلب إيداع أو سحب تجريبي، وتابع مراحله عبر الخط الزمني وسجل الطلبات."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/deposit-request",
				className: "glass rounded-2xl p-4 sm:p-5 border border-border/50 hover:border-gold/40 transition-all group cursor-pointer flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-ivory group-hover:text-gold transition-colors",
					children: "💳 طلب إيداع جديد"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "أضف أموالاً إلى محفظتك"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5 text-gold opacity-60 group-hover:opacity-100" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/withdrawal-request",
				className: "glass rounded-2xl p-4 sm:p-5 border border-border/50 hover:border-gold/40 transition-all group cursor-pointer flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-ivory group-hover:text-gold transition-colors",
					children: "💰 طلب سحب جديد"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "اسحب أموالك من محفظتك"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5 text-gold opacity-60 group-hover:opacity-100" })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-[1fr_1.15fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "rounded-3xl glass p-7",
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-1 rounded-full border border-border/60 p-1",
						children: ["deposit", "withdraw"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setKind(k),
							className: `rounded-full py-2 text-sm transition-all duration-300 ${kind === k ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory"}`,
							children: k === "deposit" ? "إيداع" : "سحب"
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs font-semibold tracking-widest text-gold",
								children: "اختر وسيلة الدفع"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
								children: PAYMENT_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMethod(m.label),
									className: `shine group relative overflow-hidden rounded-2xl border transition-all duration-300 ${method === m.label ? "border-gold/60 bg-gradient-to-br from-gold/20 to-gold/10" : "border-border/60 bg-background/40 hover:border-gold/40 hover:bg-background/60"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10",
										style: { backgroundImage: "var(--gradient-gold)" }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative px-3 py-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-2xl",
											children: m.icon
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `mt-2 block text-xs font-medium ${method === m.label ? "text-gold" : "text-muted-foreground"}`,
											children: m.label
										})]
									})]
								}, m.id))
							}),
							activeMethod && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: [
									"💡 ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold",
										children: "المثال:"
									}),
									" ",
									activeMethod.hint
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "المبلغ (جنيه مصري)",
								value: amount,
								onChange: setAmount,
								error: errors["amount"],
								placeholder: kind === "deposit" ? "المبلغ المراد إيداعه" : "المبلغ المراد سحبه",
								inputMode: "numeric"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: kind === "deposit" ? "رقم المحفظة/الحساب المُحوَّل منه" : "رقم المحفظة/الحساب المُحوَّل إليه",
								value: account,
								onChange: setAccount,
								error: errors["account"],
								placeholder: activeMethod?.hint ?? "أدخل رقم المحفظة أو الحساب"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-3 block text-xs font-semibold tracking-widest text-gold",
										children: "ملاحظة — اختيارية"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: note,
										onChange: (e) => setNote(e.target.value),
										rows: 3,
										className: "w-full resize-none rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold/60",
										placeholder: "أضف أي تفاصيل إضافية تتعلق بالطلب (اختياري)"
									}),
									errors["note"] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1.5 block text-xs text-destructive",
										children: ["⚠ ", errors["note"]]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mb-3 block text-xs font-semibold tracking-widest text-gold",
									children: ["إيصال التحويل ", kind === "deposit" ? "— مطلوب" : "— اختياري"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => fileRef.current?.click(),
									className: `shine group relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${errors["receipt"] ? "border-destructive/70 bg-destructive/5" : receipt ? "border-success/70 bg-success/5" : "border-border/70 bg-background/40 hover:border-gold/50 hover:bg-gold/5"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex flex-col items-center gap-3 px-4 py-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-3xl transition-transform duration-300 group-hover:scale-110 ${errors["receipt"] ? "text-destructive" : receipt ? "text-success" : "text-gold"}`,
											children: receipt ? "✓" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "h-6 w-6" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 text-start",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `text-xs font-semibold ${errors["receipt"] ? "text-destructive" : receipt ? "text-success" : "text-ivory"}`,
												children: receipt ? `تم التحميل: ${receipt}` : "اضغط أو اسحب صورة الإيصال"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "PNG / JPG / WebP — بحد أقصى 5 MB"
											})]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "image/*",
									className: "hidden",
									onChange: (e) => {
										const f = e.target.files?.[0];
										if (f) {
											setReceipt(f.name);
											setErrors((x) => ({
												...x,
												receipt: ""
											}));
										}
									}
								}),
								errors["receipt"] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-2 block text-xs text-destructive",
									children: ["⚠ ", errors["receipt"]]
								})
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: busy,
						className: "shine mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.01] disabled:opacity-70",
						style: {
							backgroundImage: "var(--gradient-gold)",
							boxShadow: "var(--shadow-gold)"
						},
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "إرسال الطلب"]
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 90,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl glass p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-ivory",
							children: "مراحل الطلب"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-6 space-y-6",
							children: TIMELINE.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[auto_minmax(0,1fr)] gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/12 text-gold",
									children: [i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }) : i === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), i < TIMELINE.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-9 h-6 w-px bg-border" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm text-ivory",
										children: statusLabel[s]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs leading-6 text-muted-foreground",
										children: i === 0 ? "تم استلام الطلب وإضافته إلى قائمة المعالجة." : i === 1 ? "يقوم فريق العمليات بمطابقة الإيصال والبيانات." : "اعتماد الطلب وتحديث رصيد المحفظة."
									})]
								})]
							}, s))
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 150,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl glass p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-ivory",
							children: "سجل الطلبات"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-2",
							children: requests.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border/50 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate text-sm text-ivory",
										children: [
											r.kind === "deposit" ? "إيداع" : "سحب",
											" · ",
											r.method,
											" · ",
											fmt(r.amount),
											" ج.م"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate text-xs text-muted-foreground",
										children: [
											r.userName,
											" — ",
											fmtDate(r.createdAt),
											r.receiptName ? ` · ${r.receiptName}` : ""
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: r.status })]
							}, r.id))
						})]
					})
				})]
			})]
		})
	] });
}
function Input({ label, value, onChange, error, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-3 block text-xs font-semibold tracking-widest text-gold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				...rest,
				value,
				onChange: (e) => onChange(e.target.value),
				className: `w-full rounded-2xl border bg-background/40 px-4 py-3.5 text-sm text-ivory outline-none transition-all duration-300 focus:scale-105 focus:border-gold/60 ${error ? "border-destructive/70 focus:border-destructive/70" : "border-border/70 focus:border-gold/60"}`
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1.5 block text-xs text-destructive",
				children: ["⚠ ", error]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Requests, {}) });
//#endregion
export { SplitComponent as component };
