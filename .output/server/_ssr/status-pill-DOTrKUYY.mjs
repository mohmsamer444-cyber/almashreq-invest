import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as statusLabel } from "./cinematic-CeWt9z_f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-pill-DOTrKUYY.js
var import_jsx_runtime = require_jsx_runtime();
function StatusPill({ status }) {
	const colors = {
		pending: {
			bg: "bg-warning/15",
			text: "text-warning"
		},
		review: {
			bg: "bg-blue-500/15",
			text: "text-blue-400"
		},
		approved: {
			bg: "bg-success/15",
			text: "text-success"
		},
		rejected: {
			bg: "bg-destructive/15",
			text: "text-destructive"
		}
	}[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-3 py-1 text-[11px] ${colors.bg} ${colors.text}`,
		children: statusLabel[status]
	});
}
//#endregion
export { StatusPill as t };
