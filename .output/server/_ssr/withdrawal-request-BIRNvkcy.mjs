import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as ArrowRight, k as Check } from "../_libs/lucide-react.mjs";
import { d as fmt, f as fmtDate, h as useDemo, o as PAYMENT_METHODS } from "./cinematic-CKTwKQYq.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, t as AppShell } from "./app-shell-D8hIeRxF.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-D9j1H0wW.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/withdrawal-request-BIRNvkcy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FormField({ label, error, icon, trailing, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `block ${className}`,
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-3 block text-xs font-semibold tracking-widest text-gold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-3 rounded-2xl border bg-background/40 px-4 py-3.5 transition-all focus-within:border-gold/60 ${error ? "border-destructive/70" : "border-border/70"}`,
				children: [
					icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-gold/80",
						children: icon
					}),
					children,
					trailing
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1.5 block text-xs text-destructive",
				children: ["⚠ ", error]
			})
		]
	});
}
function Input({ label, error, icon, trailing, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		label,
		error,
		icon,
		trailing,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			...props,
			className: "min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/60"
		})
	});
}
function TextArea({ label, error, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-3 block text-xs font-semibold tracking-widest text-gold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				...props,
				className: `w-full resize-none rounded-2xl border bg-background/40 px-4 py-3.5 text-sm text-ivory outline-none transition-all focus:border-gold/60 ${error ? "border-destructive/70" : "border-border/70"}`
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1.5 block text-xs text-destructive",
				children: ["⚠ ", error]
			})
		]
	});
}
function Button({ children, variant = "primary", size = "md", loading = false, icon, ...props }) {
	const baseStyles = "shine inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300";
	const variants = {
		primary: "bg-gradient-gold text-primary-foreground hover:scale-105 shadow-gold",
		secondary: "border border-gold/40 text-gold hover:bg-gold/10",
		ghost: "text-muted-foreground hover:text-gold hover:bg-accent/40"
	};
	const sizes = {
		sm: "px-4 py-2.5 text-xs",
		md: "px-6 py-3 text-sm",
		lg: "px-8 py-3.5 text-base"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		...props,
		className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} ${props.className || ""}`,
		children: [
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "animate-spin",
				children: "⚙️"
			}),
			icon,
			children
		]
	});
}
function WithdrawalRequestPage() {
	const navigate = useNavigate();
	const { user, submitRequest, requests } = useDemo();
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		fullName: user?.fullName || "",
		phone: user?.phone || "",
		amount: "",
		withdrawalMethod: "فودافون كاش",
		destinationAccount: "",
		notes: ""
	});
	const myWithdrawals = requests.filter((r) => r.kind === "withdraw" && r.userId === user?.id).slice(0, 4);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.fullName.trim()) {
			toast.error("الرجاء إدخال الاسم بالكامل");
			return;
		}
		if (!formData.phone.trim()) {
			toast.error("الرجاء إدخال رقم الهاتف");
			return;
		}
		if (!formData.amount) {
			toast.error("الرجاء إدخال المبلغ المطلوب");
			return;
		}
		if (!formData.destinationAccount.trim()) {
			toast.error("الرجاء إدخال رقم الحساب المستلم");
			return;
		}
		const amountNum = parseFloat(formData.amount);
		if (isNaN(amountNum) || amountNum < 50) {
			toast.error("الحد الأدنى للسحب هو 50 ج.م");
			return;
		}
		if (user && amountNum > user.balance) {
			toast.error("الرصيد غير كافٍ لهذا السحب");
			return;
		}
		setLoading(true);
		setTimeout(() => {
			submitRequest({
				kind: "withdraw",
				method: formData.withdrawalMethod,
				amount: amountNum,
				account: formData.destinationAccount,
				status: "pending",
				...formData.notes.trim() ? { note: formData.notes.trim() } : {}
			});
			setLoading(false);
			setSuccess(true);
			toast.success("تم إرسال طلب السحب بنجاح");
		}, 800);
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[60vh] flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass rounded-3xl p-8 sm:p-12 border border-gold/20 text-center max-w-md animate-reveal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-20 h-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-success/20 animate-pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-2 rounded-full bg-success/30 animate-pulse animation-delay-100" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 rounded-full flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-10 h-10 text-success animate-bounce" })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl sm:text-4xl font-display text-ivory mb-3",
					children: "تم بنجاح!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-6 text-lg",
					children: "تم استقبال طلب السحب الخاص بك. سيتم المراجعة خلال ساعات قليلة."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 glass rounded-xl p-4 border border-success/20 text-sm text-muted-foreground text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 font-medium text-ivory",
						children: "رقم الطلب: #54322"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ستتلقى الأموال في غضون 24 ساعة عمل" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/requests" }),
					className: "w-full px-6 py-3 rounded-xl bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 transition-all font-medium flex items-center justify-center gap-2",
					children: ["العودة للطلبات", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
				})
			]
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "طلب سحب",
		subtitle: "اسحب أموالك من محفظتك بسهولة وأمان"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass border-border/50 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-xl",
					children: "معلومات السحب"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "الاسم بالكامل",
							icon: "👤",
							error: !formData.fullName ? "الاسم مطلوب" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								placeholder: "أدخل اسمك الكامل",
								value: formData.fullName,
								onChange: (e) => setFormData({
									...formData,
									fullName: e.target.value
								}),
								disabled: !!user?.fullName
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "رقم الهاتف",
							icon: "📱",
							error: !formData.phone ? "رقم الهاتف مطلوب" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "tel",
								placeholder: "مثال: 01012345678",
								value: formData.phone,
								onChange: (e) => setFormData({
									...formData,
									phone: e.target.value
								}),
								disabled: !!user?.phone,
								dir: "ltr"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormField, {
							label: "المبلغ المطلوب",
							icon: "💰",
							error: !formData.amount ? "المبلغ مطلوب" : "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									placeholder: "الحد الأدنى: 50 ج.م",
									value: formData.amount,
									onChange: (e) => setFormData({
										...formData,
										amount: e.target.value
									}),
									min: "50",
									step: "10",
									dir: "ltr"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm",
									children: "ج.م"
								})]
							}), user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-2",
								children: [
									"الرصيد المتاح: ",
									fmt(user.balance),
									" ج.م"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "طريقة الاستلام",
							icon: "🏦",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
								children: PAYMENT_METHODS.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setFormData({
										...formData,
										withdrawalMethod: method.label
									}),
									className: `p-3 rounded-lg border transition-all text-sm font-medium ${formData.withdrawalMethod === method.label ? "bg-gold/20 border-gold/40 text-gold" : "border-border/50 text-muted-foreground hover:border-gold/30 hover:bg-gold/5"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xl mb-1",
										children: method.icon
									}), method.label]
								}, method.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "رقم الحساب المستلم",
							icon: "💳",
							error: !formData.destinationAccount ? "رقم الحساب مطلوب" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								placeholder: "أدخل رقم المحفظة أو الحساب البنكي",
								value: formData.destinationAccount,
								onChange: (e) => setFormData({
									...formData,
									destinationAccount: e.target.value
								}),
								dir: "ltr"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							label: "ملاحظات (اختيارية)",
							icon: "📝",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
								placeholder: "أضف أي ملاحظات إضافية...",
								rows: 4,
								value: formData.notes,
								onChange: (e) => setFormData({
									...formData,
									notes: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "flex-1 bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 mr-2" }), "طلب السحب"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => navigate({ to: "/requests" }),
								className: "px-6 py-3 rounded-lg border border-border/50 text-muted-foreground hover:bg-gold/5 transition-colors font-medium",
								children: "إلغاء"
							})]
						})
					]
				}) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass border-border/50 mb-8 sticky top-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "معلومات السحب"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-lg bg-gold/5 border border-gold/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-gold mb-2",
								children: "الحد الأدنى:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-xs",
								children: "50 ج.م"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-lg bg-accent/5 border border-accent/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-accent mb-2",
								children: "وقت المعالجة:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-xs",
								children: "تتم معالجة الطلبات خلال 24 ساعة عمل"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-lg bg-success/5 border border-success/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-success mb-2",
								children: "الرسوم:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-xs",
								children: "بدون رسوم إضافية"
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "glass border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "السحبيات الأخيرة"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [myWithdrawals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground text-center py-4",
						children: "لا توجد سحبيات سابقة بعد"
					}), myWithdrawals.map((withdrawal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium text-ivory",
							children: [fmt(withdrawal.amount), " ج.م"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: withdrawal.method
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: fmtDate(withdrawal.createdAt)
							})
						})]
					}, withdrawal.id))]
				}) })]
			})]
		})]
	})] });
}
//#endregion
export { WithdrawalRequestPage as component };
