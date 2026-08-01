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
	"/assets/account-B6LEQ8MF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13da-vCd8BboUdewmqUUesIxn4EI1E2I\"",
		"mtime": "2026-08-01T14:18:59.315Z",
		"size": 5082,
		"path": "../public/assets/account-B6LEQ8MF.js"
	},
	"/assets/admin-Cp3tLkDd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41be-2FktIv6GlxJqphIhdO+KQmrk1tU\"",
		"mtime": "2026-08-01T14:18:59.315Z",
		"size": 16830,
		"path": "../public/assets/admin-Cp3tLkDd.js"
	},
	"/assets/app-shell-HT1qA53R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e80-xVBgQiwS/Acsd9/Jr6/buHJsP40\"",
		"mtime": "2026-08-01T14:18:59.316Z",
		"size": 7808,
		"path": "../public/assets/app-shell-HT1qA53R.js"
	},
	"/assets/arrow-right-CArn9BoP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-z5QiEeoseioVyjcrq3qr+ve5xas\"",
		"mtime": "2026-08-01T14:18:59.316Z",
		"size": 158,
		"path": "../public/assets/arrow-right-CArn9BoP.js"
	},
	"/assets/auth-D4UI7J_u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"211e-3CBPdCQqkGwOuJQg1zo4Tr0Fh38\"",
		"mtime": "2026-08-01T14:18:59.325Z",
		"size": 8478,
		"path": "../public/assets/auth-D4UI7J_u.js"
	},
	"/assets/card-QFso22iz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b4-i3riLrhAZZpZq3+YeLgkCjoJLko\"",
		"mtime": "2026-08-01T14:18:59.327Z",
		"size": 692,
		"path": "../public/assets/card-QFso22iz.js"
	},
	"/assets/check-DSCcDRd7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75-2opNsCpn2kw5EeR2HvzJ87RwaGs\"",
		"mtime": "2026-08-01T14:18:59.327Z",
		"size": 117,
		"path": "../public/assets/check-DSCcDRd7.js"
	},
	"/assets/cinematic-Bq5g03jZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d6e-VFN0jTTmNK47c1CXGsUeoleeDsk\"",
		"mtime": "2026-08-01T14:18:59.328Z",
		"size": 23918,
		"path": "../public/assets/cinematic-Bq5g03jZ.js"
	},
	"/assets/circle-alert-DeDmFyyx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3-f1OzCPRLwUKPjvU0PIMEHodCU8M\"",
		"mtime": "2026-08-01T14:18:59.329Z",
		"size": 243,
		"path": "../public/assets/circle-alert-DeDmFyyx.js"
	},
	"/assets/circle-check-BHdfSEo_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11b-vCssb12tLcQLZ5JG/kvwde394cA\"",
		"mtime": "2026-08-01T14:18:59.329Z",
		"size": 283,
		"path": "../public/assets/circle-check-BHdfSEo_.js"
	},
	"/assets/crown-DbKIBdgJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-hphRAficek5WEho7A2qT+3aMWvE\"",
		"mtime": "2026-08-01T14:18:59.330Z",
		"size": 355,
		"path": "../public/assets/crown-DbKIBdgJ.js"
	},
	"/assets/dashboard-OAsQpv97.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b016-is62necEuPwYxR+q7dvNCeqNSY8\"",
		"mtime": "2026-08-01T14:18:59.332Z",
		"size": 45078,
		"path": "../public/assets/dashboard-OAsQpv97.js"
	},
	"/assets/deposit-request-B4_uAJ0Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2457-vGkr1ds/of4mcWixZQnxIIEARAQ\"",
		"mtime": "2026-08-01T14:18:59.333Z",
		"size": 9303,
		"path": "../public/assets/deposit-request-B4_uAJ0Z.js"
	},
	"/assets/generateCategoricalChart-rSF5YTJ5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58d1c-PbV9+SmfGuB7cZ0G6/F8ASc+0qY\"",
		"mtime": "2026-08-01T14:18:59.333Z",
		"size": 363804,
		"path": "../public/assets/generateCategoricalChart-rSF5YTJ5.js"
	},
	"/assets/index-DGdtoKbi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5572b-nd13ySc4TLNT4U/iFE4CzSmkOCo\"",
		"mtime": "2026-08-01T14:18:59.313Z",
		"size": 349995,
		"path": "../public/assets/index-DGdtoKbi.js"
	},
	"/assets/link-Djm8XRiY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cf9-rG+S2BcRdDWs/lCoL5eIO7ESkPc\"",
		"mtime": "2026-08-01T14:18:59.335Z",
		"size": 23801,
		"path": "../public/assets/link-Djm8XRiY.js"
	},
	"/assets/loader-circle-CqiNqJqL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89-BZZ1F4g/ipF7UbglvWgSucyreSc\"",
		"mtime": "2026-08-01T14:18:59.335Z",
		"size": 137,
		"path": "../public/assets/loader-circle-CqiNqJqL.js"
	},
	"/assets/notifications-Dawj1sQy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca3-ckvvyDPs1VBO6LCyEwiWX4ff0zY\"",
		"mtime": "2026-08-01T14:18:59.336Z",
		"size": 3235,
		"path": "../public/assets/notifications-Dawj1sQy.js"
	},
	"/assets/phone-DBycPEok.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b-m38cPowILM/dQI+LgkjudrEtR8Q\"",
		"mtime": "2026-08-01T14:18:59.336Z",
		"size": 315,
		"path": "../public/assets/phone-DBycPEok.js"
	},
	"/assets/plans-Rg_nE7e_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1304-iMAO9wL2JZT59n18Fkxj5rr/7l0\"",
		"mtime": "2026-08-01T14:18:59.337Z",
		"size": 4868,
		"path": "../public/assets/plans-Rg_nE7e_.js"
	},
	"/assets/requests-DDyYVAbT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bb2-KazpZMo2s43YT4m3v5rs20p8R/c\"",
		"mtime": "2026-08-01T14:18:59.338Z",
		"size": 11186,
		"path": "../public/assets/requests-DDyYVAbT.js"
	},
	"/assets/rolldown-runtime-hePW80VL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cc-fA8td6k29UVF6JoPfhOPkceTK1M\"",
		"mtime": "2026-08-01T14:18:59.338Z",
		"size": 716,
		"path": "../public/assets/rolldown-runtime-hePW80VL.js"
	},
	"/assets/routes-CZkpCbzE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b87-oJ4d6ozcqFAaeWeD+/SMR5U0xFU\"",
		"mtime": "2026-08-01T14:18:59.338Z",
		"size": 31623,
		"path": "../public/assets/routes-CZkpCbzE.js"
	},
	"/assets/status-pill-Ddh9yKK6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-8A1ADHuOg/kigHFMa90jXpheo6E\"",
		"mtime": "2026-08-01T14:18:59.338Z",
		"size": 422,
		"path": "../public/assets/status-pill-Ddh9yKK6.js"
	},
	"/assets/styles-Do5gbxNI.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1215a-3aegpVKV3wl8/gcsvRpp6DA5UCk\"",
		"mtime": "2026-08-01T14:18:59.341Z",
		"size": 74074,
		"path": "../public/assets/styles-Do5gbxNI.css"
	},
	"/assets/types-DTEftEpt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcae-ae+eXw+BpVXFtRQffYuHqeDHTo0\"",
		"mtime": "2026-08-01T14:18:59.339Z",
		"size": 56494,
		"path": "../public/assets/types-DTEftEpt.js"
	},
	"/assets/withdrawal-request-Cz5FUMY5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"291a-MG37NS/9n3RzCEFsSRqb9NlCFSM\"",
		"mtime": "2026-08-01T14:18:59.340Z",
		"size": 10522,
		"path": "../public/assets/withdrawal-request-Cz5FUMY5.js"
	},
	"/assets/x-B0yX1DoW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19e-Htqo+2RTRDXreX2BgkLOcSNb6mQ\"",
		"mtime": "2026-08-01T14:18:59.340Z",
		"size": 414,
		"path": "../public/assets/x-B0yX1DoW.js"
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
