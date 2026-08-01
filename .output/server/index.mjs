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
	"/assets/account-CXmzvq2u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d7c-1n4yfHK8OO32C0JvayEkDTyNtZA\"",
		"mtime": "2026-08-01T12:02:48.588Z",
		"size": 7548,
		"path": "../public/assets/account-CXmzvq2u.js"
	},
	"/assets/admin-CRAjlRbD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"418a-D8Ic0wVVvz4NzoMQnsThouyK3xY\"",
		"mtime": "2026-08-01T12:02:48.589Z",
		"size": 16778,
		"path": "../public/assets/admin-CRAjlRbD.js"
	},
	"/assets/app-shell-C0Jgn3xX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b13-1TYJlEvdmCwx+ADHyKi9/IPAIr8\"",
		"mtime": "2026-08-01T12:02:48.589Z",
		"size": 6931,
		"path": "../public/assets/app-shell-C0Jgn3xX.js"
	},
	"/assets/arrow-right-DhGbwqcg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-DJ+Kh/2eX7e7/4RRDUrFarW9mpI\"",
		"mtime": "2026-08-01T12:02:48.589Z",
		"size": 154,
		"path": "../public/assets/arrow-right-DhGbwqcg.js"
	},
	"/assets/auth-B4KWsnMX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2172-pdrZinEE2BTozVqMPVu/I6qKmiM\"",
		"mtime": "2026-08-01T12:02:48.590Z",
		"size": 8562,
		"path": "../public/assets/auth-B4KWsnMX.js"
	},
	"/assets/card-dede-A4r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b0-zIcoyoU6KOfw1oY1zfisFXYM9Yk\"",
		"mtime": "2026-08-01T12:02:48.591Z",
		"size": 688,
		"path": "../public/assets/card-dede-A4r.js"
	},
	"/assets/check-B0RBKew_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-IbuRzdiHCMW0nlPKHVXdUSQSf1M\"",
		"mtime": "2026-08-01T12:02:48.591Z",
		"size": 113,
		"path": "../public/assets/check-B0RBKew_.js"
	},
	"/assets/circle-alert-DDthXrca.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-Gggv+z9CO4QqYU7sLIn3B1Dzgr8\"",
		"mtime": "2026-08-01T12:02:48.591Z",
		"size": 239,
		"path": "../public/assets/circle-alert-DDthXrca.js"
	},
	"/assets/circle-check-BzJQO10p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-n4bwRZ1YXG1KiXEt5U4htHnHQIY\"",
		"mtime": "2026-08-01T12:02:48.591Z",
		"size": 279,
		"path": "../public/assets/circle-check-BzJQO10p.js"
	},
	"/assets/clock-yOJ4RUzB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-XlwJc56jauPzt8Q5TBCDiOFXvvg\"",
		"mtime": "2026-08-01T12:02:48.592Z",
		"size": 158,
		"path": "../public/assets/clock-yOJ4RUzB.js"
	},
	"/assets/dashboard-B5dzqEFU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"afe3-NUrSKnGEJ6sjnWMDuJWafhIzWVQ\"",
		"mtime": "2026-08-01T12:02:48.592Z",
		"size": 45027,
		"path": "../public/assets/dashboard-B5dzqEFU.js"
	},
	"/assets/deposit-request-BCXddVMU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23ff-wNPU8IT8YEhQMLC4l7L1nhyl5Bg\"",
		"mtime": "2026-08-01T12:02:48.592Z",
		"size": 9215,
		"path": "../public/assets/deposit-request-BCXddVMU.js"
	},
	"/assets/loader-circle-qTiWZig3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85-TulIOkP1n8T+NdZOFWMlKtQXsMs\"",
		"mtime": "2026-08-01T12:02:48.593Z",
		"size": 133,
		"path": "../public/assets/loader-circle-qTiWZig3.js"
	},
	"/assets/generateCategoricalChart-DW2jwdwf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58cec-8Whkb9I1hIQeDhnyU1NR12WyOYc\"",
		"mtime": "2026-08-01T12:02:48.593Z",
		"size": 363756,
		"path": "../public/assets/generateCategoricalChart-DW2jwdwf.js"
	},
	"/assets/notifications-gvTShufq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc1-vUo2U8E6+YmT8EeaJyxOu3MVVRk\"",
		"mtime": "2026-08-01T12:02:48.594Z",
		"size": 3265,
		"path": "../public/assets/notifications-gvTShufq.js"
	},
	"/assets/index-kohKfXZJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60cbe-dxXSy1EtqM0TbMstn1DCu20vnkM\"",
		"mtime": "2026-08-01T12:02:48.588Z",
		"size": 396478,
		"path": "../public/assets/index-kohKfXZJ.js"
	},
	"/assets/phone-BMRpewTr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137-mQ2PSLVbaAKpwBCYYaLVodwxCIE\"",
		"mtime": "2026-08-01T12:02:48.594Z",
		"size": 311,
		"path": "../public/assets/phone-BMRpewTr.js"
	},
	"/assets/plans-CemqmUdg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13dd-AwE1y5tsNdulRBmVNNUudvG+yo8\"",
		"mtime": "2026-08-01T12:02:48.594Z",
		"size": 5085,
		"path": "../public/assets/plans-CemqmUdg.js"
	},
	"/assets/requests-ewOKttGV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2af2-JnsUjACZpO2zCI0Rb7YR1ecNDS4\"",
		"mtime": "2026-08-01T12:02:48.596Z",
		"size": 10994,
		"path": "../public/assets/requests-ewOKttGV.js"
	},
	"/assets/routes-CC8uM-pG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7af6-1Zrhkd0uZqZPrTVGOevGVBJAZLU\"",
		"mtime": "2026-08-01T12:02:48.596Z",
		"size": 31478,
		"path": "../public/assets/routes-CC8uM-pG.js"
	},
	"/assets/status-pill-CnR21BF8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-r8RdNZ8zj2wvJzRNeSxm/UQ6Cm8\"",
		"mtime": "2026-08-01T12:02:48.597Z",
		"size": 418,
		"path": "../public/assets/status-pill-CnR21BF8.js"
	},
	"/assets/styles-oQTdfEx9.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"120cd-YOLzhyHEcsSXrv0rh9HlvjRH7Ro\"",
		"mtime": "2026-08-01T12:02:48.599Z",
		"size": 73933,
		"path": "../public/assets/styles-oQTdfEx9.css"
	},
	"/assets/types-DTEftEpt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcae-ae+eXw+BpVXFtRQffYuHqeDHTo0\"",
		"mtime": "2026-08-01T12:02:48.597Z",
		"size": 56494,
		"path": "../public/assets/types-DTEftEpt.js"
	},
	"/assets/wallet-DGrltJj5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-5R2Z3Gz6JgimIZNURvpcGqN3Cek\"",
		"mtime": "2026-08-01T12:02:48.598Z",
		"size": 397,
		"path": "../public/assets/wallet-DGrltJj5.js"
	},
	"/assets/withdrawal-request-IfPEe9Hy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2819-7Gh1s+ONTMQHflOfSCs1xXq6Nhc\"",
		"mtime": "2026-08-01T12:02:48.598Z",
		"size": 10265,
		"path": "../public/assets/withdrawal-request-IfPEe9Hy.js"
	},
	"/assets/x-DrWQ3vWe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a-eYsGDmfwEMjXB7S+Rv/NqjyuINU\"",
		"mtime": "2026-08-01T12:02:48.599Z",
		"size": 410,
		"path": "../public/assets/x-DrWQ3vWe.js"
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
