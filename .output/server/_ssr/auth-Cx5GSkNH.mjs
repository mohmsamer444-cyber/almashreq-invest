import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { E as EyeOff, T as Eye, a as UserRound, b as LoaderCircle, m as Phone, y as LockKeyhole } from "../_libs/lucide-react.mjs";
import { a as Logo, h as useDemo } from "./cinematic-CeWt9z_f.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Cx5GSkNH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var phoneRe = /^01[0-9]{9}$/;
var registerSchema = objectType({
	fullName: stringType().trim().min(3, "الاسم قصير جدًا (3 أحرف على الأقل)").max(60, "الاسم طويل جدًا"),
	phone: stringType().trim().regex(phoneRe, "رقم هاتف مصري غير صحيح (مثال: 01001234567)"),
	password: stringType().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").max(64, "كلمة المرور طويلة جدًا"),
	confirm: stringType()
}).refine((v) => v.password === v.confirm, {
	path: ["confirm"],
	message: "كلمات المرور غير متطابقة"
});
var loginSchema = objectType({
	phone: stringType().trim().regex(phoneRe, "رقم هاتف غير صحيح"),
	password: stringType().min(1, "أدخل كلمة المرور")
});
function AuthPage() {
	const { register, login } = useDemo();
	const navigate = useNavigate();
	const [successAnimation, setSuccessAnimation] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("register");
	const [values, setValues] = (0, import_react.useState)({
		fullName: "",
		phone: "",
		password: "",
		confirm: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [show, setShow] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const set = (k) => (e) => {
		setValues((v) => ({
			...v,
			[k]: e.target.value
		}));
		setErrors((x) => ({
			...x,
			[k]: void 0
		}));
	};
	const submit = (e) => {
		e.preventDefault();
		const parsed = mode === "register" ? registerSchema.safeParse(values) : loginSchema.safeParse(values);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path[0];
				if (key && !next[key]) next[key] = issue.message;
			}
			setErrors(next);
			return;
		}
		setBusy(true);
		window.setTimeout(() => {
			if (mode === "register") {
				register({
					fullName: values.fullName.trim(),
					phone: values.phone.trim(),
					password: values.password
				});
				toast.success("تم إنشاء حسابك التجريبي بنجاح");
			} else {
				const u = login({
					phone: values.phone.trim(),
					password: values.password
				});
				if (!u) {
					setBusy(false);
					setErrors({ phone: "لا يوجد حساب تجريبي بهذا الرقم — أنشئ حسابًا جديدًا" });
					return;
				}
				toast.success(`أهلًا بعودتك، ${u.fullName}`);
			}
			navigate({ to: "/dashboard" });
		}, 850);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative grid min-h-screen grain lg:grid-cols-[1.1fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden overflow-hidden border-e border-border/50 lg:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 geo-texture opacity-60" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15 animate-ring-spin" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 animate-ring-spin [animation-direction:reverse]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-full flex-col justify-between p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 48 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-lg animate-fade-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm tracking-[0.35em] text-gold",
									children: "AL-MASHREQ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-5 font-display text-5xl leading-[1.25] text-ivory",
									children: [
										"حيث تلتقي ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gold-gradient",
											children: "الأصالة"
										}),
										" بإدارة الثروات الحديثة"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-base leading-8 text-muted-foreground",
									children: "بيئة عرض متكاملة تحاكي منصة استثمار حقيقية: محافظ، باقات، طلبات، وتقارير لحظية — كل ذلك ببيانات تجريبية آمنة تمامًا."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-4",
							children: [
								["١٢٨ ألف", "مستخدم تجريبي"],
								["٩٩.٩٪", "زمن التشغيل"],
								["٧", "باقات استثمارية"]
							].map(([a, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl glass-soft p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl text-gold",
									children: a
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: b
								})]
							}, b))
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center px-5 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md animate-reveal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex items-center justify-between gap-4 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 40 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl glass p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6 grid grid-cols-2 gap-1 rounded-full border border-border/60 p-1",
							children: ["register", "login"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode(m);
									setErrors({});
								},
								className: `rounded-full py-2 text-sm transition-all duration-300 ${mode === m ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-ivory"}`,
								children: m === "register" ? "حساب جديد" : "تسجيل الدخول"
							}, m))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl text-ivory",
							children: mode === "register" ? "أنشئ حسابك التجريبي" : "مرحبًا بعودتك"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: mode === "register" ? "لن تُرسل أي بيانات إلى خوادم — كل شيء يعمل محليًا للعرض." : "استخدم رقم الهاتف الذي سجّلت به سابقًا."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "mt-7 space-y-4",
							noValidate: true,
							children: [
								mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-4 w-4" }),
									label: "الاسم بالكامل",
									value: values.fullName,
									onChange: set("fullName"),
									error: errors.fullName,
									placeholder: "مثال: أحمد محمود",
									autoComplete: "name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
									label: "رقم الهاتف",
									value: values.phone,
									onChange: set("phone"),
									error: errors.phone,
									placeholder: "01xxxxxxxxx",
									inputMode: "numeric",
									autoComplete: "tel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-4 w-4" }),
									label: "كلمة المرور",
									value: values.password,
									onChange: set("password"),
									error: errors.password,
									placeholder: "********",
									type: show ? "text" : "password",
									autoComplete: mode === "register" ? "new-password" : "current-password",
									trailing: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "إظهار كلمة المرور",
										onClick: () => setShow((v) => !v),
										className: "text-muted-foreground transition-colors hover:text-gold",
										children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
									})
								}),
								mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-4 w-4" }),
									label: "تأكيد كلمة المرور",
									value: values.confirm,
									onChange: set("confirm"),
									error: errors.confirm,
									placeholder: "********",
									type: show ? "text" : "password",
									autoComplete: "new-password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: busy,
									className: "shine mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.01] disabled:opacity-70",
									style: {
										backgroundImage: "var(--gradient-gold)",
										boxShadow: "var(--shadow-gold)"
									},
									children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), mode === "register" ? "إنشاء الحساب والدخول" : "دخول"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-center text-xs leading-6 text-muted-foreground",
							children: [
								"بالمتابعة أنت توافق على أن هذه بيئة تجريبية لأغراض العرض فقط.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "text-gold underline-offset-4 hover:underline",
									children: "تصفّح الصفحة التعريفية"
								})
							]
						})
					]
				})]
			})
		})]
	});
}
function Field({ icon, label, error, trailing, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-2 block text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `flex items-center gap-3 rounded-2xl border bg-background/40 px-4 py-3 transition-colors focus-within:border-gold/60 ${error ? "border-destructive/70" : "border-border/70"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-gold/80",
						children: icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						...props,
						className: "min-w-0 flex-1 bg-transparent text-sm text-ivory outline-none placeholder:text-muted-foreground/60"
					}),
					trailing
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1.5 block text-xs text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { AuthPage as component };
