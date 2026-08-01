import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-D9j1H0wW.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ children, className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-3xl glass p-6 sm:p-7 ${className}`,
		...props,
		children
	});
}
function CardHeader({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `mb-6 ${className}`,
		children
	});
}
function CardTitle({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: `font-display text-xl sm:text-2xl text-ivory ${className}`,
		children
	});
}
function CardDescription({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `mt-2 text-sm text-muted-foreground ${className}`,
		children
	});
}
function CardContent({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `space-y-4 ${className}`,
		children
	});
}
//#endregion
export { CardTitle as a, CardHeader as i, CardContent as n, CardDescription as r, Card as t };
