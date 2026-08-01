globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/account-Bv0xa6Or.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13fc-yuFOa7xwCMYgaKNFI4nZtjiWk6Q\"",
		"mtime": "2026-08-01T13:51:13.960Z",
		"size": 5116,
		"path": "../public/assets/account-Bv0xa6Or.js"
	},
	"/assets/admin-B8Bcoisf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41b4-eedLkWtQcz7pfj4v9xIHv0820s8\"",
		"mtime": "2026-08-01T13:51:13.960Z",
		"size": 16820,
		"path": "../public/assets/admin-B8Bcoisf.js"
	},
	"/assets/app-shell-Cn8CEGZD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d31-tcdfbRgdJORfZOMks8BpphBrtwo\"",
		"mtime": "2026-08-01T13:51:13.960Z",
		"size": 7473,
		"path": "../public/assets/app-shell-Cn8CEGZD.js"
	},
	"/assets/arrow-right-BydiFrH5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-E/AHO8ouLGJFWwVdfCGYd9sn4Fw\"",
		"mtime": "2026-08-01T13:51:13.961Z",
		"size": 158,
		"path": "../public/assets/arrow-right-BydiFrH5.js"
	},
	"/assets/auth-BI4XnTsB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f7-qSRdfHE79lXBFf5rt75ewTCYVMU\"",
		"mtime": "2026-08-01T13:51:13.962Z",
		"size": 8439,
		"path": "../public/assets/auth-BI4XnTsB.js"
	},
	"/assets/card-BHfy9y5D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b4-9asi4qnbwnBg8tzpWX67Sj6t3a8\"",
		"mtime": "2026-08-01T13:51:13.962Z",
		"size": 692,
		"path": "../public/assets/card-BHfy9y5D.js"
	},
	"/assets/cinematic-DY-2vYzz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f88-fqvwq+3p3nsNxAhlMTlXL5IdnfY\"",
		"mtime": "2026-08-01T13:51:13.963Z",
		"size": 24456,
		"path": "../public/assets/cinematic-DY-2vYzz.js"
	},
	"/assets/check-BOcrxVtb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-tWLgFW13K7giZASqne/GgYvkJQQ\"",
		"mtime": "2026-08-01T13:51:13.963Z",
		"size": 117,
		"path": "../public/assets/check-BOcrxVtb.js"
	},
	"/assets/circle-alert-DvZbJoUO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3-rj3ibR5aKiaR5p26/aDNx9OV+oI\"",
		"mtime": "2026-08-01T13:51:13.964Z",
		"size": 243,
		"path": "../public/assets/circle-alert-DvZbJoUO.js"
	},
	"/assets/circle-check-nlYCV6m0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11b-Kkk06EGLwZoM0FNsrJhRFMeRv8Y\"",
		"mtime": "2026-08-01T13:51:13.964Z",
		"size": 283,
		"path": "../public/assets/circle-check-nlYCV6m0.js"
	},
	"/assets/crown-R9zMy3Xv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-WLui9iYp9WiRJpo/LNs1ZKS//10\"",
		"mtime": "2026-08-01T13:51:13.965Z",
		"size": 355,
		"path": "../public/assets/crown-R9zMy3Xv.js"
	},
	"/assets/dashboard-DLvyT42d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b00d-tmAgkQknEoe+2u4vJlCI4+SFSLs\"",
		"mtime": "2026-08-01T13:51:13.965Z",
		"size": 45069,
		"path": "../public/assets/dashboard-DLvyT42d.js"
	},
	"/assets/deposit-request-Ber8gtQU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"242b-l1LUCgaEjp1pZ04eSBjmijV3QVs\"",
		"mtime": "2026-08-01T13:51:13.966Z",
		"size": 9259,
		"path": "../public/assets/deposit-request-Ber8gtQU.js"
	},
	"/assets/generateCategoricalChart-Btsw9pHy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58cf0-PFy7TRAF18C7LIPMcmfHTb07yEc\"",
		"mtime": "2026-08-01T13:51:13.970Z",
		"size": 363760,
		"path": "../public/assets/generateCategoricalChart-Btsw9pHy.js"
	},
	"/assets/index-RqIONo2b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b251-oCmxX91unP4HW9JLqYBXxJdRk6A\"",
		"mtime": "2026-08-01T13:51:13.959Z",
		"size": 373329,
		"path": "../public/assets/index-RqIONo2b.js"
	},
	"/assets/loader-circle-CBaqo2yI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89-86yCDEI2NJs5jSBN6UJvHLi2REI\"",
		"mtime": "2026-08-01T13:51:13.970Z",
		"size": 137,
		"path": "../public/assets/loader-circle-CBaqo2yI.js"
	},
	"/assets/notifications-Db8Wo1-S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc5-NY6oXttynWTfkvrlmdRLJoxVlhg\"",
		"mtime": "2026-08-01T13:51:13.970Z",
		"size": 3269,
		"path": "../public/assets/notifications-Db8Wo1-S.js"
	},
	"/assets/phone-DRJSFmlg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b-tzFX245kQRi4WQ9m6s/wbp3Zxjk\"",
		"mtime": "2026-08-01T13:51:13.971Z",
		"size": 315,
		"path": "../public/assets/phone-DRJSFmlg.js"
	},
	"/assets/plans-Cu896Gqn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1304-2Li5ob66dgbNBn2AAyzoQ/VpVSE\"",
		"mtime": "2026-08-01T13:51:13.971Z",
		"size": 4868,
		"path": "../public/assets/plans-Cu896Gqn.js"
	},
	"/assets/requests-CGGX1G33.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b66-/geSUOea5Fty+pGDWc4XvB9iLVM\"",
		"mtime": "2026-08-01T13:51:13.972Z",
		"size": 11110,
		"path": "../public/assets/requests-CGGX1G33.js"
	},
	"/assets/routes-ChqsK5lI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b20-wF7nh0xjTwgs7+Hsnn8kgTGtZTA\"",
		"mtime": "2026-08-01T13:51:13.973Z",
		"size": 31520,
		"path": "../public/assets/routes-ChqsK5lI.js"
	},
	"/assets/status-pill-DC2YybuI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-yVxKqjQRN8++j5HveXszfnEOC/Y\"",
		"mtime": "2026-08-01T13:51:13.973Z",
		"size": 422,
		"path": "../public/assets/status-pill-DC2YybuI.js"
	},
	"/assets/styles-Do5gbxNI.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1215a-3aegpVKV3wl8/gcsvRpp6DA5UCk\"",
		"mtime": "2026-08-01T13:51:13.975Z",
		"size": 74074,
		"path": "../public/assets/styles-Do5gbxNI.css"
	},
	"/assets/types-DTEftEpt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcae-ae+eXw+BpVXFtRQffYuHqeDHTo0\"",
		"mtime": "2026-08-01T13:51:13.974Z",
		"size": 56494,
		"path": "../public/assets/types-DTEftEpt.js"
	},
	"/assets/wallet-Co0V0Vrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"191-ueWh9uZqFA0rh/yeFLhd0dse5Y0\"",
		"mtime": "2026-08-01T13:51:13.974Z",
		"size": 401,
		"path": "../public/assets/wallet-Co0V0Vrd.js"
	},
	"/assets/withdrawal-request-DHbFjnpp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28ee-6XPzf/oA3qrxwliwJ0asOXils0Q\"",
		"mtime": "2026-08-01T13:51:13.975Z",
		"size": 10478,
		"path": "../public/assets/withdrawal-request-DHbFjnpp.js"
	},
	"/assets/x-K6D_kPKv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19e-U3qHMyngobF+KbkV5JnjLxA++7U\"",
		"mtime": "2026-08-01T13:51:13.975Z",
		"size": 414,
		"path": "../public/assets/x-K6D_kPKv.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_eRrHbk = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_eRrHbk
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
