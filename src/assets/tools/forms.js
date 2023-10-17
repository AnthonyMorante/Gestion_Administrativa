//Axios
!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).axios = t() }(this, (function () { "use strict"; function e(t) { return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e }, e(t) } function t(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } function n(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n]; r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } function r(e, t, r) { return t && n(e.prototype, t), r && n(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e } function o(e, t) { return function (e) { if (Array.isArray(e)) return e }(e) || function (e, t) { var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (null == n) return; var r, o, i = [], a = !0, s = !1; try { for (n = n.call(e); !(a = (r = n.next()).done) && (i.push(r.value), !t || i.length !== t); a = !0); } catch (e) { s = !0, o = e } finally { try { a || null == n.return || n.return() } finally { if (s) throw o } } return i }(e, t) || function (e, t) { if (!e) return; if ("string" == typeof e) return i(e, t); var n = Object.prototype.toString.call(e).slice(8, -1); "Object" === n && e.constructor && (n = e.constructor.name); if ("Map" === n || "Set" === n) return Array.from(e); if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return i(e, t) }(e, t) || function () { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() } function i(e, t) { (null == t || t > e.length) && (t = e.length); for (var n = 0, r = new Array(t); n < t; n++)r[n] = e[n]; return r } function a(e, t) { return function () { return e.apply(t, arguments) } } var s, u = Object.prototype.toString, c = Object.getPrototypeOf, f = (s = Object.create(null), function (e) { var t = u.call(e); return s[t] || (s[t] = t.slice(8, -1).toLowerCase()) }), l = function (e) { return e = e.toLowerCase(), function (t) { return f(t) === e } }, d = function (t) { return function (n) { return e(n) === t } }, p = Array.isArray, h = d("undefined"); var m = l("ArrayBuffer"); var y = d("string"), v = d("function"), b = d("number"), g = function (t) { return null !== t && "object" === e(t) }, w = function (e) { if ("object" !== f(e)) return !1; var t = c(e); return !(null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t) || Symbol.toStringTag in e || Symbol.iterator in e) }, E = l("Date"), O = l("File"), S = l("Blob"), R = l("FileList"), A = l("URLSearchParams"); function T(t, n) { var r, o, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = i.allOwnKeys, s = void 0 !== a && a; if (null != t) if ("object" !== e(t) && (t = [t]), p(t)) for (r = 0, o = t.length; r < o; r++)n.call(null, t[r], r, t); else { var u, c = s ? Object.getOwnPropertyNames(t) : Object.keys(t), f = c.length; for (r = 0; r < f; r++)u = c[r], n.call(null, t[u], u, t) } } function j(e, t) { t = t.toLowerCase(); for (var n, r = Object.keys(e), o = r.length; o-- > 0;)if (t === (n = r[o]).toLowerCase()) return n; return null } var N = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global, C = function (e) { return !h(e) && e !== N }; var x, P = (x = "undefined" != typeof Uint8Array && c(Uint8Array), function (e) { return x && e instanceof x }), k = l("HTMLFormElement"), U = function (e) { var t = Object.prototype.hasOwnProperty; return function (e, n) { return t.call(e, n) } }(), _ = l("RegExp"), F = function (e, t) { var n = Object.getOwnPropertyDescriptors(e), r = {}; T(n, (function (n, o) { !1 !== t(n, o, e) && (r[o] = n) })), Object.defineProperties(e, r) }, B = "abcdefghijklmnopqrstuvwxyz", L = "0123456789", D = { DIGIT: L, ALPHA: B, ALPHA_DIGIT: B + B.toUpperCase() + L }; var I = l("AsyncFunction"), q = { isArray: p, isArrayBuffer: m, isBuffer: function (e) { return null !== e && !h(e) && null !== e.constructor && !h(e.constructor) && v(e.constructor.isBuffer) && e.constructor.isBuffer(e) }, isFormData: function (e) { var t; return e && ("function" == typeof FormData && e instanceof FormData || v(e.append) && ("formdata" === (t = f(e)) || "object" === t && v(e.toString) && "[object FormData]" === e.toString())) }, isArrayBufferView: function (e) { return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && m(e.buffer) }, isString: y, isNumber: b, isBoolean: function (e) { return !0 === e || !1 === e }, isObject: g, isPlainObject: w, isUndefined: h, isDate: E, isFile: O, isBlob: S, isRegExp: _, isFunction: v, isStream: function (e) { return g(e) && v(e.pipe) }, isURLSearchParams: A, isTypedArray: P, isFileList: R, forEach: T, merge: function e() { for (var t = C(this) && this || {}, n = t.caseless, r = {}, o = function (t, o) { var i = n && j(r, o) || o; w(r[i]) && w(t) ? r[i] = e(r[i], t) : w(t) ? r[i] = e({}, t) : p(t) ? r[i] = t.slice() : r[i] = t }, i = 0, a = arguments.length; i < a; i++)arguments[i] && T(arguments[i], o); return r }, extend: function (e, t, n) { var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, o = r.allOwnKeys; return T(t, (function (t, r) { n && v(t) ? e[r] = a(t, n) : e[r] = t }), { allOwnKeys: o }), e }, trim: function (e) { return e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") }, stripBOM: function (e) { return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e }, inherits: function (e, t, n, r) { e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", { value: t.prototype }), n && Object.assign(e.prototype, n) }, toFlatObject: function (e, t, n, r) { var o, i, a, s = {}; if (t = t || {}, null == e) return t; do { for (i = (o = Object.getOwnPropertyNames(e)).length; i-- > 0;)a = o[i], r && !r(a, e, t) || s[a] || (t[a] = e[a], s[a] = !0); e = !1 !== n && c(e) } while (e && (!n || n(e, t)) && e !== Object.prototype); return t }, kindOf: f, kindOfTest: l, endsWith: function (e, t, n) { e = String(e), (void 0 === n || n > e.length) && (n = e.length), n -= t.length; var r = e.indexOf(t, n); return -1 !== r && r === n }, toArray: function (e) { if (!e) return null; if (p(e)) return e; var t = e.length; if (!b(t)) return null; for (var n = new Array(t); t-- > 0;)n[t] = e[t]; return n }, forEachEntry: function (e, t) { for (var n, r = (e && e[Symbol.iterator]).call(e); (n = r.next()) && !n.done;) { var o = n.value; t.call(e, o[0], o[1]) } }, matchAll: function (e, t) { for (var n, r = []; null !== (n = e.exec(t));)r.push(n); return r }, isHTMLForm: k, hasOwnProperty: U, hasOwnProp: U, reduceDescriptors: F, freezeMethods: function (e) { F(e, (function (t, n) { if (v(e) && -1 !== ["arguments", "caller", "callee"].indexOf(n)) return !1; var r = e[n]; v(r) && (t.enumerable = !1, "writable" in t ? t.writable = !1 : t.set || (t.set = function () { throw Error("Can not rewrite read-only method '" + n + "'") })) })) }, toObjectSet: function (e, t) { var n = {}, r = function (e) { e.forEach((function (e) { n[e] = !0 })) }; return p(e) ? r(e) : r(String(e).split(t)), n }, toCamelCase: function (e) { return e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, (function (e, t, n) { return t.toUpperCase() + n })) }, noop: function () { }, toFiniteNumber: function (e, t) { return e = +e, Number.isFinite(e) ? e : t }, findKey: j, global: N, isContextDefined: C, ALPHABET: D, generateString: function () { for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : D.ALPHA_DIGIT, n = "", r = t.length; e--;)n += t[Math.random() * r | 0]; return n }, isSpecCompliantForm: function (e) { return !!(e && v(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator]) }, toJSONObject: function (e) { var t = new Array(10); return function e(n, r) { if (g(n)) { if (t.indexOf(n) >= 0) return; if (!("toJSON" in n)) { t[r] = n; var o = p(n) ? [] : {}; return T(n, (function (t, n) { var i = e(t, r + 1); !h(i) && (o[n] = i) })), t[r] = void 0, o } } return n }(e, 0) }, isAsyncFn: I, isThenable: function (e) { return e && (g(e) || v(e)) && v(e.then) && v(e.catch) } }; function M(e, t, n, r, o) { Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o) } q.inherits(M, Error, { toJSON: function () { return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: q.toJSONObject(this.config), code: this.code, status: this.response && this.response.status ? this.response.status : null } } }); var z = M.prototype, H = {};["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((function (e) { H[e] = { value: e } })), Object.defineProperties(M, H), Object.defineProperty(z, "isAxiosError", { value: !0 }), M.from = function (e, t, n, r, o, i) { var a = Object.create(z); return q.toFlatObject(e, a, (function (e) { return e !== Error.prototype }), (function (e) { return "isAxiosError" !== e })), M.call(a, e.message, t, n, r, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a }; function J(e) { return q.isPlainObject(e) || q.isArray(e) } function W(e) { return q.endsWith(e, "[]") ? e.slice(0, -2) : e } function K(e, t, n) { return e ? e.concat(t).map((function (e, t) { return e = W(e), !n && t ? "[" + e + "]" : e })).join(n ? "." : "") : t } var V = q.toFlatObject(q, {}, null, (function (e) { return /^is[A-Z]/.test(e) })); function G(t, n, r) { if (!q.isObject(t)) throw new TypeError("target must be an object"); n = n || new FormData; var o = (r = q.toFlatObject(r, { metaTokens: !0, dots: !1, indexes: !1 }, !1, (function (e, t) { return !q.isUndefined(t[e]) }))).metaTokens, i = r.visitor || f, a = r.dots, s = r.indexes, u = (r.Blob || "undefined" != typeof Blob && Blob) && q.isSpecCompliantForm(n); if (!q.isFunction(i)) throw new TypeError("visitor must be a function"); function c(e) { if (null === e) return ""; if (q.isDate(e)) return e.toISOString(); if (!u && q.isBlob(e)) throw new M("Blob is not supported. Use a Buffer instead."); return q.isArrayBuffer(e) || q.isTypedArray(e) ? u && "function" == typeof Blob ? new Blob([e]) : Buffer.from(e) : e } function f(t, r, i) { var u = t; if (t && !i && "object" === e(t)) if (q.endsWith(r, "{}")) r = o ? r : r.slice(0, -2), t = JSON.stringify(t); else if (q.isArray(t) && function (e) { return q.isArray(e) && !e.some(J) }(t) || (q.isFileList(t) || q.endsWith(r, "[]")) && (u = q.toArray(t))) return r = W(r), u.forEach((function (e, t) { !q.isUndefined(e) && null !== e && n.append(!0 === s ? K([r], t, a) : null === s ? r : r + "[]", c(e)) })), !1; return !!J(t) || (n.append(K(i, r, a), c(t)), !1) } var l = [], d = Object.assign(V, { defaultVisitor: f, convertValue: c, isVisitable: J }); if (!q.isObject(t)) throw new TypeError("data must be an object"); return function e(t, r) { if (!q.isUndefined(t)) { if (-1 !== l.indexOf(t)) throw Error("Circular reference detected in " + r.join(".")); l.push(t), q.forEach(t, (function (t, o) { !0 === (!(q.isUndefined(t) || null === t) && i.call(n, t, q.isString(o) ? o.trim() : o, r, d)) && e(t, r ? r.concat(o) : [o]) })), l.pop() } }(t), n } function $(e) { var t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" }; return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, (function (e) { return t[e] })) } function X(e, t) { this._pairs = [], e && G(e, this, t) } var Q = X.prototype; function Z(e) { return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]") } function Y(e, t, n) { if (!t) return e; var r, o = n && n.encode || Z, i = n && n.serialize; if (r = i ? i(t, n) : q.isURLSearchParams(t) ? t.toString() : new X(t, n).toString(o)) { var a = e.indexOf("#"); -1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + r } return e } Q.append = function (e, t) { this._pairs.push([e, t]) }, Q.toString = function (e) { var t = e ? function (t) { return e.call(this, t, $) } : $; return this._pairs.map((function (e) { return t(e[0]) + "=" + t(e[1]) }), "").join("&") }; var ee, te = function () { function e() { t(this, e), this.handlers = [] } return r(e, [{ key: "use", value: function (e, t, n) { return this.handlers.push({ fulfilled: e, rejected: t, synchronous: !!n && n.synchronous, runWhen: n ? n.runWhen : null }), this.handlers.length - 1 } }, { key: "eject", value: function (e) { this.handlers[e] && (this.handlers[e] = null) } }, { key: "clear", value: function () { this.handlers && (this.handlers = []) } }, { key: "forEach", value: function (e) { q.forEach(this.handlers, (function (t) { null !== t && e(t) })) } }]), e }(), ne = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 }, re = { isBrowser: !0, classes: { URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : X, FormData: "undefined" != typeof FormData ? FormData : null, Blob: "undefined" != typeof Blob ? Blob : null }, isStandardBrowserEnv: ("undefined" == typeof navigator || "ReactNative" !== (ee = navigator.product) && "NativeScript" !== ee && "NS" !== ee) && "undefined" != typeof window && "undefined" != typeof document, isStandardBrowserWebWorkerEnv: "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts, protocols: ["http", "https", "file", "blob", "url", "data"] }; function oe(e) { function t(e, n, r, o) { var i = e[o++], a = Number.isFinite(+i), s = o >= e.length; return i = !i && q.isArray(r) ? r.length : i, s ? (q.hasOwnProp(r, i) ? r[i] = [r[i], n] : r[i] = n, !a) : (r[i] && q.isObject(r[i]) || (r[i] = []), t(e, n, r[i], o) && q.isArray(r[i]) && (r[i] = function (e) { var t, n, r = {}, o = Object.keys(e), i = o.length; for (t = 0; t < i; t++)r[n = o[t]] = e[n]; return r }(r[i])), !a) } if (q.isFormData(e) && q.isFunction(e.entries)) { var n = {}; return q.forEachEntry(e, (function (e, r) { t(function (e) { return q.matchAll(/\w+|\[(\w*)]/g, e).map((function (e) { return "[]" === e[0] ? "" : e[1] || e[0] })) }(e), r, n, 0) })), n } return null } var ie = { "Content-Type": void 0 }; var ae = { transitional: ne, adapter: ["xhr", "http"], transformRequest: [function (e, t) { var n, r = t.getContentType() || "", o = r.indexOf("application/json") > -1, i = q.isObject(e); if (i && q.isHTMLForm(e) && (e = new FormData(e)), q.isFormData(e)) return o && o ? JSON.stringify(oe(e)) : e; if (q.isArrayBuffer(e) || q.isBuffer(e) || q.isStream(e) || q.isFile(e) || q.isBlob(e)) return e; if (q.isArrayBufferView(e)) return e.buffer; if (q.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString(); if (i) { if (r.indexOf("application/x-www-form-urlencoded") > -1) return function (e, t) { return G(e, new re.classes.URLSearchParams, Object.assign({ visitor: function (e, t, n, r) { return re.isNode && q.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments) } }, t)) }(e, this.formSerializer).toString(); if ((n = q.isFileList(e)) || r.indexOf("multipart/form-data") > -1) { var a = this.env && this.env.FormData; return G(n ? { "files[]": e } : e, a && new a, this.formSerializer) } } return i || o ? (t.setContentType("application/json", !1), function (e, t, n) { if (q.isString(e)) try { return (t || JSON.parse)(e), q.trim(e) } catch (e) { if ("SyntaxError" !== e.name) throw e } return (n || JSON.stringify)(e) }(e)) : e }], transformResponse: [function (e) { var t = this.transitional || ae.transitional, n = t && t.forcedJSONParsing, r = "json" === this.responseType; if (e && q.isString(e) && (n && !this.responseType || r)) { var o = !(t && t.silentJSONParsing) && r; try { return JSON.parse(e) } catch (e) { if (o) { if ("SyntaxError" === e.name) throw M.from(e, M.ERR_BAD_RESPONSE, this, null, this.response); throw e } } } return e }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: re.classes.FormData, Blob: re.classes.Blob }, validateStatus: function (e) { return e >= 200 && e < 300 }, headers: { common: { Accept: "application/json, text/plain, */*" } } }; q.forEach(["delete", "get", "head"], (function (e) { ae.headers[e] = {} })), q.forEach(["post", "put", "patch"], (function (e) { ae.headers[e] = q.merge(ie) })); var se = ae, ue = q.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), ce = Symbol("internals"); function fe(e) { return e && String(e).trim().toLowerCase() } function le(e) { return !1 === e || null == e ? e : q.isArray(e) ? e.map(le) : String(e) } function de(e, t, n, r, o) { return q.isFunction(r) ? r.call(this, t, n) : (o && (t = n), q.isString(t) ? q.isString(r) ? -1 !== t.indexOf(r) : q.isRegExp(r) ? r.test(t) : void 0 : void 0) } var pe = function (e, n) { function i(e) { t(this, i), e && this.set(e) } return r(i, [{ key: "set", value: function (e, t, n) { var r = this; function o(e, t, n) { var o = fe(t); if (!o) throw new Error("header name must be a non-empty string"); var i = q.findKey(r, o); (!i || void 0 === r[i] || !0 === n || void 0 === n && !1 !== r[i]) && (r[i || t] = le(e)) } var i, a, s, u, c, f = function (e, t) { return q.forEach(e, (function (e, n) { return o(e, n, t) })) }; return q.isPlainObject(e) || e instanceof this.constructor ? f(e, t) : q.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()) ? f((c = {}, (i = e) && i.split("\n").forEach((function (e) { u = e.indexOf(":"), a = e.substring(0, u).trim().toLowerCase(), s = e.substring(u + 1).trim(), !a || c[a] && ue[a] || ("set-cookie" === a ? c[a] ? c[a].push(s) : c[a] = [s] : c[a] = c[a] ? c[a] + ", " + s : s) })), c), t) : null != e && o(t, e, n), this } }, { key: "get", value: function (e, t) { if (e = fe(e)) { var n = q.findKey(this, e); if (n) { var r = this[n]; if (!t) return r; if (!0 === t) return function (e) { for (var t, n = Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g; t = r.exec(e);)n[t[1]] = t[2]; return n }(r); if (q.isFunction(t)) return t.call(this, r, n); if (q.isRegExp(t)) return t.exec(r); throw new TypeError("parser must be boolean|regexp|function") } } } }, { key: "has", value: function (e, t) { if (e = fe(e)) { var n = q.findKey(this, e); return !(!n || void 0 === this[n] || t && !de(0, this[n], n, t)) } return !1 } }, { key: "delete", value: function (e, t) { var n = this, r = !1; function o(e) { if (e = fe(e)) { var o = q.findKey(n, e); !o || t && !de(0, n[o], o, t) || (delete n[o], r = !0) } } return q.isArray(e) ? e.forEach(o) : o(e), r } }, { key: "clear", value: function (e) { for (var t = Object.keys(this), n = t.length, r = !1; n--;) { var o = t[n]; e && !de(0, this[o], o, e, !0) || (delete this[o], r = !0) } return r } }, { key: "normalize", value: function (e) { var t = this, n = {}; return q.forEach(this, (function (r, o) { var i = q.findKey(n, o); if (i) return t[i] = le(r), void delete t[o]; var a = e ? function (e) { return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (function (e, t, n) { return t.toUpperCase() + n })) }(o) : String(o).trim(); a !== o && delete t[o], t[a] = le(r), n[a] = !0 })), this } }, { key: "concat", value: function () { for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)n[r] = arguments[r]; return (e = this.constructor).concat.apply(e, [this].concat(n)) } }, { key: "toJSON", value: function (e) { var t = Object.create(null); return q.forEach(this, (function (n, r) { null != n && !1 !== n && (t[r] = e && q.isArray(n) ? n.join(", ") : n) })), t } }, { key: Symbol.iterator, value: function () { return Object.entries(this.toJSON())[Symbol.iterator]() } }, { key: "toString", value: function () { return Object.entries(this.toJSON()).map((function (e) { var t = o(e, 2); return t[0] + ": " + t[1] })).join("\n") } }, { key: Symbol.toStringTag, get: function () { return "AxiosHeaders" } }], [{ key: "from", value: function (e) { return e instanceof this ? e : new this(e) } }, { key: "concat", value: function (e) { for (var t = new this(e), n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)r[o - 1] = arguments[o]; return r.forEach((function (e) { return t.set(e) })), t } }, { key: "accessor", value: function (e) { var t = (this[ce] = this[ce] = { accessors: {} }).accessors, n = this.prototype; function r(e) { var r = fe(e); t[r] || (!function (e, t) { var n = q.toCamelCase(" " + t);["get", "set", "has"].forEach((function (r) { Object.defineProperty(e, r + n, { value: function (e, n, o) { return this[r].call(this, t, e, n, o) }, configurable: !0 }) })) }(n, e), t[r] = !0) } return q.isArray(e) ? e.forEach(r) : r(e), this } }]), i }(); pe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), q.freezeMethods(pe.prototype), q.freezeMethods(pe); var he = pe; function me(e, t) { var n = this || se, r = t || n, o = he.from(r.headers), i = r.data; return q.forEach(e, (function (e) { i = e.call(n, i, o.normalize(), t ? t.status : void 0) })), o.normalize(), i } function ye(e) { return !(!e || !e.__CANCEL__) } function ve(e, t, n) { M.call(this, null == e ? "canceled" : e, M.ERR_CANCELED, t, n), this.name = "CanceledError" } q.inherits(ve, M, { __CANCEL__: !0 }); var be = re.isStandardBrowserEnv ? { write: function (e, t, n, r, o, i) { var a = []; a.push(e + "=" + encodeURIComponent(t)), q.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), q.isString(r) && a.push("path=" + r), q.isString(o) && a.push("domain=" + o), !0 === i && a.push("secure"), document.cookie = a.join("; ") }, read: function (e) { var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")); return t ? decodeURIComponent(t[3]) : null }, remove: function (e) { this.write(e, "", Date.now() - 864e5) } } : { write: function () { }, read: function () { return null }, remove: function () { } }; function ge(e, t) { return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t) ? function (e, t) { return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e }(e, t) : t } var we = re.isStandardBrowserEnv ? function () { var e, t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a"); function r(e) { var r = e; return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), { href: n.href, protocol: n.protocol ? n.protocol.replace(/:$/, "") : "", host: n.host, search: n.search ? n.search.replace(/^\?/, "") : "", hash: n.hash ? n.hash.replace(/^#/, "") : "", hostname: n.hostname, port: n.port, pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname } } return e = r(window.location.href), function (t) { var n = q.isString(t) ? r(t) : t; return n.protocol === e.protocol && n.host === e.host } }() : function () { return !0 }; function Ee(e, t) { var n = 0, r = function (e, t) { e = e || 10; var n, r = new Array(e), o = new Array(e), i = 0, a = 0; return t = void 0 !== t ? t : 1e3, function (s) { var u = Date.now(), c = o[a]; n || (n = u), r[i] = s, o[i] = u; for (var f = a, l = 0; f !== i;)l += r[f++], f %= e; if ((i = (i + 1) % e) === a && (a = (a + 1) % e), !(u - n < t)) { var d = c && u - c; return d ? Math.round(1e3 * l / d) : void 0 } } }(50, 250); return function (o) { var i = o.loaded, a = o.lengthComputable ? o.total : void 0, s = i - n, u = r(s); n = i; var c = { loaded: i, total: a, progress: a ? i / a : void 0, bytes: s, rate: u || void 0, estimated: u && a && i <= a ? (a - i) / u : void 0, event: o }; c[t ? "download" : "upload"] = !0, e(c) } } var Oe = { http: null, xhr: "undefined" != typeof XMLHttpRequest && function (e) { return new Promise((function (t, n) { var r, o = e.data, i = he.from(e.headers).normalize(), a = e.responseType; function s() { e.cancelToken && e.cancelToken.unsubscribe(r), e.signal && e.signal.removeEventListener("abort", r) } q.isFormData(o) && (re.isStandardBrowserEnv || re.isStandardBrowserWebWorkerEnv ? i.setContentType(!1) : i.setContentType("multipart/form-data;", !1)); var u = new XMLHttpRequest; if (e.auth) { var c = e.auth.username || "", f = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : ""; i.set("Authorization", "Basic " + btoa(c + ":" + f)) } var l = ge(e.baseURL, e.url); function d() { if (u) { var r = he.from("getAllResponseHeaders" in u && u.getAllResponseHeaders()); !function (e, t, n) { var r = n.config.validateStatus; n.status && r && !r(n.status) ? t(new M("Request failed with status code " + n.status, [M.ERR_BAD_REQUEST, M.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n)) : e(n) }((function (e) { t(e), s() }), (function (e) { n(e), s() }), { data: a && "text" !== a && "json" !== a ? u.response : u.responseText, status: u.status, statusText: u.statusText, headers: r, config: e, request: u }), u = null } } if (u.open(e.method.toUpperCase(), Y(l, e.params, e.paramsSerializer), !0), u.timeout = e.timeout, "onloadend" in u ? u.onloadend = d : u.onreadystatechange = function () { u && 4 === u.readyState && (0 !== u.status || u.responseURL && 0 === u.responseURL.indexOf("file:")) && setTimeout(d) }, u.onabort = function () { u && (n(new M("Request aborted", M.ECONNABORTED, e, u)), u = null) }, u.onerror = function () { n(new M("Network Error", M.ERR_NETWORK, e, u)), u = null }, u.ontimeout = function () { var t = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded", r = e.transitional || ne; e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(new M(t, r.clarifyTimeoutError ? M.ETIMEDOUT : M.ECONNABORTED, e, u)), u = null }, re.isStandardBrowserEnv) { var p = (e.withCredentials || we(l)) && e.xsrfCookieName && be.read(e.xsrfCookieName); p && i.set(e.xsrfHeaderName, p) } void 0 === o && i.setContentType(null), "setRequestHeader" in u && q.forEach(i.toJSON(), (function (e, t) { u.setRequestHeader(t, e) })), q.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), a && "json" !== a && (u.responseType = e.responseType), "function" == typeof e.onDownloadProgress && u.addEventListener("progress", Ee(e.onDownloadProgress, !0)), "function" == typeof e.onUploadProgress && u.upload && u.upload.addEventListener("progress", Ee(e.onUploadProgress)), (e.cancelToken || e.signal) && (r = function (t) { u && (n(!t || t.type ? new ve(null, e, u) : t), u.abort(), u = null) }, e.cancelToken && e.cancelToken.subscribe(r), e.signal && (e.signal.aborted ? r() : e.signal.addEventListener("abort", r))); var h, m = (h = /^([-+\w]{1,25})(:?\/\/|:)/.exec(l)) && h[1] || ""; m && -1 === re.protocols.indexOf(m) ? n(new M("Unsupported protocol " + m + ":", M.ERR_BAD_REQUEST, e)) : u.send(o || null) })) } }; q.forEach(Oe, (function (e, t) { if (e) { try { Object.defineProperty(e, "name", { value: t }) } catch (e) { } Object.defineProperty(e, "adapterName", { value: t }) } })); var Se = function (e) { for (var t, n, r = (e = q.isArray(e) ? e : [e]).length, o = 0; o < r && (t = e[o], !(n = q.isString(t) ? Oe[t.toLowerCase()] : t)); o++); if (!n) { if (!1 === n) throw new M("Adapter ".concat(t, " is not supported by the environment"), "ERR_NOT_SUPPORT"); throw new Error(q.hasOwnProp(Oe, t) ? "Adapter '".concat(t, "' is not available in the build") : "Unknown adapter '".concat(t, "'")) } if (!q.isFunction(n)) throw new TypeError("adapter is not a function"); return n }; function Re(e) { if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new ve(null, e) } function Ae(e) { return Re(e), e.headers = he.from(e.headers), e.data = me.call(e, e.transformRequest), -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1), Se(e.adapter || se.adapter)(e).then((function (t) { return Re(e), t.data = me.call(e, e.transformResponse, t), t.headers = he.from(t.headers), t }), (function (t) { return ye(t) || (Re(e), t && t.response && (t.response.data = me.call(e, e.transformResponse, t.response), t.response.headers = he.from(t.response.headers))), Promise.reject(t) })) } var Te = function (e) { return e instanceof he ? e.toJSON() : e }; function je(e, t) { t = t || {}; var n = {}; function r(e, t, n) { return q.isPlainObject(e) && q.isPlainObject(t) ? q.merge.call({ caseless: n }, e, t) : q.isPlainObject(t) ? q.merge({}, t) : q.isArray(t) ? t.slice() : t } function o(e, t, n) { return q.isUndefined(t) ? q.isUndefined(e) ? void 0 : r(void 0, e, n) : r(e, t, n) } function i(e, t) { if (!q.isUndefined(t)) return r(void 0, t) } function a(e, t) { return q.isUndefined(t) ? q.isUndefined(e) ? void 0 : r(void 0, e) : r(void 0, t) } function s(n, o, i) { return i in t ? r(n, o) : i in e ? r(void 0, n) : void 0 } var u = { url: i, method: i, data: i, baseURL: a, transformRequest: a, transformResponse: a, paramsSerializer: a, timeout: a, timeoutMessage: a, withCredentials: a, adapter: a, responseType: a, xsrfCookieName: a, xsrfHeaderName: a, onUploadProgress: a, onDownloadProgress: a, decompress: a, maxContentLength: a, maxBodyLength: a, beforeRedirect: a, transport: a, httpAgent: a, httpsAgent: a, cancelToken: a, socketPath: a, responseEncoding: a, validateStatus: s, headers: function (e, t) { return o(Te(e), Te(t), !0) } }; return q.forEach(Object.keys(Object.assign({}, e, t)), (function (r) { var i = u[r] || o, a = i(e[r], t[r], r); q.isUndefined(a) && i !== s || (n[r] = a) })), n } var Ne = "1.4.0", Ce = {};["object", "boolean", "number", "function", "string", "symbol"].forEach((function (t, n) { Ce[t] = function (r) { return e(r) === t || "a" + (n < 1 ? "n " : " ") + t } })); var xe = {}; Ce.transitional = function (e, t, n) { function r(e, t) { return "[Axios v1.4.0] Transitional option '" + e + "'" + t + (n ? ". " + n : "") } return function (n, o, i) { if (!1 === e) throw new M(r(o, " has been removed" + (t ? " in " + t : "")), M.ERR_DEPRECATED); return t && !xe[o] && (xe[o] = !0, console.warn(r(o, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, o, i) } }; var Pe = { assertOptions: function (t, n, r) { if ("object" !== e(t)) throw new M("options must be an object", M.ERR_BAD_OPTION_VALUE); for (var o = Object.keys(t), i = o.length; i-- > 0;) { var a = o[i], s = n[a]; if (s) { var u = t[a], c = void 0 === u || s(u, a, t); if (!0 !== c) throw new M("option " + a + " must be " + c, M.ERR_BAD_OPTION_VALUE) } else if (!0 !== r) throw new M("Unknown option " + a, M.ERR_BAD_OPTION) } }, validators: Ce }, ke = Pe.validators, Ue = function () { function e(n) { t(this, e), this.defaults = n, this.interceptors = { request: new te, response: new te } } return r(e, [{ key: "request", value: function (e, t) { "string" == typeof e ? (t = t || {}).url = e : t = e || {}; var n, r = t = je(this.defaults, t), o = r.transitional, i = r.paramsSerializer, a = r.headers; void 0 !== o && Pe.assertOptions(o, { silentJSONParsing: ke.transitional(ke.boolean), forcedJSONParsing: ke.transitional(ke.boolean), clarifyTimeoutError: ke.transitional(ke.boolean) }, !1), null != i && (q.isFunction(i) ? t.paramsSerializer = { serialize: i } : Pe.assertOptions(i, { encode: ke.function, serialize: ke.function }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase(), (n = a && q.merge(a.common, a[t.method])) && q.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (e) { delete a[e] })), t.headers = he.concat(n, a); var s = [], u = !0; this.interceptors.request.forEach((function (e) { "function" == typeof e.runWhen && !1 === e.runWhen(t) || (u = u && e.synchronous, s.unshift(e.fulfilled, e.rejected)) })); var c, f = []; this.interceptors.response.forEach((function (e) { f.push(e.fulfilled, e.rejected) })); var l, d = 0; if (!u) { var p = [Ae.bind(this), void 0]; for (p.unshift.apply(p, s), p.push.apply(p, f), l = p.length, c = Promise.resolve(t); d < l;)c = c.then(p[d++], p[d++]); return c } l = s.length; var h = t; for (d = 0; d < l;) { var m = s[d++], y = s[d++]; try { h = m(h) } catch (e) { y.call(this, e); break } } try { c = Ae.call(this, h) } catch (e) { return Promise.reject(e) } for (d = 0, l = f.length; d < l;)c = c.then(f[d++], f[d++]); return c } }, { key: "getUri", value: function (e) { return Y(ge((e = je(this.defaults, e)).baseURL, e.url), e.params, e.paramsSerializer) } }]), e }(); q.forEach(["delete", "get", "head", "options"], (function (e) { Ue.prototype[e] = function (t, n) { return this.request(je(n || {}, { method: e, url: t, data: (n || {}).data })) } })), q.forEach(["post", "put", "patch"], (function (e) { function t(t) { return function (n, r, o) { return this.request(je(o || {}, { method: e, headers: t ? { "Content-Type": "multipart/form-data" } : {}, url: n, data: r })) } } Ue.prototype[e] = t(), Ue.prototype[e + "Form"] = t(!0) })); var _e = Ue, Fe = function () { function e(n) { if (t(this, e), "function" != typeof n) throw new TypeError("executor must be a function."); var r; this.promise = new Promise((function (e) { r = e })); var o = this; this.promise.then((function (e) { if (o._listeners) { for (var t = o._listeners.length; t-- > 0;)o._listeners[t](e); o._listeners = null } })), this.promise.then = function (e) { var t, n = new Promise((function (e) { o.subscribe(e), t = e })).then(e); return n.cancel = function () { o.unsubscribe(t) }, n }, n((function (e, t, n) { o.reason || (o.reason = new ve(e, t, n), r(o.reason)) })) } return r(e, [{ key: "throwIfRequested", value: function () { if (this.reason) throw this.reason } }, { key: "subscribe", value: function (e) { this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e] } }, { key: "unsubscribe", value: function (e) { if (this._listeners) { var t = this._listeners.indexOf(e); -1 !== t && this._listeners.splice(t, 1) } } }], [{ key: "source", value: function () { var t; return { token: new e((function (e) { t = e })), cancel: t } } }]), e }(); var Be = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511 }; Object.entries(Be).forEach((function (e) { var t = o(e, 2), n = t[0], r = t[1]; Be[r] = n })); var Le = Be; var De = function e(t) { var n = new _e(t), r = a(_e.prototype.request, n); return q.extend(r, _e.prototype, n, { allOwnKeys: !0 }), q.extend(r, n, null, { allOwnKeys: !0 }), r.create = function (n) { return e(je(t, n)) }, r }(se); return De.Axios = _e, De.CanceledError = ve, De.CancelToken = Fe, De.isCancel = ye, De.VERSION = Ne, De.toFormData = G, De.AxiosError = M, De.Cancel = De.CanceledError, De.all = function (e) { return Promise.all(e) }, De.spread = function (e) { return function (t) { return e.apply(null, t) } }, De.isAxiosError = function (e) { return q.isObject(e) && !0 === e.isAxiosError }, De.mergeConfig = je, De.AxiosHeaders = he, De.formToJSON = function (e) { return oe(q.isHTMLForm(e) ? new FormData(e) : e) }, De.HttpStatusCode = Le, De.default = De, De }));
//Cripto
!function (t, e) { "object" == typeof exports ? module.exports = exports = e() : "function" == typeof define && define.amd ? define([], e) : t.CryptoJS = e() }(this, (function () { var t, e, r, i, n, o, s, c, a, h, l, f, d, u, p, _, y, v, g, B, w, k, m, S, x, b, A, H, z, C, D, E, R, M, F, P, W, O, I, U, K, X, L, j, T, N, q, Z, V, G, J, Q, Y, $, tt, et, rt, it, nt, ot, st, ct, at, ht, lt, ft, dt, ut, pt, _t, yt, vt = vt || function (t) { if ("undefined" != typeof window && window.crypto && (e = window.crypto), "undefined" != typeof self && self.crypto && (e = self.crypto), !(e = (e = (e = "undefined" != typeof globalThis && globalThis.crypto ? globalThis.crypto : e) || "undefined" == typeof window || !window.msCrypto ? e : window.msCrypto) || "undefined" == typeof global || !global.crypto ? e : global.crypto) && "function" == typeof require) try { e = require("crypto") } catch (t) { } var e, r = Object.create || function (t) { return i.prototype = t, t = new i, i.prototype = null, t }; function i() { } var n = {}, o = n.lib = {}, s = o.Base = { extend: function (t) { var e = r(this); return t && e.mixIn(t), e.hasOwnProperty("init") && this.init !== e.init || (e.init = function () { e.$super.init.apply(this, arguments) }), (e.init.prototype = e).$super = this, e }, create: function () { var t = this.extend(); return t.init.apply(t, arguments), t }, init: function () { }, mixIn: function (t) { for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]); t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function () { return this.init.prototype.extend(this) } }, c = o.WordArray = s.extend({ init: function (t, e) { t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length }, toString: function (t) { return (t || h).stringify(this) }, concat: function (t) { var e = this.words, r = t.words, i = this.sigBytes, n = t.sigBytes; if (this.clamp(), i % 4) for (var o = 0; o < n; o++) { var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255; e[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8 } else for (var c = 0; c < n; c += 4)e[i + c >>> 2] = r[c >>> 2]; return this.sigBytes += n, this }, clamp: function () { var e = this.words, r = this.sigBytes; e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, e.length = t.ceil(r / 4) }, clone: function () { var t = s.clone.call(this); return t.words = this.words.slice(0), t }, random: function (t) { for (var r = [], i = 0; i < t; i += 4)r.push(function () { if (e) { if ("function" == typeof e.getRandomValues) try { return e.getRandomValues(new Uint32Array(1))[0] } catch (t) { } if ("function" == typeof e.randomBytes) try { return e.randomBytes(4).readInt32LE() } catch (t) { } } throw Error("Native crypto module could not be used to get secure random number.") }()); return new c.init(r, t) } }), a = n.enc = {}, h = a.Hex = { stringify: function (t) { for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) { var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16)) } return i.join("") }, parse: function (t) { for (var e = t.length, r = [], i = 0; i < e; i += 2)r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4; return new c.init(r, e / 2) } }, l = a.Latin1 = { stringify: function (t) { for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) { var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var e = t.length, r = [], i = 0; i < e; i++)r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8; return new c.init(r, e) } }, f = a.Utf8 = { stringify: function (t) { try { return decodeURIComponent(escape(l.stringify(t))) } catch (t) { throw Error("Malformed UTF-8 data") } }, parse: function (t) { return l.parse(unescape(encodeURIComponent(t))) } }, d = o.BufferedBlockAlgorithm = s.extend({ reset: function () { this._data = new c.init, this._nDataBytes = 0 }, _append: function (t) { "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function (e) { var r, i = this._data, n = i.words, o = i.sigBytes, s = this.blockSize, a = o / (4 * s), h = (a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * s; o = t.min(4 * h, o); if (h) { for (var l = 0; l < h; l += s)this._doProcessBlock(n, l); r = n.splice(0, h), i.sigBytes -= o } return new c.init(r, o) }, clone: function () { var t = s.clone.call(this); return t._data = this._data.clone(), t }, _minBufferSize: 0 }), u = (o.Hasher = d.extend({ cfg: s.extend(), init: function (t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function () { d.reset.call(this), this._doReset() }, update: function (t) { return this._append(t), this._process(), this }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, blockSize: 16, _createHelper: function (t) { return function (e, r) { return new t.init(r).finalize(e) } }, _createHmacHelper: function (t) { return function (e, r) { return new u.HMAC.init(t, r).finalize(e) } } }), n.algo = {}); return n }(Math); function gt(t, e) { return t << e | t >>> 32 - e } function Bt(t, e, r, i) { var n, o = this._iv; o ? (n = o.slice(0), this._iv = void 0) : n = this._prevBlock, i.encryptBlock(n, 0); for (var s = 0; s < r; s++)t[e + s] ^= n[s] } function wt(t) { var e, r, i; return 255 == (t >> 24 & 255) ? (r = t >> 8 & 255, i = 255 & t, 255 == (e = t >> 16 & 255) ? (e = 0, 255 === r ? (r = 0, 255 === i ? i = 0 : ++i) : ++r) : ++e, t = 0, t += e << 16, t += r << 8, t += i) : t += 16777216, t } function kt() { for (var t = this._X, e = this._C, r = 0; r < 8; r++)ht[r] = e[r]; for (e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < ht[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < ht[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < ht[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < ht[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < ht[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < ht[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < ht[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < ht[7] >>> 0 ? 1 : 0, r = 0; r < 8; r++) { var i = t[r] + e[r], n = 65535 & i, o = i >>> 16; lt[r] = ((n * n >>> 17) + n * o >>> 15) + o * o ^ ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0) } t[0] = lt[0] + (lt[7] << 16 | lt[7] >>> 16) + (lt[6] << 16 | lt[6] >>> 16) | 0, t[1] = lt[1] + (lt[0] << 8 | lt[0] >>> 24) + lt[7] | 0, t[2] = lt[2] + (lt[1] << 16 | lt[1] >>> 16) + (lt[0] << 16 | lt[0] >>> 16) | 0, t[3] = lt[3] + (lt[2] << 8 | lt[2] >>> 24) + lt[1] | 0, t[4] = lt[4] + (lt[3] << 16 | lt[3] >>> 16) + (lt[2] << 16 | lt[2] >>> 16) | 0, t[5] = lt[5] + (lt[4] << 8 | lt[4] >>> 24) + lt[3] | 0, t[6] = lt[6] + (lt[5] << 16 | lt[5] >>> 16) + (lt[4] << 16 | lt[4] >>> 16) | 0, t[7] = lt[7] + (lt[6] << 8 | lt[6] >>> 24) + lt[5] | 0 } function mt() { for (var t = this._X, e = this._C, r = 0; r < 8; r++)_t[r] = e[r]; for (e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < _t[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < _t[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < _t[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < _t[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < _t[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < _t[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < _t[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < _t[7] >>> 0 ? 1 : 0, r = 0; r < 8; r++) { var i = t[r] + e[r], n = 65535 & i, o = i >>> 16; yt[r] = ((n * n >>> 17) + n * o >>> 15) + o * o ^ ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0) } t[0] = yt[0] + (yt[7] << 16 | yt[7] >>> 16) + (yt[6] << 16 | yt[6] >>> 16) | 0, t[1] = yt[1] + (yt[0] << 8 | yt[0] >>> 24) + yt[7] | 0, t[2] = yt[2] + (yt[1] << 16 | yt[1] >>> 16) + (yt[0] << 16 | yt[0] >>> 16) | 0, t[3] = yt[3] + (yt[2] << 8 | yt[2] >>> 24) + yt[1] | 0, t[4] = yt[4] + (yt[3] << 16 | yt[3] >>> 16) + (yt[2] << 16 | yt[2] >>> 16) | 0, t[5] = yt[5] + (yt[4] << 8 | yt[4] >>> 24) + yt[3] | 0, t[6] = yt[6] + (yt[5] << 16 | yt[5] >>> 16) + (yt[4] << 16 | yt[4] >>> 16) | 0, t[7] = yt[7] + (yt[6] << 8 | yt[6] >>> 24) + yt[5] | 0 } return R = (dt = (ft = vt).lib).Base, M = dt.WordArray, (ft = ft.x64 = {}).Word = R.extend({ init: function (t, e) { this.high = t, this.low = e } }), ft.WordArray = R.extend({ init: function (t, e) { t = this.words = t || [], this.sigBytes = null != e ? e : 8 * t.length }, toX32: function () { for (var t = this.words, e = t.length, r = [], i = 0; i < e; i++) { var n = t[i]; r.push(n.high), r.push(n.low) } return M.create(r, this.sigBytes) }, clone: function () { for (var t = R.clone.call(this), e = t.words = this.words.slice(0), r = e.length, i = 0; i < r; i++)e[i] = e[i].clone(); return t } }), "function" == typeof ArrayBuffer && (F = (ut = vt.lib.WordArray).init, (ut.init = function (t) { if ((t = (t = t instanceof ArrayBuffer ? new Uint8Array(t) : t) instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t) instanceof Uint8Array) { for (var e = t.byteLength, r = [], i = 0; i < e; i++)r[i >>> 2] |= t[i] << 24 - i % 4 * 8; F.call(this, r, e) } else F.apply(this, arguments) }).prototype = ut), function () { var t, e = (t = vt).lib.WordArray; function r(t) { return t << 8 & 4278255360 | t >>> 8 & 16711935 } (t = t.enc).Utf16 = t.Utf16BE = { stringify: function (t) { for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n += 2) { var o = e[n >>> 2] >>> 16 - n % 4 * 8 & 65535; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var r = t.length, i = [], n = 0; n < r; n++)i[n >>> 1] |= t.charCodeAt(n) << 16 - n % 2 * 16; return e.create(i, 2 * r) } }, t.Utf16LE = { stringify: function (t) { for (var e = t.words, i = t.sigBytes, n = [], o = 0; o < i; o += 2) { var s = r(e[o >>> 2] >>> 16 - o % 4 * 8 & 65535); n.push(String.fromCharCode(s)) } return n.join("") }, parse: function (t) { for (var i = t.length, n = [], o = 0; o < i; o++)n[o >>> 1] |= r(t.charCodeAt(o) << 16 - o % 2 * 16); return e.create(n, 2 * i) } } }(), P = (nt = vt).lib.WordArray, nt.enc.Base64 = { stringify: function (t) { var e = t.words, r = t.sigBytes, i = this._map; t.clamp(); for (var n = [], o = 0; o < r; o += 3)for (var s = (e[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, c = 0; c < 4 && o + .75 * c < r; c++)n.push(i.charAt(s >>> 6 * (3 - c) & 63)); var a = i.charAt(64); if (a) for (; n.length % 4;)n.push(a); return n.join("") }, parse: function (t) { var e = t.length, r = this._map; if (!(i = this._reverseMap)) for (var i = this._reverseMap = [], n = 0; n < r.length; n++)i[r.charCodeAt(n)] = n; var o = r.charAt(64); return o && (-1 === (o = t.indexOf(o)) || (e = o)), function (t, e, r) { for (var i, n, o = [], s = 0, c = 0; c < e; c++)c % 4 && (i = r[t.charCodeAt(c - 1)] << c % 4 * 2, n = r[t.charCodeAt(c)] >>> 6 - c % 4 * 2, n |= i, o[s >>> 2] |= n << 24 - s % 4 * 8, s++); return P.create(o, s) }(t, e, i) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, W = (dt = vt).lib.WordArray, dt.enc.Base64url = { stringify: function (t, e = !0) { var r = t.words, i = t.sigBytes, n = e ? this._safe_map : this._map; t.clamp(); for (var o = [], s = 0; s < i; s += 3)for (var c = (r[s >>> 2] >>> 24 - s % 4 * 8 & 255) << 16 | (r[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255) << 8 | r[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255, a = 0; a < 4 && s + .75 * a < i; a++)o.push(n.charAt(c >>> 6 * (3 - a) & 63)); var h = n.charAt(64); if (h) for (; o.length % 4;)o.push(h); return o.join("") }, parse: function (t, e = !0) { var r = t.length, i = e ? this._safe_map : this._map; if (!(n = this._reverseMap)) for (var n = this._reverseMap = [], o = 0; o < i.length; o++)n[i.charCodeAt(o)] = o; return (e = i.charAt(64)) && (-1 === (e = t.indexOf(e)) || (r = e)), function (t, e, r) { for (var i, n, o = [], s = 0, c = 0; c < e; c++)c % 4 && (i = r[t.charCodeAt(c - 1)] << c % 4 * 2, n = r[t.charCodeAt(c)] >>> 6 - c % 4 * 2, n |= i, o[s >>> 2] |= n << 24 - s % 4 * 8, s++); return W.create(o, s) }(t, r, n) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" }, function (t) { var e = vt, r = (n = e.lib).WordArray, i = n.Hasher, n = e.algo, o = []; function s(t, e, r, i, n, o, s) { return ((s = t + (e & r | ~e & i) + n + s) << o | s >>> 32 - o) + e } function c(t, e, r, i, n, o, s) { return ((s = t + (e & i | r & ~i) + n + s) << o | s >>> 32 - o) + e } function a(t, e, r, i, n, o, s) { return ((s = t + (e ^ r ^ i) + n + s) << o | s >>> 32 - o) + e } function h(t, e, r, i, n, o, s) { return ((s = t + (r ^ (e | ~i)) + n + s) << o | s >>> 32 - o) + e } (function () { for (var e = 0; e < 64; e++)o[e] = 4294967296 * t.abs(t.sin(e + 1)) | 0 })(), n = n.MD5 = i.extend({ _doReset: function () { this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (t, e) { for (var r = 0; r < 16; r++) { var i = e + r, n = t[i]; t[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8) } var l = this._hash.words, f = t[e + 0], d = t[e + 1], u = t[e + 2], p = t[e + 3], _ = t[e + 4], y = t[e + 5], v = t[e + 6], g = t[e + 7], B = t[e + 8], w = t[e + 9], k = t[e + 10], m = t[e + 11], S = t[e + 12], x = t[e + 13], b = t[e + 14], A = t[e + 15], H = s(H = l[0], D = l[1], C = l[2], z = l[3], f, 7, o[0]), z = s(z, H, D, C, d, 12, o[1]), C = s(C, z, H, D, u, 17, o[2]), D = s(D, C, z, H, p, 22, o[3]); H = s(H, D, C, z, _, 7, o[4]), z = s(z, H, D, C, y, 12, o[5]), C = s(C, z, H, D, v, 17, o[6]), D = s(D, C, z, H, g, 22, o[7]), H = s(H, D, C, z, B, 7, o[8]), z = s(z, H, D, C, w, 12, o[9]), C = s(C, z, H, D, k, 17, o[10]), D = s(D, C, z, H, m, 22, o[11]), H = s(H, D, C, z, S, 7, o[12]), z = s(z, H, D, C, x, 12, o[13]), C = s(C, z, H, D, b, 17, o[14]), H = c(H, D = s(D, C, z, H, A, 22, o[15]), C, z, d, 5, o[16]), z = c(z, H, D, C, v, 9, o[17]), C = c(C, z, H, D, m, 14, o[18]), D = c(D, C, z, H, f, 20, o[19]), H = c(H, D, C, z, y, 5, o[20]), z = c(z, H, D, C, k, 9, o[21]), C = c(C, z, H, D, A, 14, o[22]), D = c(D, C, z, H, _, 20, o[23]), H = c(H, D, C, z, w, 5, o[24]), z = c(z, H, D, C, b, 9, o[25]), C = c(C, z, H, D, p, 14, o[26]), D = c(D, C, z, H, B, 20, o[27]), H = c(H, D, C, z, x, 5, o[28]), z = c(z, H, D, C, u, 9, o[29]), C = c(C, z, H, D, g, 14, o[30]), H = a(H, D = c(D, C, z, H, S, 20, o[31]), C, z, y, 4, o[32]), z = a(z, H, D, C, B, 11, o[33]), C = a(C, z, H, D, m, 16, o[34]), D = a(D, C, z, H, b, 23, o[35]), H = a(H, D, C, z, d, 4, o[36]), z = a(z, H, D, C, _, 11, o[37]), C = a(C, z, H, D, g, 16, o[38]), D = a(D, C, z, H, k, 23, o[39]), H = a(H, D, C, z, x, 4, o[40]), z = a(z, H, D, C, f, 11, o[41]), C = a(C, z, H, D, p, 16, o[42]), D = a(D, C, z, H, v, 23, o[43]), H = a(H, D, C, z, w, 4, o[44]), z = a(z, H, D, C, S, 11, o[45]), C = a(C, z, H, D, A, 16, o[46]), H = h(H, D = a(D, C, z, H, u, 23, o[47]), C, z, f, 6, o[48]), z = h(z, H, D, C, g, 10, o[49]), C = h(C, z, H, D, b, 15, o[50]), D = h(D, C, z, H, y, 21, o[51]), H = h(H, D, C, z, S, 6, o[52]), z = h(z, H, D, C, p, 10, o[53]), C = h(C, z, H, D, k, 15, o[54]), D = h(D, C, z, H, d, 21, o[55]), H = h(H, D, C, z, B, 6, o[56]), z = h(z, H, D, C, A, 10, o[57]), C = h(C, z, H, D, v, 15, o[58]), D = h(D, C, z, H, x, 21, o[59]), H = h(H, D, C, z, _, 6, o[60]), z = h(z, H, D, C, m, 10, o[61]), C = h(C, z, H, D, u, 15, o[62]), D = h(D, C, z, H, w, 21, o[63]), l[0] = l[0] + H | 0, l[1] = l[1] + D | 0, l[2] = l[2] + C | 0, l[3] = l[3] + z | 0 }, _doFinalize: function () { var e = this._data, r = e.words, i = 8 * this._nDataBytes, n = 8 * e.sigBytes; r[n >>> 5] |= 128 << 24 - n % 32; var o = t.floor(i / 4294967296); r[15 + (64 + n >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), r[14 + (64 + n >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (r.length + 1), this._process(); for (var s = (r = this._hash).words, c = 0; c < 4; c++) { var a = s[c]; s[c] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8) } return r }, clone: function () { var t = i.clone.call(this); return t._hash = this._hash.clone(), t } }), e.MD5 = i._createHelper(n), e.HmacMD5 = i._createHmacHelper(n) }(Math), O = (ut = (ft = vt).lib).WordArray, I = ut.Hasher, ut = ft.algo, U = [], ut = ut.SHA1 = I.extend({ _doReset: function () { this._hash = new O.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, e) { for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], c = r[4], a = 0; a < 80; a++) { a < 16 ? U[a] = 0 | t[e + a] : (h = U[a - 3] ^ U[a - 8] ^ U[a - 14] ^ U[a - 16], U[a] = h << 1 | h >>> 31); var h = (i << 5 | i >>> 27) + c + U[a]; h += a < 20 ? 1518500249 + (n & o | ~n & s) : a < 40 ? 1859775393 + (n ^ o ^ s) : a < 60 ? (n & o | n & s | o & s) - 1894007588 : (n ^ o ^ s) - 899497514, c = s, s = o, o = n << 30 | n >>> 2, n = i, i = h } r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + s | 0, r[4] = r[4] + c | 0 }, _doFinalize: function () { var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; return e[i >>> 5] |= 128 << 24 - i % 32, e[14 + (64 + i >>> 9 << 4)] = Math.floor(r / 4294967296), e[15 + (64 + i >>> 9 << 4)] = r, t.sigBytes = 4 * e.length, this._process(), this._hash }, clone: function () { var t = I.clone.call(this); return t._hash = this._hash.clone(), t } }), ft.SHA1 = I._createHelper(ut), ft.HmacSHA1 = I._createHmacHelper(ut), t = Math, i = (r = (e = vt).lib).WordArray, n = r.Hasher, r = e.algo, o = [], s = [], function () { function e(t) { return 4294967296 * (t - (0 | t)) | 0 } for (var r = 2, i = 0; i < 64;)!function (e) { for (var r = t.sqrt(e), i = 2; i <= r; i++)if (!(e % i)) return; return 1 }(r) || (i < 8 && (o[i] = e(t.pow(r, .5))), s[i] = e(t.pow(r, 1 / 3)), i++), r++ }(), c = [], r = r.SHA256 = n.extend({ _doReset: function () { this._hash = new i.init(o.slice(0)) }, _doProcessBlock: function (t, e) { for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], a = r[3], h = r[4], l = r[5], f = r[6], d = r[7], u = 0; u < 64; u++) { u < 16 ? c[u] = 0 | t[e + u] : (p = c[u - 15], _ = c[u - 2], c[u] = ((p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3) + c[u - 7] + ((_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10) + c[u - 16]); var p = i & n ^ i & o ^ n & o, _ = d + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & l ^ ~h & f) + s[u] + c[u]; d = f, f = l, l = h, h = a + _ | 0, a = o, o = n, n = i, i = _ + (((i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22)) + p) | 0 } r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + a | 0, r[4] = r[4] + h | 0, r[5] = r[5] + l | 0, r[6] = r[6] + f | 0, r[7] = r[7] + d | 0 }, _doFinalize: function () { var e = this._data, r = e.words, i = 8 * this._nDataBytes, n = 8 * e.sigBytes; return r[n >>> 5] |= 128 << 24 - n % 32, r[14 + (64 + n >>> 9 << 4)] = t.floor(i / 4294967296), r[15 + (64 + n >>> 9 << 4)] = i, e.sigBytes = 4 * r.length, this._process(), this._hash }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t } }), e.SHA256 = n._createHelper(r), e.HmacSHA256 = n._createHmacHelper(r), K = (nt = vt).lib.WordArray, X = (dt = nt.algo).SHA256, dt = dt.SHA224 = X.extend({ _doReset: function () { this._hash = new K.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]) }, _doFinalize: function () { var t = X._doFinalize.call(this); return t.sigBytes -= 4, t } }), nt.SHA224 = X._createHelper(dt), nt.HmacSHA224 = X._createHmacHelper(dt), function () { var t = vt, e = t.lib.Hasher, r = (n = t.x64).Word, i = n.WordArray, n = t.algo; function o() { return r.create.apply(r, arguments) } var s = [o(1116352408, 3609767458), o(1899447441, 602891725), o(3049323471, 3964484399), o(3921009573, 2173295548), o(961987163, 4081628472), o(1508970993, 3053834265), o(2453635748, 2937671579), o(2870763221, 3664609560), o(3624381080, 2734883394), o(310598401, 1164996542), o(607225278, 1323610764), o(1426881987, 3590304994), o(1925078388, 4068182383), o(2162078206, 991336113), o(2614888103, 633803317), o(3248222580, 3479774868), o(3835390401, 2666613458), o(4022224774, 944711139), o(264347078, 2341262773), o(604807628, 2007800933), o(770255983, 1495990901), o(1249150122, 1856431235), o(1555081692, 3175218132), o(1996064986, 2198950837), o(2554220882, 3999719339), o(2821834349, 766784016), o(2952996808, 2566594879), o(3210313671, 3203337956), o(3336571891, 1034457026), o(3584528711, 2466948901), o(113926993, 3758326383), o(338241895, 168717936), o(666307205, 1188179964), o(773529912, 1546045734), o(1294757372, 1522805485), o(1396182291, 2643833823), o(1695183700, 2343527390), o(1986661051, 1014477480), o(2177026350, 1206759142), o(2456956037, 344077627), o(2730485921, 1290863460), o(2820302411, 3158454273), o(3259730800, 3505952657), o(3345764771, 106217008), o(3516065817, 3606008344), o(3600352804, 1432725776), o(4094571909, 1467031594), o(275423344, 851169720), o(430227734, 3100823752), o(506948616, 1363258195), o(659060556, 3750685593), o(883997877, 3785050280), o(958139571, 3318307427), o(1322822218, 3812723403), o(1537002063, 2003034995), o(1747873779, 3602036899), o(1955562222, 1575990012), o(2024104815, 1125592928), o(2227730452, 2716904306), o(2361852424, 442776044), o(2428436474, 593698344), o(2756734187, 3733110249), o(3204031479, 2999351573), o(3329325298, 3815920427), o(3391569614, 3928383900), o(3515267271, 566280711), o(3940187606, 3454069534), o(4118630271, 4000239992), o(116418474, 1914138554), o(174292421, 2731055270), o(289380356, 3203993006), o(460393269, 320620315), o(685471733, 587496836), o(852142971, 1086792851), o(1017036298, 365543100), o(1126000580, 2618297676), o(1288033470, 3409855158), o(1501505948, 4234509866), o(1607167915, 987167468), o(1816402316, 1246189591)], c = []; (function () { for (var t = 0; t < 80; t++)c[t] = o() })(), n = n.SHA512 = e.extend({ _doReset: function () { this._hash = new i.init([new r.init(1779033703, 4089235720), new r.init(3144134277, 2227873595), new r.init(1013904242, 4271175723), new r.init(2773480762, 1595750129), new r.init(1359893119, 2917565137), new r.init(2600822924, 725511199), new r.init(528734635, 4215389547), new r.init(1541459225, 327033209)]) }, _doProcessBlock: function (t, e) { for (var r, i = (r = this._hash.words)[0], n = r[1], o = r[2], a = r[3], h = r[4], l = r[5], f = r[6], d = r[7], u = i.high, p = i.low, _ = n.high, y = n.low, v = o.high, g = o.low, B = a.high, w = a.low, k = h.high, m = h.low, S = l.high, x = l.low, b = f.high, A = f.low, H = d.high, z = u, C = p, D = _, E = y, R = v, M = g, F = B, P = w, W = k, O = m, I = S, U = x, K = b, X = A, L = H, j = r = d.low, T = 0; T < 80; T++) { var N, q, Z = c[T]; T < 16 ? (q = Z.high = 0 | t[e + 2 * T], N = Z.low = 0 | t[e + 2 * T + 1]) : (tt = (V = c[T - 15]).high, et = V.low, Q = (Y = c[T - 2]).high, J = Y.low, G = ($ = c[T - 7]).high, V = $.low, $ = (Y = c[T - 16]).high, q = (q = ((tt >>> 1 | et << 31) ^ (tt >>> 8 | et << 24) ^ tt >>> 7) + G + ((N = (G = (et >>> 1 | tt << 31) ^ (et >>> 8 | tt << 24) ^ (et >>> 7 | tt << 25)) + V) >>> 0 < G >>> 0 ? 1 : 0)) + ((Q >>> 19 | J << 13) ^ (Q << 3 | J >>> 29) ^ Q >>> 6) + ((N += et = (J >>> 19 | Q << 13) ^ (J << 3 | Q >>> 29) ^ (J >>> 6 | Q << 26)) >>> 0 < et >>> 0 ? 1 : 0), N += tt = Y.low, Z.high = q = q + $ + (N >>> 0 < tt >>> 0 ? 1 : 0), Z.low = N); var V = W & I ^ ~W & K, G = O & U ^ ~O & X, J = z & D ^ z & R ^ D & R, Q = (C >>> 28 | z << 4) ^ (C << 30 | z >>> 2) ^ (C << 25 | z >>> 7), Y = (et = s[T]).high, $ = et.low, tt = j + ((O >>> 14 | W << 18) ^ (O >>> 18 | W << 14) ^ (O << 23 | W >>> 9)), et = (Z = L + ((W >>> 14 | O << 18) ^ (W >>> 18 | O << 14) ^ (W << 23 | O >>> 9)) + (tt >>> 0 < j >>> 0 ? 1 : 0), Q + (C & E ^ C & M ^ E & M)); L = K, j = X, K = I, X = U, I = W, U = O, W = F + (Z = (Z = (Z = Z + V + ((tt += G) >>> 0 < G >>> 0 ? 1 : 0)) + Y + ((tt += $) >>> 0 < $ >>> 0 ? 1 : 0)) + q + ((tt += N) >>> 0 < N >>> 0 ? 1 : 0)) + ((O = P + tt | 0) >>> 0 < P >>> 0 ? 1 : 0) | 0, F = R, P = M, R = D, M = E, D = z, E = C, z = Z + (((z >>> 28 | C << 4) ^ (z << 30 | C >>> 2) ^ (z << 25 | C >>> 7)) + J + (et >>> 0 < Q >>> 0 ? 1 : 0)) + ((C = tt + et | 0) >>> 0 < tt >>> 0 ? 1 : 0) | 0 } p = i.low = p + C, i.high = u + z + (p >>> 0 < C >>> 0 ? 1 : 0), y = n.low = y + E, n.high = _ + D + (y >>> 0 < E >>> 0 ? 1 : 0), g = o.low = g + M, o.high = v + R + (g >>> 0 < M >>> 0 ? 1 : 0), w = a.low = w + P, a.high = B + F + (w >>> 0 < P >>> 0 ? 1 : 0), m = h.low = m + O, h.high = k + W + (m >>> 0 < O >>> 0 ? 1 : 0), x = l.low = x + U, l.high = S + I + (x >>> 0 < U >>> 0 ? 1 : 0), A = f.low = A + X, f.high = b + K + (A >>> 0 < X >>> 0 ? 1 : 0), r = d.low = r + j, d.high = H + L + (r >>> 0 < j >>> 0 ? 1 : 0) }, _doFinalize: function () { var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; return e[i >>> 5] |= 128 << 24 - i % 32, e[30 + (128 + i >>> 10 << 5)] = Math.floor(r / 4294967296), e[31 + (128 + i >>> 10 << 5)] = r, t.sigBytes = 4 * e.length, this._process(), this._hash.toX32() }, clone: function () { var t = e.clone.call(this); return t._hash = this._hash.clone(), t }, blockSize: 32 }), t.SHA512 = e._createHelper(n), t.HmacSHA512 = e._createHmacHelper(n) }(), L = (ut = (ft = vt).x64).Word, j = ut.WordArray, T = (ut = ft.algo).SHA512, ut = ut.SHA384 = T.extend({ _doReset: function () { this._hash = new j.init([new L.init(3418070365, 3238371032), new L.init(1654270250, 914150663), new L.init(2438529370, 812702999), new L.init(355462360, 4144912697), new L.init(1731405415, 4290775857), new L.init(2394180231, 1750603025), new L.init(3675008525, 1694076839), new L.init(1203062813, 3204075428)]) }, _doFinalize: function () { var t = T._doFinalize.call(this); return t.sigBytes -= 16, t } }), ft.SHA384 = T._createHelper(ut), ft.HmacSHA384 = T._createHmacHelper(ut), a = Math, f = (l = (h = vt).lib).WordArray, d = l.Hasher, u = h.x64.Word, l = h.algo, p = [], _ = [], y = [], function () { for (var t = 1, e = 0, r = 0; r < 24; r++) { p[t + 5 * e] = (r + 1) * (r + 2) / 2 % 64; var i = (2 * t + 3 * e) % 5; t = e % 5, e = i } for (t = 0; t < 5; t++)for (e = 0; e < 5; e++)_[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5; for (var n = 1, o = 0; o < 24; o++) { for (var s, c = 0, a = 0, h = 0; h < 7; h++)1 & n && ((s = (1 << h) - 1) < 32 ? a ^= 1 << s : c ^= 1 << s - 32), 128 & n ? n = n << 1 ^ 113 : n <<= 1; y[o] = u.create(c, a) } }(), v = [], function () { for (var t = 0; t < 25; t++)v[t] = u.create() }(), l = l.SHA3 = d.extend({ cfg: d.cfg.extend({ outputLength: 512 }), _doReset: function () { for (var t = this._state = [], e = 0; e < 25; e++)t[e] = new u.init; this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32 }, _doProcessBlock: function (t, e) { for (var r = this._state, i = this.blockSize / 2, n = 0; n < i; n++) { var o = t[e + 2 * n], s = t[e + 2 * n + 1]; o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8); (A = r[n]).high ^= s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), A.low ^= o } for (var c = 0; c < 24; c++) { for (var a = 0; a < 5; a++) { for (var h = 0, l = 0, f = 0; f < 5; f++)h ^= (A = r[a + 5 * f]).high, l ^= A.low; var d = v[a]; d.high = h, d.low = l } for (a = 0; a < 5; a++) { var u = v[(a + 4) % 5], g = (B = v[(a + 1) % 5]).high, B = B.low; for (h = u.high ^ (g << 1 | B >>> 31), l = u.low ^ (B << 1 | g >>> 31), f = 0; f < 5; f++)(A = r[a + 5 * f]).high ^= h, A.low ^= l } for (var w = 1; w < 25; w++) { var k = (A = r[w]).high, m = A.low, S = p[w]; l = S < 32 ? (h = k << S | m >>> 32 - S, m << S | k >>> 32 - S) : (h = m << S - 32 | k >>> 64 - S, k << S - 32 | m >>> 64 - S), (S = v[_[w]]).high = h, S.low = l } var x = v[0], b = r[0]; for (x.high = b.high, x.low = b.low, a = 0; a < 5; a++)for (f = 0; f < 5; f++) { var A = r[w = a + 5 * f], H = v[w], z = v[(a + 1) % 5 + 5 * f], C = v[(a + 2) % 5 + 5 * f]; A.high = H.high ^ ~z.high & C.high, A.low = H.low ^ ~z.low & C.low } A = r[0], b = y[c], A.high ^= b.high, A.low ^= b.low } }, _doFinalize: function () { var t = this._data, e = t.words, r = (this._nDataBytes, 8 * t.sigBytes), i = 32 * this.blockSize; e[r >>> 5] |= 1 << 24 - r % 32, e[(a.ceil((1 + r) / i) * i >>> 5) - 1] |= 128, t.sigBytes = 4 * e.length, this._process(); for (var n = this._state, o = (e = this.cfg.outputLength / 8) / 8, s = [], c = 0; c < o; c++) { var h = (l = n[c]).high, l = l.low; h = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8); s.push(l = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)), s.push(h) } return new f.init(s, e) }, clone: function () { for (var t = d.clone.call(this), e = t._state = this._state.slice(0), r = 0; r < 25; r++)e[r] = e[r].clone(); return t } }), h.SHA3 = d._createHelper(l), h.HmacSHA3 = d._createHmacHelper(l), N = (dt = (nt = vt).lib).WordArray, q = dt.Hasher, dt = nt.algo, Z = N.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), V = N.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), G = N.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), J = N.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), Q = N.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), Y = N.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), dt = dt.RIPEMD160 = q.extend({ _doReset: function () { this._hash = N.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, e) { for (var r, i, n, o, s = 0; s < 16; s++) { var c = e + s, a = t[c]; t[c] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8) } var h, l, f, d, u, p, _ = this._hash.words, y = Q.words, v = Y.words, g = Z.words, B = V.words, w = G.words, k = J.words, m = h = _[0], S = l = _[1], x = f = _[2], b = d = _[3], A = u = _[4]; for (s = 0; s < 80; s += 1)p = h + t[e + g[s]] | 0, p += s < 16 ? (l ^ f ^ d) + y[0] : s < 32 ? ((r = l) & f | ~r & d) + y[1] : s < 48 ? ((l | ~f) ^ d) + y[2] : s < 64 ? (l & (i = d) | f & ~i) + y[3] : (l ^ (f | ~d)) + y[4], p = (p = gt(p |= 0, w[s])) + u | 0, h = u, u = d, d = gt(f, 10), f = l, l = p, p = m + t[e + B[s]] | 0, p += s < 16 ? (S ^ (x | ~b)) + v[0] : s < 32 ? (S & (n = b) | x & ~n) + v[1] : s < 48 ? ((S | ~x) ^ b) + v[2] : s < 64 ? ((o = S) & x | ~o & b) + v[3] : (S ^ x ^ b) + v[4], p = (p = gt(p |= 0, k[s])) + A | 0, m = A, A = b, b = gt(x, 10), x = S, S = p; p = _[1] + f + b | 0, _[1] = _[2] + d + A | 0, _[2] = _[3] + u + m | 0, _[3] = _[4] + h + S | 0, _[4] = _[0] + l + x | 0, _[0] = p }, _doFinalize: function () { var t = this._data, e = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; e[i >>> 5] |= 128 << 24 - i % 32, e[14 + (64 + i >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), t.sigBytes = 4 * (e.length + 1), this._process(); for (var n = (e = this._hash).words, o = 0; o < 5; o++) { var s = n[o]; n[o] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8) } return e }, clone: function () { var t = q.clone.call(this); return t._hash = this._hash.clone(), t } }), nt.RIPEMD160 = q._createHelper(dt), nt.HmacRIPEMD160 = q._createHmacHelper(dt), ut = (ft = vt).lib.Base, $ = ft.enc.Utf8, ft.algo.HMAC = ut.extend({ init: function (t, e) { t = this._hasher = new t.init, "string" == typeof e && (e = $.parse(e)); var r = t.blockSize, i = 4 * r; (e = e.sigBytes > i ? t.finalize(e) : e).clamp(); t = this._oKey = e.clone(), e = this._iKey = e.clone(); for (var n = t.words, o = e.words, s = 0; s < r; s++)n[s] ^= 1549556828, o[s] ^= 909522486; t.sigBytes = e.sigBytes = i, this.reset() }, reset: function () { var t = this._hasher; t.reset(), t.update(this._iKey) }, update: function (t) { return this._hasher.update(t), this }, finalize: function (t) { var e = this._hasher; t = e.finalize(t); return e.reset(), e.finalize(this._oKey.clone().concat(t)) } }), ft = (dt = (nt = vt).lib).Base, tt = dt.WordArray, dt = (ut = nt.algo).SHA1, et = ut.HMAC, rt = ut.PBKDF2 = ft.extend({ cfg: ft.extend({ keySize: 4, hasher: dt, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, e) { for (var r = this.cfg, i = et.create(r.hasher, t), n = tt.create(), o = tt.create([1]), s = n.words, c = o.words, a = r.keySize, h = r.iterations; s.length < a;) { var l = i.update(e).finalize(o); i.reset(); for (var f = l.words, d = f.length, u = l, p = 1; p < h; p++) { u = i.finalize(u), i.reset(); for (var _ = u.words, y = 0; y < d; y++)f[y] ^= _[y] } n.concat(l), c[0]++ } return n.sigBytes = 4 * a, n } }), nt.PBKDF2 = function (t, e, r) { return rt.create(r).compute(t, e) }, dt = (ft = (ut = vt).lib).Base, it = ft.WordArray, ft = (nt = ut.algo).MD5, ot = nt.EvpKDF = dt.extend({ cfg: dt.extend({ keySize: 4, hasher: ft, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, e) { for (var r, i = this.cfg, n = i.hasher.create(), o = it.create(), s = o.words, c = i.keySize, a = i.iterations; s.length < c;) { r && n.update(r), r = n.update(t).finalize(e), n.reset(); for (var h = 1; h < a; h++)r = n.finalize(r), n.reset(); o.concat(r) } return o.sigBytes = 4 * c, o } }), ut.EvpKDF = function (t, e, r) { return ot.create(r).compute(t, e) }, vt.lib.Cipher || function () { var t = (u = vt).lib, e = t.Base, r = t.WordArray, i = t.BufferedBlockAlgorithm, n = ((h = u.enc).Utf8, h.Base64), o = u.algo.EvpKDF, s = t.Cipher = i.extend({ cfg: e.extend(), createEncryptor: function (t, e) { return this.create(this._ENC_XFORM_MODE, t, e) }, createDecryptor: function (t, e) { return this.create(this._DEC_XFORM_MODE, t, e) }, init: function (t, e, r) { this.cfg = this.cfg.extend(r), this._xformMode = t, this._key = e, this.reset() }, reset: function () { i.reset.call(this), this._doReset() }, process: function (t) { return this._append(t), this._process() }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (t) { return { encrypt: function (e, r, i) { return c(r).encrypt(t, e, r, i) }, decrypt: function (e, r, i) { return c(r).decrypt(t, e, r, i) } } } }); function c(t) { return "string" == typeof t ? p : d } t.StreamCipher = s.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var a = u.mode = {}, h = t.BlockCipherMode = e.extend({ createEncryptor: function (t, e) { return this.Encryptor.create(t, e) }, createDecryptor: function (t, e) { return this.Decryptor.create(t, e) }, init: function (t, e) { this._cipher = t, this._iv = e } }); h = a.CBC = ((a = h.extend()).Encryptor = a.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize; l.call(this, t, e, i), r.encryptBlock(t, e), this._prevBlock = t.slice(e, e + i) } }), a.Decryptor = a.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = t.slice(e, e + i); r.decryptBlock(t, e), l.call(this, t, e, i), this._prevBlock = n } }), a); function l(t, e, r) { var i, n = this._iv; n ? (i = n, this._iv = void 0) : i = this._prevBlock; for (var o = 0; o < r; o++)t[e + o] ^= i[o] } a = (u.pad = {}).Pkcs7 = { pad: function (t, e) { for (var i = (e = 4 * e) - t.sigBytes % e, n = i << 24 | i << 16 | i << 8 | i, o = [], s = 0; s < i; s += 4)o.push(n); e = r.create(o, i), t.concat(e) }, unpad: function (t) { var e = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= e } }; var f = (t.BlockCipher = s.extend({ cfg: s.cfg.extend({ mode: h, padding: a }), reset: function () { s.reset.call(this); var t, e = (r = this.cfg).iv, r = r.mode; this._xformMode == this._ENC_XFORM_MODE ? t = r.createEncryptor : (t = r.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == t ? this._mode.init(this, e && e.words) : (this._mode = t.call(r, this, e && e.words), this._mode.__creator = t) }, _doProcessBlock: function (t, e) { this._mode.processBlock(t, e) }, _doFinalize: function () { var t, e = this.cfg.padding; return this._xformMode == this._ENC_XFORM_MODE ? (e.pad(this._data, this.blockSize), t = this._process(!0)) : (t = this._process(!0), e.unpad(t)), t }, blockSize: 4 }), t.CipherParams = e.extend({ init: function (t) { this.mixIn(t) }, toString: function (t) { return (t || this.formatter).stringify(this) } })), d = (a = (u.format = {}).OpenSSL = { stringify: function (t) { var e = t.ciphertext; return (e = (t = t.salt) ? r.create([1398893684, 1701076831]).concat(t).concat(e) : e).toString(n) }, parse: function (t) { var e, i = n.parse(t); return 1398893684 == (t = i.words)[0] && 1701076831 == t[1] && (e = r.create(t.slice(2, 4)), t.splice(0, 4), i.sigBytes -= 16), f.create({ ciphertext: i, salt: e }) } }, t.SerializableCipher = e.extend({ cfg: e.extend({ format: a }), encrypt: function (t, e, r, i) { i = this.cfg.extend(i); e = (n = t.createEncryptor(r, i)).finalize(e); var n = n.cfg; return f.create({ ciphertext: e, key: r, iv: n.iv, algorithm: t, mode: n.mode, padding: n.padding, blockSize: t.blockSize, formatter: i.format }) }, decrypt: function (t, e, r, i) { return i = this.cfg.extend(i), e = this._parse(e, i.format), t.createDecryptor(r, i).finalize(e.ciphertext) }, _parse: function (t, e) { return "string" == typeof t ? e.parse(t, this) : t } })), u = (u.kdf = {}).OpenSSL = { execute: function (t, e, i, n) { return n = n || r.random(8), t = o.create({ keySize: e + i }).compute(t, n), i = r.create(t.words.slice(e), 4 * i), t.sigBytes = 4 * e, f.create({ key: t, iv: i, salt: n }) } }, p = t.PasswordBasedCipher = d.extend({ cfg: d.cfg.extend({ kdf: u }), encrypt: function (t, e, r, i) { return r = (i = this.cfg.extend(i)).kdf.execute(r, t.keySize, t.ivSize), i.iv = r.iv, (i = d.encrypt.call(this, t, e, r.key, i)).mixIn(r), i }, decrypt: function (t, e, r, i) { return i = this.cfg.extend(i), e = this._parse(e, i.format), r = i.kdf.execute(r, t.keySize, t.ivSize, e.salt), i.iv = r.iv, d.decrypt.call(this, t, e, r.key, i) } }) }(), vt.mode.CFB = ((dt = vt.lib.BlockCipherMode.extend()).Encryptor = dt.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize; Bt.call(this, t, e, i, r), this._prevBlock = t.slice(e, e + i) } }), dt.Decryptor = dt.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = t.slice(e, e + i); Bt.call(this, t, e, i, r), this._prevBlock = n } }), dt), vt.mode.CTR = (ut = (ft = vt.lib.BlockCipherMode.extend()).Encryptor = ft.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = this._iv, o = this._counter; n && (o = this._counter = n.slice(0), this._iv = void 0); var s = o.slice(0); r.encryptBlock(s, 0), o[i - 1] = o[i - 1] + 1 | 0; for (var c = 0; c < i; c++)t[e + c] ^= s[c] } }), ft.Decryptor = ut, ft), vt.mode.CTRGladman = (ut = (dt = vt.lib.BlockCipherMode.extend()).Encryptor = dt.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = this._iv, o = this._counter; n && (o = this._counter = n.slice(0), this._iv = void 0), 0 === ((n = o)[0] = wt(n[0])) && (n[1] = wt(n[1])); var s = o.slice(0); r.encryptBlock(s, 0); for (var c = 0; c < i; c++)t[e + c] ^= s[c] } }), dt.Decryptor = ut, dt), vt.mode.OFB = (ut = (ft = vt.lib.BlockCipherMode.extend()).Encryptor = ft.extend({ processBlock: function (t, e) { var r = this._cipher, i = r.blockSize, n = this._iv, o = this._keystream; n && (o = this._keystream = n.slice(0), this._iv = void 0), r.encryptBlock(o, 0); for (var s = 0; s < i; s++)t[e + s] ^= o[s] } }), ft.Decryptor = ut, ft), vt.mode.ECB = ((dt = vt.lib.BlockCipherMode.extend()).Encryptor = dt.extend({ processBlock: function (t, e) { this._cipher.encryptBlock(t, e) } }), dt.Decryptor = dt.extend({ processBlock: function (t, e) { this._cipher.decryptBlock(t, e) } }), dt), vt.pad.AnsiX923 = { pad: function (t, e) { var r = (r = t.sigBytes) + (e = (e = 4 * e) - r % e) - 1; t.clamp(), t.words[r >>> 2] |= e << 24 - r % 4 * 8, t.sigBytes += e }, unpad: function (t) { var e = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= e } }, vt.pad.Iso10126 = { pad: function (t, e) { e *= 4, e -= t.sigBytes % e, t.concat(vt.lib.WordArray.random(e - 1)).concat(vt.lib.WordArray.create([e << 24], 1)) }, unpad: function (t) { var e = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= e } }, vt.pad.Iso97971 = { pad: function (t, e) { t.concat(vt.lib.WordArray.create([2147483648], 1)), vt.pad.ZeroPadding.pad(t, e) }, unpad: function (t) { vt.pad.ZeroPadding.unpad(t), t.sigBytes-- } }, vt.pad.ZeroPadding = { pad: function (t, e) { e *= 4, t.clamp(), t.sigBytes += e - (t.sigBytes % e || e) }, unpad: function (t) { var e = t.words, r = t.sigBytes - 1; for (r = t.sigBytes - 1; 0 <= r; r--)if (e[r >>> 2] >>> 24 - r % 4 * 8 & 255) { t.sigBytes = r + 1; break } } }, vt.pad.NoPadding = { pad: function () { }, unpad: function () { } }, st = (ut = vt).lib.CipherParams, ct = ut.enc.Hex, ut.format.Hex = { stringify: function (t) { return t.ciphertext.toString(ct) }, parse: function (t) { return t = ct.parse(t), st.create({ ciphertext: t }) } }, B = (g = vt).lib.BlockCipher, w = g.algo, k = [], m = [], S = [], x = [], b = [], A = [], H = [], z = [], C = [], D = [], function () { for (var t = [], e = 0; e < 256; e++)t[e] = e < 128 ? e << 1 : e << 1 ^ 283; var r = 0, i = 0; for (e = 0; e < 256; e++) { var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4; k[r] = n = n >>> 8 ^ 255 & n ^ 99; var o = t[m[n] = r], s = t[o], c = t[s], a = 257 * t[n] ^ 16843008 * n; S[r] = a << 24 | a >>> 8, x[r] = a << 16 | a >>> 16, b[r] = a << 8 | a >>> 24, A[r] = a, H[n] = (a = 16843009 * c ^ 65537 * s ^ 257 * o ^ 16843008 * r) << 24 | a >>> 8, z[n] = a << 16 | a >>> 16, C[n] = a << 8 | a >>> 24, D[n] = a, r ? (r = o ^ t[t[t[c ^ o]]], i ^= t[t[i]]) : r = i = 1 } }(), E = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], w = w.AES = B.extend({ _doReset: function () { if (!this._nRounds || this._keyPriorReset !== this._key) { for (var t = this._keyPriorReset = this._key, e = t.words, r = t.sigBytes / 4, i = 4 * (1 + (this._nRounds = 6 + r)), n = this._keySchedule = [], o = 0; o < i; o++)o < r ? n[o] = e[o] : (a = n[o - 1], o % r ? 6 < r && o % r == 4 && (a = k[a >>> 24] << 24 | k[a >>> 16 & 255] << 16 | k[a >>> 8 & 255] << 8 | k[255 & a]) : (a = k[(a = a << 8 | a >>> 24) >>> 24] << 24 | k[a >>> 16 & 255] << 16 | k[a >>> 8 & 255] << 8 | k[255 & a], a ^= E[o / r | 0] << 24), n[o] = n[o - r] ^ a); for (var s = this._invKeySchedule = [], c = 0; c < i; c++) { var a; o = i - c; a = c % 4 ? n[o] : n[o - 4], s[c] = c < 4 || o <= 4 ? a : H[k[a >>> 24]] ^ z[k[a >>> 16 & 255]] ^ C[k[a >>> 8 & 255]] ^ D[k[255 & a]] } } }, encryptBlock: function (t, e) { this._doCryptBlock(t, e, this._keySchedule, S, x, b, A, k) }, decryptBlock: function (t, e) { var r = t[e + 1]; t[e + 1] = t[e + 3], t[e + 3] = r, this._doCryptBlock(t, e, this._invKeySchedule, H, z, C, D, m), r = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = r }, _doCryptBlock: function (t, e, r, i, n, o, s, c) { for (var a = this._nRounds, h = t[e] ^ r[0], l = t[e + 1] ^ r[1], f = t[e + 2] ^ r[2], d = t[e + 3] ^ r[3], u = 4, p = 1; p < a; p++) { var _ = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & d] ^ r[u++], y = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[d >>> 8 & 255] ^ s[255 & h] ^ r[u++], v = i[f >>> 24] ^ n[d >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ r[u++], g = i[d >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ r[u++]; h = _, l = y, f = v, d = g } _ = (c[h >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[f >>> 8 & 255] << 8 | c[255 & d]) ^ r[u++], y = (c[l >>> 24] << 24 | c[f >>> 16 & 255] << 16 | c[d >>> 8 & 255] << 8 | c[255 & h]) ^ r[u++], v = (c[f >>> 24] << 24 | c[d >>> 16 & 255] << 16 | c[h >>> 8 & 255] << 8 | c[255 & l]) ^ r[u++], g = (c[d >>> 24] << 24 | c[h >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & f]) ^ r[u++], t[e] = _, t[e + 1] = y, t[e + 2] = v, t[e + 3] = g }, keySize: 8 }), g.AES = B._createHelper(w), function () { var t = vt, e = (i = t.lib).WordArray, r = i.BlockCipher, i = t.algo, n = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], o = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], s = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], c = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }], a = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], h = i.DES = r.extend({ _doReset: function () { for (var t = this._key.words, e = [], r = 0; r < 56; r++) { var i = n[r] - 1; e[r] = t[i >>> 5] >>> 31 - i % 32 & 1 } for (var c = this._subKeys = [], a = 0; a < 16; a++) { var h = c[a] = [], l = s[a]; for (r = 0; r < 24; r++)h[r / 6 | 0] |= e[(o[r] - 1 + l) % 28] << 31 - r % 6, h[4 + (r / 6 | 0)] |= e[28 + (o[r + 24] - 1 + l) % 28] << 31 - r % 6; for (r = 1, h[0] = h[0] << 1 | h[0] >>> 31; r < 7; r++)h[r] = h[r] >>> 4 * (r - 1) + 3; h[7] = h[7] << 5 | h[7] >>> 27 } var f = this._invSubKeys = []; for (r = 0; r < 16; r++)f[r] = c[15 - r] }, encryptBlock: function (t, e) { this._doCryptBlock(t, e, this._subKeys) }, decryptBlock: function (t, e) { this._doCryptBlock(t, e, this._invSubKeys) }, _doCryptBlock: function (t, e, r) { this._lBlock = t[e], this._rBlock = t[e + 1], l.call(this, 4, 252645135), l.call(this, 16, 65535), f.call(this, 2, 858993459), f.call(this, 8, 16711935), l.call(this, 1, 1431655765); for (var i = 0; i < 16; i++) { for (var n = r[i], o = this._lBlock, s = this._rBlock, h = 0, d = 0; d < 8; d++)h |= c[d][((s ^ n[d]) & a[d]) >>> 0]; this._lBlock = s, this._rBlock = o ^ h } var u = this._lBlock; this._lBlock = this._rBlock, this._rBlock = u, l.call(this, 1, 1431655765), f.call(this, 8, 16711935), f.call(this, 2, 858993459), l.call(this, 16, 65535), l.call(this, 4, 252645135), t[e] = this._lBlock, t[e + 1] = this._rBlock }, keySize: 2, ivSize: 2, blockSize: 2 }); function l(t, e) { e = (this._lBlock >>> t ^ this._rBlock) & e, this._rBlock ^= e, this._lBlock ^= e << t } function f(t, e) { e = (this._rBlock >>> t ^ this._lBlock) & e, this._lBlock ^= e, this._rBlock ^= e << t } t.DES = r._createHelper(h), i = i.TripleDES = r.extend({ _doReset: function () { if (2 !== (i = this._key.words).length && 4 !== i.length && i.length < 6) throw Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192."); var t = i.slice(0, 2), r = i.length < 4 ? i.slice(0, 2) : i.slice(2, 4), i = i.length < 6 ? i.slice(0, 2) : i.slice(4, 6); this._des1 = h.createEncryptor(e.create(t)), this._des2 = h.createEncryptor(e.create(r)), this._des3 = h.createEncryptor(e.create(i)) }, encryptBlock: function (t, e) { this._des1.encryptBlock(t, e), this._des2.decryptBlock(t, e), this._des3.encryptBlock(t, e) }, decryptBlock: function (t, e) { this._des3.decryptBlock(t, e), this._des2.encryptBlock(t, e), this._des1.decryptBlock(t, e) }, keySize: 6, ivSize: 2, blockSize: 2 }), t.TripleDES = r._createHelper(i) }(), function () { var t = vt, e = t.lib.StreamCipher, r = t.algo, i = r.RC4 = e.extend({ _doReset: function () { for (var t = this._key, e = t.words, r = t.sigBytes, i = this._S = [], n = 0; n < 256; n++)i[n] = n; n = 0; for (var o = 0; n < 256; n++) { var s = e[(s = n % r) >>> 2] >>> 24 - s % 4 * 8 & 255; o = (o + i[n] + s) % 256, s = i[n]; i[n] = i[o], i[o] = s } this._i = this._j = 0 }, _doProcessBlock: function (t, e) { t[e] ^= n.call(this) }, keySize: 8, ivSize: 0 }); function n() { for (var t = this._S, e = this._i, r = this._j, i = 0, n = 0; n < 4; n++) { r = (r + t[e = (e + 1) % 256]) % 256; var o = t[e]; t[e] = t[r], t[r] = o, i |= t[(t[e] + t[r]) % 256] << 24 - 8 * n } return this._i = e, this._j = r, i } t.RC4 = e._createHelper(i), r = r.RC4Drop = i.extend({ cfg: i.cfg.extend({ drop: 192 }), _doReset: function () { i._doReset.call(this); for (var t = this.cfg.drop; 0 < t; t--)n.call(this) } }), t.RC4Drop = e._createHelper(r) }(), dt = (ft = vt).lib.StreamCipher, ut = ft.algo, at = [], ht = [], lt = [], ut = ut.Rabbit = dt.extend({ _doReset: function () { for (var t = this._key.words, e = this.cfg.iv, r = 0; r < 4; r++)t[r] = 16711935 & (t[r] << 8 | t[r] >>> 24) | 4278255360 & (t[r] << 24 | t[r] >>> 8); var i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]]; for (r = this._b = 0; r < 4; r++)kt.call(this); for (r = 0; r < 8; r++)n[r] ^= i[r + 4 & 7]; if (e) { var o, s = (e = 16711935 & ((s = (o = e.words)[0]) << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)) >>> 16 | 4294901760 & (o = 16711935 & ((c = o[1]) << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)), c = o << 16 | 65535 & e; for (n[0] ^= e, n[1] ^= s, n[2] ^= o, n[3] ^= c, n[4] ^= e, n[5] ^= s, n[6] ^= o, n[7] ^= c, r = 0; r < 4; r++)kt.call(this) } }, _doProcessBlock: function (t, e) { var r = this._X; kt.call(this), at[0] = r[0] ^ r[5] >>> 16 ^ r[3] << 16, at[1] = r[2] ^ r[7] >>> 16 ^ r[5] << 16, at[2] = r[4] ^ r[1] >>> 16 ^ r[7] << 16, at[3] = r[6] ^ r[3] >>> 16 ^ r[1] << 16; for (var i = 0; i < 4; i++)at[i] = 16711935 & (at[i] << 8 | at[i] >>> 24) | 4278255360 & (at[i] << 24 | at[i] >>> 8), t[e + i] ^= at[i] }, blockSize: 4, ivSize: 2 }), ft.Rabbit = dt._createHelper(ut), dt = (ft = vt).lib.StreamCipher, ut = ft.algo, pt = [], _t = [], yt = [], ut = ut.RabbitLegacy = dt.extend({ _doReset: function () { for (var t = this._key.words, e = this.cfg.iv, r = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], i = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]], n = this._b = 0; n < 4; n++)mt.call(this); for (n = 0; n < 8; n++)i[n] ^= r[n + 4 & 7]; if (e) { var o, s = (e = 16711935 & ((s = (o = e.words)[0]) << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)) >>> 16 | 4294901760 & (o = 16711935 & ((t = o[1]) << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8)); t = o << 16 | 65535 & e; for (i[0] ^= e, i[1] ^= s, i[2] ^= o, i[3] ^= t, i[4] ^= e, i[5] ^= s, i[6] ^= o, i[7] ^= t, n = 0; n < 4; n++)mt.call(this) } }, _doProcessBlock: function (t, e) { var r = this._X; mt.call(this), pt[0] = r[0] ^ r[5] >>> 16 ^ r[3] << 16, pt[1] = r[2] ^ r[7] >>> 16 ^ r[5] << 16, pt[2] = r[4] ^ r[1] >>> 16 ^ r[7] << 16, pt[3] = r[6] ^ r[3] >>> 16 ^ r[1] << 16; for (var i = 0; i < 4; i++)pt[i] = 16711935 & (pt[i] << 8 | pt[i] >>> 24) | 4278255360 & (pt[i] << 24 | pt[i] >>> 8), t[e + i] ^= pt[i] }, blockSize: 4, ivSize: 2 }), ft.RabbitLegacy = dt._createHelper(ut), vt }));
//Codigo
if (!!document.querySelector("form")) activarValidadores(document.querySelector("form"));
function limpiarForm(e,time) {
    if(!!time){
        setTimeout(()=>{
            e &&
                e.querySelectorAll("input,select,textarea,ng-select").forEach((e) => {
                    if ("false" != e.dataset.clean) {
                        if ("checkbox" == e?.type?.toLocaleLowerCase()) {
                            e.checked = !1;
                            return;
                        }
                        if ("SELECT" == e.tagName.toUpperCase()) {
                            if (((e.selectedIndex = 0), e.classList.remove("is-invalid"), limpiarSelect(e), $(e).data("select2"))) {
                                $(e).val(e.options[0]?.value).trigger("change"), e.parentElement.querySelector("span.is-invalid")?.classList.remove("is-invalid");
                                return;
                            }
                        } else (e.value = ""), e.classList.remove("is-invalid"), e.dataset.value && (e.value = e.dataset.value);
                    }
                });
        },time);
    }else{
        e &&
        e.querySelectorAll("input,select,textarea,ng-select").forEach((e) => {
            if ("false" != e.dataset.clean) {
                if ("checkbox" == e?.type?.toLocaleLowerCase()) {
                    e.checked = !1;
                    return;
                }
                if ("SELECT" == e.tagName.toUpperCase()) {
                    if (((e.selectedIndex = 0), e.classList.remove("is-invalid"), limpiarSelect(e), $(e).data("select2"))) {
                        $(e).val(e.options[0]?.value).trigger("change"), e.parentElement.querySelector("span.is-invalid")?.classList.remove("is-invalid");
                        return;
                    }
                } else (e.value = ""), e.classList.remove("is-invalid"), e.dataset.value && (e.value = e.dataset.value);
            }
        });
    }
};

function activarValidadores(e) {
    if (!e) {
        console.error("No se ha enviado ning\xfan form");
        return;
    }

    e.querySelectorAll("ng-select").forEach(item=>{
      let t = e.dataset.validate;
      if(!t){
        const options = {
          attributes: true
        }
        function callback(mutationList) {
          if(mutationList.length==1){
            mutationList.forEach(function(mutation) {
              if (mutation.target.classList.contains("ng-has-value")) {
                item.classList.remove("is-invalid");
              }else{
                  item.classList.add("is-invalid");
              }
            });
          }
        }
        const observer = new MutationObserver(callback);
        observer.observe(item.querySelector(".ng-select-container"), options)
      }

    });
    e.querySelectorAll("input,select,textarea").forEach((e) => {
        let t = e.dataset.validate;
        if ("no-validate" != t) {
            if (
                !t &&
                (e.addEventListener("keyup", () => {
                    validarVacio(e);
                }),
                    "select" == e.tagName.toLocaleLowerCase() || "file" == e.type.toLocaleLowerCase() || e.type.toLocaleLowerCase().indexOf("date") >= 0)
            ) {
                e.addEventListener("change", () => {
                    validarVacio(e);
                });
                let _ = e.classList.contains("select2-hidden-accessible");
                _ &&
                    $(e).on("select2:select", function (t) {
                        validarVacio(e);
                    });
            }
            t?.split(",").length > 0 ?
                t.split(",").forEach((t) => {
                    "cedula" == t &&
                        e.addEventListener("keyup", () => {
                            validarCedula(e);
                        }),
                        "ruc" == t &&
                        e.addEventListener("keyup", () => {
                            validarRuc(e);
                        }),
                        "email" == t &&
                        e.addEventListener("keyup", () => {
                            validarEmail(e);
                        }),
                        "no-espacios" == t &&
                        e.addEventListener("keyup", () => {
                            noEspacios(e);
                        }),
                        "minusculas" == t &&
                        e.addEventListener("keyup", () => {
                            minusculas(e);
                        }),
                        "mayusculas" == t &&
                        e.addEventListener("keyup", () => {
                            mayusculas(e);
                        }),
                        "numeros" == t &&
                        e.addEventListener("keyup", () => {
                            soloNumeros(e);
                        }),
                        "numeros-no-cero" == t &&
                        e.addEventListener("keyup", () => {
                            soloNumerosNoCero(e);
                        }),
                        "letras" == t &&
                        e.addEventListener("keyup", () => {
                            soloLetras(e);
                        }),
                        "clave" == t &&
                        e.addEventListener("keyup", () => {
                            validarClave(e);
                        }),
                        "decimal" == t &&
                        (e.addEventListener("input", () => {
                            parseToDecimal(e);
                        }),
                            e.addEventListener("keyup", () => {
                                decimal(e);
                            }));
                }) :
                "cedula" == t &&
                e.addEventListener("keyup", () => {
                    validarCedula(e);
                }),
                "ruc" == t &&
                e.addEventListener("keyup", () => {
                    validarRuc(e);
                }),
                "email" == t &&
                e.addEventListener("keyup", () => {
                    validarEmail(e);
                }),
                "no-espacios" == t &&
                e.addEventListener("keyup", () => {
                    noEspacios(e);
                }),
                "minusculas" == t &&
                e.addEventListener("keyup", () => {
                    minusculas(e);
                }),
                "mayusculas" == t &&
                e.addEventListener("keyup", () => {
                    mayusculas(e);
                }),
                "numeros" == t &&
                e.addEventListener("keyup", () => {
                    soloNumeros(e);
                }),
                "numeros-no-cero" == t &&
                e.addEventListener("keyup", () => {
                    soloNumerosNoCero(e);
                }),
                "letras" == t &&
                e.addEventListener("keyup", () => {
                    soloLetras(e);
                }),
                "clave" == t &&
                e.addEventListener("keyup", () => {
                    validarClave(e);
                }),
                "decimal" == t &&
                (e.addEventListener("input", () => {
                    parseToDecimal(e);
                }),
                    e.addEventListener("keyup", () => {
                        decimal(e);
                    }));
        }
    });
}

function noEspacios(e) {
    e.value = e.value.replaceAll(" ", "");
}

function minusculas(e) {
    e.value = e.value.toLocaleLowerCase();
}

function mayusculas(e) {
    e.value = e.value.toUpperCase();
}

function limpiarSelect(e) {
    try {
        let t = $(e)[0].selectize;
        if (!t) return;
        let _ = Object.keys(t.options)[0];
        t.setValue(_, !1), e.classList.remove("is-invalid");
    } catch (i) {
        console.warn(`limpiarSelectize: ${i.message}`);
    }
}

function cargarFormulario(e, t) {
    try {

        if (!t) throw Error("No se han enviado los datos o el form");
        limpiarForm(e),
            Object.keys(t).forEach((_) => {
                let i = e.querySelector(`#${_}`);
                if (i) {
                    if (!t[_]) return;
                    if ("checkbox" == i.type) {
                        !0 == t[_] ? (i.checked = !0) : (i.checked = !1);
                        return;
                    }
                    let r = $(i)[0].selectize;
                    if (r) {
                        setValueSelect(r, t[_]);
                        return;
                    }
                    if (((i.value = t[_]), $(i).data("select2"))) {
                        $(i).val(t[_]).trigger("change");
                        return;
                    }
                    if (i.dataset.validate == "decimal") i.value = i.value.replaceAll(".", ",");
                    "date" == i.getAttribute("type") && (i.value = t[_].split("T")[0]), "datetime-local" == i.getAttribute("type") && (i.value = t[_].replaceAll("T", " "));
                }
            });
    } catch (_) {
        console.warn(`${_.message}`);
    }
};

function cargarFormularioInForm(e, t) {
    try {
        if (!t) throw Error("No se han enviado los datos o el form");
        limpiarForm(e),
            Object.keys(t).forEach((_) => {
                let i = e.querySelector(`#${_}`);
                if (i) {
                    if (!t[_]) return;
                    if ("checkbox" == i.type) {
                        !0 == t[_] ? (i.checked = !0) : (i.checked = !1);
                        return;
                    }
                    let r = $(i)[0].selectize;
                    if (r) {
                        setValueSelect(r, t[_]);
                        return;
                    }
                    if (((i.value = t[_]), $(i).data("select2"))) {
                        $(i).val(t[_]).trigger("change");
                        return;
                    }
                    if (i.dataset.validate == "decimal") i.value = i.value.replaceAll(".", ",");
                    "date" == i.getAttribute("type") && (i.value = t[_].split("T")[0]), "datetime-local" == i.getAttribute("type") && (i.value = t[_].replaceAll("T", " "));
                }
            });
    } catch (_) {
        console.warn(`${_.message}`);
    }
};

function cargarFormularioInFormNoSelect2(e, t) {
    try {
        if (!t) throw Error("No se han enviado los datos o el form");
        limpiarForm(e),
            Object.keys(t).forEach((_) => {
                let i = e.querySelector(`#${_}`);
                if (i) {
                    if (!t[_]) return;
                    if ("checkbox" == i.type) {
                        !0 == t[_] ? (i.checked = !0) : (i.checked = !1);
                        return;
                    }
                    let r = $(i)[0].selectize;
                    if (r) {
                        setValueSelect(r, t[_]);
                        return;
                    }
                    if (i.dataset.validate == "decimal") i.value = i.value.replaceAll(".", ",");
                    (i.value = t[_]), "date" == i.getAttribute("type") && (i.value = t[_].split("T")[0]), "datetime-local" == i.getAttribute("type") && (i.value = t[_].replaceAll("T", " "));
                }
            });
    } catch (_) {
        console.warn(`${_.message}`);
    }
};
function validarVacio(e) {
    return new Promise((t) => {
        try {
            if ((e.classList.remove("is-invalid"), "SELECT" == e.tagName)) {
                let _ = document.querySelector(`#${e.getAttribute("id")}-ts-control`);
                if (_) {
                    _.parentElement?.classList.remove("is-invalid");
                    let i = _.parentElement.querySelector("div[data-value]");
                    if (!i) throw (_.parentElement?.classList.add("is-invalid"), Error("false1"));
                }
                let r = e.classList.contains("select2-hidden-accessible");
                if (r && (e.parentElement.querySelector(".select2-container")?.classList.remove("is-invalid"), !e.value))
                    throw (e.classList.add("is-invalid"), e.parentElement.querySelector(".select2-container")?.classList.add("is-invalid"), Error("false2"));
            }
            if ("" == e.value.trim() && (e.classList.add("is-invalid"), 0 > e.getAttribute("id").search("ts-control"))) throw Error(e);
            t(!0);
        } catch (a) {
            t(!1);
        }
    })
};

function parseToDecimal(e) {
    (e.value = e.value.replace(/(?!^[\-\d\,.])[^\d\\d\,.]/g, "")),
        (e.value = e.value.replaceAll("d", "")),
        (e.value = e.value.replaceAll("D", "")),
        (e.value = e.value.replaceAll(".", ",")),
        e.value.split(",").length > 2 && (e.value = e.value.substring(0, e.value.length - 1));
};
async function validarCedula(e) {
    let t,
        _ = e.parentElement.querySelector(".invalid-feedback");
    try {
        t = new Promise((t) => {
            (_.innerHTML = "* Campo requerido"), e.classList.remove("is-invalid");
            let i = e.value;
            if ("" == i.trim() || ((_.innerHTML = "* C\xe9dula inv\xe1lida"), 10 != i.length)) {
                e.classList.add("is-invalid"), t(!1);
                return;
            }
            let r = 0;
            for (let a = 0; a < i.length; a++) i[a] == i[0] && r++;
            if (r > 7) {
                e.classList.add("is-invalid"), t(!1);
                return;
            }
            var n = i.substring(0, 2);
            if (n >= 1 && n <= 24) {
                var s = i.substring(9, 10),
                    o = parseInt(i.substring(1, 2)) + parseInt(i.substring(3, 4)) + parseInt(i.substring(5, 6)) + parseInt(i.substring(7, 8)),
                    l = i.substring(0, 1),
                    l = 2 * l;
                if (l > 9) var l = l - 9;
                var c = i.substring(2, 3),
                    c = 2 * c;
                if (c > 9) var c = c - 9;
                var d = i.substring(4, 5),
                    d = 2 * d;
                if (d > 9) var d = d - 9;
                var u = i.substring(6, 7),
                    u = 2 * u;
                if (u > 9) var u = u - 9;
                var h = i.substring(8, 9),
                    h = 2 * h;
                if (h > 9) var h = h - 9;
                var f,
                    v = l + c + d + u + h,
                    p = o + v,
                    y = String(p).substring(0, 1),
                    g = (parseInt(y) + 1) * 10 - p;
                if (10 == g) var g = 0;
                if (g == s) {
                    e.classList.remove("is-invalid"), t(!0);
                    return;
                }
                e.classList.add("is-invalid"), t(!1);
                return;
            }
            e.classList.add("is-invalid"), t(!1);
        });
    } catch (i) {
        console.log(i), (t = !1);
    }
    return await t;
};

async function validarRuc(e) {
    let t,
        _ = e.parentElement.querySelector(".invalid-feedback");
    try {
        t = new Promise((t) => {
            (_.innerHTML = "* Campo requerido"), e.classList.remove("is-invalid");
            let i = e.value;
            if ("" == i.trim() || ((_.innerHTML = "* Ruc inválido"), 13 != i.length)) {
                e.classList.add("is-invalid"), t(!1);
                return;
            }
            let r = 0;
            for (let a = 0; a < i.length; a++) i[a] == i[0] && r++;
            if (r > 7) {
                e.classList.add("is-invalid"), t(!1);
                return;
            }
            var n = i.substring(0, 2);
            if (n >= 1 && n <= 24) {
                var s = i.substring(9, 10),
                    o = parseInt(i.substring(1, 2)) + parseInt(i.substring(3, 4)) + parseInt(i.substring(5, 6)) + parseInt(i.substring(7, 8)),
                    l = i.substring(0, 1),
                    l = 2 * l;
                if (l > 9) var l = l - 9;
                var c = i.substring(2, 3),
                    c = 2 * c;
                if (c > 9) var c = c - 9;
                var d = i.substring(4, 5),
                    d = 2 * d;
                if (d > 9) var d = d - 9;
                var u = i.substring(6, 7),
                    u = 2 * u;
                if (u > 9) var u = u - 9;
                var h = i.substring(8, 9),
                    h = 2 * h;
                if (h > 9) var h = h - 9;
                var f,
                    v = l + c + d + u + h,
                    p = o + v,
                    y = String(p).substring(0, 1),
                    g = (parseInt(y) + 1) * 10 - p;
                if (10 == g) var g = 0;
                if (g == s) {
                    e.classList.remove("is-invalid"), t(!0);
                    return;
                }
                e.classList.add("is-invalid"), t(!1);
                return;
            }
            e.classList.add("is-invalid"), t(!1);
        });
    } catch (i) {
        console.log(i), (t = !1);
    }
    return await t;
};

function validarEmail(e) {
    return new Promise((t) => {
        let _ = !0,
            i = e.parentElement.querySelector(".invalid-feedback");
        if ((e.classList.remove("is-invalid"), "" == e.value.trim())) {
            (i.innerText = "* Campo requerido"), e.classList.add("is-invalid"), (_ = !1), t(!1);
            return;
        }
        i.innerText = "* Email inv\xe1lido";
        let r = e.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
        null == r && (e.classList.add("is-invalid"), (_ = !1)), t(_);
    })
};
function validarNoEspacios(e) {
    return new Promise((t) => {
        let _ = !0,
            i = e.parentElement.querySelector(".invalid-feedback");
        if ((e.classList.remove("is-invalid"), "" == e.value.trim())) {
            if (!!i) (i.innerText = "* Campo requerido");
            e.classList.add("is-invalid"), (_ = !1), t(!1);
            return;
        } else {
            t(1);
        }
    })
};
function decimal(e) {
    return new Promise((t) => {
        e.classList.remove("is-invalid");
        let _ = e.parentElement.querySelector(".invalid-feedback"),
            i = !0;
        _ && (_.innerText = "* Campo requerido"),
            "" == e.value.trim() && (e.classList.add("is-invalid"), (i = !1)),
            "" == e.value.split(",")[1] && (_ && (_.innerText = "* Valor inv\xe1lido"), e.classList.add("is-invalid"), (i = !1)),
            0 > parseFloat(e.value.replaceAll(",", ".")) && (_ && (_.innerText = "* M\xednimo 0"), e.classList.add("is-invalid"), (i = !1)),
            t(i);
    })
};
function soloNumeros(e) {
    return new Promise((t) => {
        e.classList.remove("is-invalid");
        (e.value = e.value.replace(/[a-zA-Z]/g, ""));
        (e.value = e.value.replaceAll(" ", ""));
        (e.value = e.value.replaceAll("-", ""));
        (e.value = e.value.replaceAll("d", ""));
        (e.value = e.value.replaceAll("D", ""));
        (e.value = e.value.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, ""));
        "" == e.value.trim() ? (e.classList.add("is-invalid"), t(!1)) : t(!0);
    })
};
function soloNumerosNoCero(e) {
    return new Promise((t) => {
        e.classList.remove("is-invalid"),
            (e.value = e.value.replace(/[a-zA-Z]/g, "")),
            (e.value = e.value.replaceAll(" ", "")),
            (e.value = e.value.replaceAll("-", "")),
            (e.value = e.value.replaceAll("d", "")),
            (e.value = e.value.replaceAll("D", "")),
            (e.value = e.value.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, "")),
            "" == e.value.trim() ? (e.classList.add("is-invalid"), t(!1)) : 0 == parseInt(e.value) ? (e.classList.add("is-invalid"), t(!1)) : ((e.value = parseInt(e.value)), t(!0));
    })
};
function soloLetras(e) {
    return new Promise((t) => {
        e.classList.remove("is-invalid"),
            (e.value = e.value.replace(/[0-9]/g, "")),
            // (e.value = e.value.replaceAll(" ", "")),
            (e.value = e.value.replaceAll("-", "")),
            (e.value = e.value.replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, "")),
            "" == e.value.trim() ? (e.classList.add("is-invalid"), t(!1)) : t(!0);
    })
};
function validarClave(e) {
    return new Promise((t) => {
        let _ = !0;
        e.classList.remove("is-invalid"), (e.value = e.value.replaceAll(" ", "")), "" == e.value.trim() && (e.classList.add("is-invalid"), (_ = !1));
        let i = document.getElementById("clave_confir"),
            r = document.getElementById("clave"),
            a = i.parentElement.querySelector(".invalid-feedback");
        (a.innerText = "* Campo requerido"),
            i.value != r.value && ((a.innerText = "* Las claves no coinciden"), i.classList.add("is-invalid"), (_ = !1)),
            "" == i.value && (i.classList.add("is-invalid"), (a.innerText = "* Campo requerido"), (_ = !1)),
            t(_);
    })
};
async function validarTodo(e) {
    return await new Promise(async (t) => {
        try {
            let _ = await todoVacios(e),
                i = await todoEmail(e),
                r = await todoCedulas(e),
                ru = await todoRucs(e),
                a = await todoNumeros(e),
                n = await todoNumerosNoCero(e),
                s = await todoLetras(e),
                o = await todoDecimales(e),
                l = await todoClaves(e),
                v = await todoNoEspacios(e);
            c = _ * i * r * a * l * o * s * n * v * ru;
            t(c > 0);
        } catch (_) {
            console.log(`${_}`);
        }
    });
};
async function todoVacios(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll("input:not([data-validate]):not([aria-autocomplete='list']),select:not([data-validate]),textarea:not([data-validate])");
                ng= e.querySelectorAll("ng-select:not([data-validate])");
                if(ng.length==0 && r.length==0){
                  t(!0);
                  return;
                }
                if(ng.length>0){
                  let ngSelectVeri=0;
                  ng.forEach(item=>{
                    if(!item.querySelector(".ng-select-container.ng-has-value")){
                      ngSelectVeri++;
                      item.classList.add("is-invalid");
                    }else{
                      item.classList.remove("is-invalid");
                    }
                  });
                  ngSelectVeri==0?t(!0):t(0);
                }
            r.forEach(async (e) => {
                (await validarVacio(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};
async function todoEmail(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="email"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await validarEmail(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};
async function todoNoEspacios(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="no-espacios"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await validarNoEspacios(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};
async function todoNumeros(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="numeros"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await soloNumeros(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};
async function todoNumerosNoCero(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="numeros-no-cero"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await soloNumerosNoCero(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};
async function todoLetras(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="letras"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await soloLetras(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};
async function todoDecimales(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="decimal"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await decimal(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};
async function todoCedulas(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="cedula"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await validarCedula(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};

async function todoRucs(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="ruc"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await validarRuc(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};

async function disableLogin(e) {
    e.querySelectorAll("input,select,button").forEach((e) => {
        e.disabled = !0;
    });
};
async function enableLogin(e) {
    e.querySelectorAll("input,select,button").forEach((e) => {
        e.disabled = !1;
    });
};
async function todoClaves(e) {
    let t;
    try {
        t = new Promise(async (t) => {
            let _ = !0,
                i = 0,
                r = e.querySelectorAll('input[data-validate="clave"]');
            if (0 == r.length) {
                t(!0);
                return;
            }
            r.forEach(async (e) => {
                (await validarClave(e)) || (_ = !1), i == r.length - 1 && t(_), i++;
            });
        });
    } catch (_) {
        console.log(`${_}`);
    }
    return await t;
};
async function parseHora(e) {
    return new Date(Date.parse(e)).toLocaleTimeString()
};
async function parseFecha(e) {
    return new Date(Date.parse(e)).toLocaleDateString()
};
async function controlarRangoFechas(e, t) {
    let _ = new Date().toISOString().split("T")[0];
    e?.setAttribute("min", _),
        t?.setAttribute("min", _),
        sessionStorage.removeItem("fechaDesde"),
        sessionStorage.removeItem("fechaHasta"),
        e?.addEventListener("change", (_) => {
            let i = _.target.parentElement.querySelector(".invalid-feedback");
            if ((i && (i.innerText = "* Campo requerido"), "" == _.target.value)) {
                sessionStorage.removeItem("fechaDesde"), _.target.classList.add("is-invalid");
                return;
            }
            _.target.classList.remove("is-invalid"), sessionStorage.setItem("fechaDesde", Date.parse(_.target.value));
            let r = sessionStorage.getItem("fechaDesde"),
                a = sessionStorage.getItem("fechaHasta");
            r && a && (a < r ? (i && (i.innerText = "* Fecha fuera de rango"), _.target.classList.add("is-invalid")) : (e?.classList.remove("is-invalid"), t?.classList.remove("is-invalid")));
        }),
        t?.addEventListener("change", (_) => {
            let i = _.target.parentElement.querySelector(".invalid-feedback");
            if ((i && (i.innerText = "* Campo requerido"), "" == _.target.value)) {
                sessionStorage.removeItem("fechaHasta"), _.target.classList.add("is-invalid");
                return;
            }
            _.target.classList.remove("is-invalid"), sessionStorage.setItem("fechaHasta", Date.parse(_.target.value));
            let r = sessionStorage.getItem("fechaDesde");
            sessionStorage.getItem("fechaHasta") < r ? (i && (i.innerText = "* Fecha fuera de rango"), _.target.classList.add("is-invalid")) : (e?.classList.remove("is-invalid"), t?.classList.remove("is-invalid"));
        });
};
function validarRangoFechas(e, t) {
    return new Promise((_) => {
        if (e && t) {
            if (Date.parse(t.value) < Date.parse(e.value)) {
                let i = e.parentElement.querySelector(".invalid-feedback");
                i && (i.innerText = "* Fechas fuera de rango"), e.classList.add("is-invalid"), t.classList.remove("is-invalid"), _(!1);
            } else {
                let r = e.parentElement.querySelector(".invalid-feedback");
                r && (r.innerText = "* Campo requerido"), e.classList.remove("is-invalid"), t.classList.remove("is-invalid"), _(!0);
            }
        } else console.log("No se han enviado los dos objetos de fecha requeridos"), _(!1);
    })
};

function getHoraFormat(e) {
    am_pm;
};

function bloquearBotones() {
    document.querySelectorAll("button,a").forEach((e) => {
        e.dataset.guardar && (e.innerHTML = "Espere..."), e.getAttribute("data-event") && ((e.dataset.buttonContent = e.innerHTML), (e.innerHTML = "Espere...")), e.classList.add("no-event"), e.setAttribute("disabled", "true");
    });
    document.querySelector("html").classList.add("_block");
};

function desbloquearBotones() {
    document.querySelectorAll("button,a").forEach((e) => {
        e.dataset.guardar && (e.innerHTML = "Guardar"), e.dataset.buttonContent && ((e.innerHTML = e.dataset.buttonContent), e.removeAttribute("data-button-content")), e.classList.remove("no-event"), e.removeAttribute("disabled");
    });
    document.querySelector("html").classList.remove("_block");
};

function limpiarSelect2(e) {
    try {
        e &&
            $(e).data("select2") &&
            ($(e).val(e.options[0]?.value).trigger("change"),
                setTimeout(() => {
                    e.classList.remove("is-invalid"), e.parentElement.querySelector("span.is-invalid")?.classList.remove("is-invalid");
                }, 19));
    } catch (t) {
        console.warn(t.message);
    }
};

function addAntiForgeryToken(e) {
    try {
        let t = document.querySelector("[name='__RequestVerificationToken']");
        if (!t) throw Error("addAntiForgeryToken: No se ha declarado el @Html.AntiForgeryToken() en el HTML");
        e.append("__RequestVerificationToken", t.value);
    } catch (_) {
        console.error(`addAntiForgeryToken: ${_.message}`);
    }
};

function copiarAlPortaPapeles(_mensaje) {
    navigator.clipboard.writeText(`${_mensaje.replaceAll("'", "").replaceAll('"', '').replaceAll("<br>", "\n").replaceAll("</b>", "\n")}`);
    toastSuccess("Texto copiado al portapapeles", "topCenter", 1009);
}
async function handleError(e) {
    try {
        if(e?.response?.data?.error?.indexOf("invalid_grant")>=0){
          toastError("Credenciales incorrectas");
          return;
        }
        if (e?.response?.status == 401) {
            toastError("Su sesión ha caducado.");
            if (typeof _logout === 'function') eval("_logout()");
            if (typeof __logout === 'function') eval("__logout()");
            return;
        }
        if (e?.response?.status == 403) {
            toastError("No tiene permisos para estar aquí.");
            return;
        }
        if (e?.response?.status == 404) {
            toastError(`<b>404:</b> ${e.response.request.responseURL}`);
            return;
        }
        if (e?.response?.status == 422) {
            let __mensaje = "";
            try {
                const __obj = e?.response?.data;
                __mensaje = __obj?.mensaje;
                const __keys = __obj?.elementos;
                if (__keys?.length > 0) {
                    __keys.forEach(item => {
                        let __el = document.querySelector(`#${item}`);
                        if (!!__el) __el.classList.add("is-invalid");
                    })
                }
            } catch (e) {
                __mensaje = "Ha ocurrido un error al validar los datos.";
                console.log(e);
            }
            toastHtml(`<div class='alert alert-danger'>
                       <button type='button' class='btn btn-link text-danger btn-sm px-1 py-0 mb-1'
                       style='font-size:12px !important;position:absolute;right:5px;top:5px;padding:2px 5px !important;'
                       onclick="copiarAlPortaPapeles('${__mensaje.replaceAll("'", "").replaceAll('"', '')}')"
                       title='copiar mensaje'
                       >
                       <i class='bi-clipboard-check-fill' style='color:#581541'></i>
                       </button>
                      <p class='mb-1' align='left' style='font-size:12px'>
                      <b class='mb-3'>Los siguientes datos ingresados no son validos:</b>
                      </p>
                       <p align='left' style='font-size:12px;user-select: all !important;'>
                       ${__mensaje}
                       </p>
                       <p class='mb-0 pb-0' style='font-size:10px'>
                       <i class='bi-exclamation-triangle-fill me-1'></i><b>Si el problema persiste comuniquese con soporte.</b>
                       </p>
                       </div>`, "Entendido");
            return;
        }
        if (e?.response?.status == 424) {
            toastHtml(`<div class='alert alert-danger'>
                       <button type='button' class='btn btn-link btn-sm px-1 py-0 mb-1'
                       style='font-size:12px !important;position:absolute;right:5px;top:5px;padding:2px 5px !important;'
                       onclick="copiarAlPortaPapeles('${e.request.response.replaceAll("'", "").replaceAll('"', '')}')"
                       title='copiar mensaje'
                       >
                       <i class='bi-clipboard-check-fill' style='color:#581541'></i>
                       </button>
                      <p class='mb-1' align='left' style='font-size:12px'>
                      <h3><i class='bi-database-x'></i></h3>
                      </p>
                       <p align='left' style='font-size:12px;user-select: all !important;'>
                       ${e.request.response}
                       </p>
                       <p class='mb-0 pb-0' style='font-size:10px'>
                       <i class='bi-exclamation-triangle-fill me-1'></i><b>Si el problema persiste comuniquese con soporte.</b>
                       </p>
                       </div>`, "Entendido");
            return;
        }
        if (!e.response?.data.detail && e.message) {
            e.response?.status ? toastError(`${e.response.request.response || e.code}`) : toastError(`${e.message}`);
            return;
        }
        let t = `${e.response ? `${e.response?.data.detail}` : `${e.message}`}`;
        e.message || e.response?.data.detail || (t = e), toastError(t);
    } catch (_) {
        console.log(_), console.error("Error");
    }
};

function limpiarValidadores(e) {
    e &&
        e.querySelectorAll("input,select,textarea").forEach((e) => {
            if ("SELECT" == e.tagName.toUpperCase()) {
                if ((e.classList.remove("is-invalid"), $(e).data("select2"))) {
                    e.parentElement.querySelector("span.is-invalid")?.classList.remove("is-invalid");
                    return;
                }
            } else e.classList.remove("is-invalid");
        });
};

function formToUpperCase(e) {
    e &&
        e.querySelectorAll("input,select,textarea").forEach((e) => {
            e.dataset?.validate == "email" || e.hasAttribute("password") || e.hasAttribute("no-uppercase") || (e.value = e.value.toUpperCase());
        });
};

function ocultarEventos() {
    document.querySelectorAll("[onclick]").forEach((item) => {
        let fn = item.getAttribute("onclick"),
            fnEncript = CryptoJS.AES.encrypt(fn, "juancarloslozadacastillo.!191989");
        item.removeAttribute("onclick"), (item.dataset.event = fnEncript), item.addEventListener("click", () => eval(fn));
    });
};

function toBase64(e) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(e));
};


function encriptar(texto) {
    return CryptoJS.AES.encrypt(texto.toString(),
    "Juancarloslozadacastillo.!191989", { iv: "1989" }).toString();
}

function desencriptar(textoEncriptado) {
    return CryptoJS.AES.decrypt(textoEncriptado?.replaceAll(" ", "+"), "Juancarloslozadacastillo.!191989", { iv: "1989" }).toString(CryptoJS.enc.Utf8);
}

function loaderShow(_texto) {
    try {
        const _element = document.createElement("span");
        _element.id = "__loader_jc_lc_191989";
        _element.innerHTML = `${_texto || "CARGANDO"}${"<div class='loader-atom'><div>"}`;
        // document.querySelector("body").append(_element);
        // const _p_el = _element.getBoundingClientRect();
        // let _b_el = document.elementsFromPoint(_p_el.x, _p_el.y);
        // if (_b_el.length >= 0) _b_el = _b_el.filter(x => x != _element)[0]
        // if (!!_b_el) {
        //     const _bg = window.getComputedStyle(_b_el)?.getPropertyValue("background-color");
        //     if (!!_bg) {
        //         const _rgba = [...(_bg.split("(")[1].split(")")[0]).split(",")];
        //         const luma = 0.2126 * parseInt(_rgba[0]) + 0.7152 * parseInt(_rgba[1]) + 0.0722 * parseInt(_rgba[0]);
        //         if (luma < 40) {
        //             _element.classList.add("light")
        //         }
        //     }
        // }
    } catch (e) {
        console.warn(e);
    } finally {
        bloquearBotones();
    }
};

function loaderHide() {
    try {
        const _element = document.querySelector("#__loader_jc_lc_191989");
        if (!!_element) _element.remove();
    } catch (e) {
        console.warn(e);
    } finally {
        desbloquearBotones();
    }
};
document.querySelectorAll("script").forEach((e) => {
    e.src = CryptoJS.AES.encrypt(e.src, "juancarloslozadacastillo.!191989");
});
window.addEventListener("load", () => ocultarEventos());

function disableForm(form) {
    form.querySelectorAll("input,select").forEach(item => {
        item.setAttribute("readonly", true);
    });
    form.querySelectorAll("button").forEach(item => {
        item.disabled = true;
    });
};

function disableFormNoButton(form) {
    form.querySelectorAll("input,select").forEach(item => {
        item.setAttribute("readonly", true);
    });
};

function enableForm(form) {
    form.querySelectorAll("input,select").forEach(item => {
        if (item.dataset.disabled != undefined) item.setAttribute("readonly", true);
        else item.removeAttribute("readonly");
    });
    form.querySelectorAll("button").forEach(item => {
        item.disabled = false;
    });
};

function limitarFechaInput(input, min, max) {
    try {
        if (!!min) {
            let fmin = new Date(Date.parse(min.split("T")[0]));
            fmin = fmin.toISOString().split("T")[0];
            input.setAttribute("min", fmin);
        }
        if (!!max) {
            let fmax = new Date(Date.parse(max.split("T")[0]));
            fmax = fmax.toISOString().split("T")[0];
            input.setAttribute("max", fmax);
        }
    } catch (e) {
        console.warn(`${e.message}`);
    }
};

const jsonHeaders = {
    headers: {
        'Content-Type': 'application/json'
    }
};
function getDateValue(_inputDate) {
    return moment(_inputDate.value, moment.ISO_8601)._d;
}

function getDateOnly() {
    let _f = new Date();
    _f.setHours(0, 0, 0, 0);
    return _f;
}

function crearPasswordPreview() {
    document.querySelectorAll("[type='password']").forEach(item => {
        item.addEventListener("keyup", () => {
            const element = document.querySelector(`#_pvw_${item.id}`);
            if (!element) {
                const elementHTML = `<a id="_pvw_${item.id}" href='javascript:;' onclick='__handlePasswordView("${item.id}")' tabindex="-1"
                style='position:sticky;float:right;margin-right:10px;margin-top:-28px;z-index:999'><i class='bi-eye-fill text-primary'></i></a>`;
                item.insertAdjacentHTML("afterend", elementHTML);
            } else {
                item.value == "" ? element.hidden = true : element.removeAttribute("hidden");
            }


        })
    });
}

function crearPasswordPreviewLogin() {
    document.querySelectorAll("[type='password']").forEach(item => {
        item.addEventListener("keyup", () => {
            const element = document.querySelector(`#_pvw_${item.id}`);
            if (!element) {
                const elementHTML = `<a id="_pvw_${item.id}" href='javascript:;' onclick='__handlePasswordView("${item.id}")' tabindex="-1"
              style='position:absolute;right:10px;top:8px;z-index:999'><i class='bi-eye-fill text-primary'></i></a>`;
                item.insertAdjacentHTML("afterend", elementHTML);
            } else {
                item.value == "" ? element.hidden = true : element.removeAttribute("hidden");
            }


        })
    });
}



function __handlePasswordView(item) {
    try {
        item = document.querySelector(`#${item}`);
        if (!item) return;
        const button = document.querySelector(`#_pvw_${item.id}`);
        if (!button) return;
        const icon = button.querySelector("i");
        if (!!icon && icon.classList.contains("bi-eye-fill")) {
            icon.classList.remove("bi-eye-fill");
            icon.classList.remove("text-primary");
            icon.classList.add("bi-eye-slash-fill");
            item.type = "text";
        } else {
            icon.classList.add("bi-eye-fill");
            icon.classList.add("text-primary");
            icon.classList.remove("bi-eye-slash-fill");
            item.type = "password";
        }
    } catch (e) {
        console.warn(e);
    }
}

function loaderDataTable() {
    return `<div class='loader-datatable-container'><div class="loader-datatable"></div></div>
    `;
}

function notFoundDataTable() {
    return "<p class='my-0'><i class='bi-database-exclamation fs-dt-lg not-found-data'></i></p><p class='fw-bold fc-dt'>No se encontraron resultados</p>";
}

function notDataDataTable() {
    return "<p class='my-0'><i class='bi-database fs-dt-lg not-found-data'></i></p><p class='fw-bold fc-dt'>Ningún registro disponible</p>";
}

function dataTableEs() {
    return {
    "processing": "Procesando...",
    "lengthMenu": "<span style='font-weight:400 !important;font-size:12px !important'>Mostrar</span> _MENU_ <span style='font-weight:400 !important;font-size:12px !important'>Registros</span>",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "<div class='dataTables-empty-container'><p class='my-0'><i class='bi-database-exclamation fs-dt-lg not-found-data'></i></p><p class='fw-bold fc-dt'>Ningún registro disponible</p></div>",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de <span>_MAX_</span> registros)",
    "search": "<span style='font-weight:400 !important;font-size:12x !important'>Búsqueda</span> ",
    "infoThousands": ",",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad",
        "collection": "Colección",
        "colvisRestore": "Restaurar visibilidad",
        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
        "copySuccess": {
            "1": "Copiada 1 fila al portapapeles",
            "_": "Copiadas %ds fila al portapapeles"
        },
        "copyTitle": "Copiar al portapapeles",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Mostrar todas las filas",
            "_": "Mostrar %d filas"
        },
        "pdf": "PDF",
        "print": "Imprimir",
        "renameState": "Cambiar nombre",
        "updateState": "Actualizar",
        "createState": "Crear Estado",
        "removeAllStates": "Remover Estados",
        "removeState": "Remover",
        "savedStates": "Estados Guardados",
        "stateRestore": "Estado %d"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Rellene todas las celdas con <i>%d<\/i>",
        "fillHorizontal": "Rellenar celdas horizontalmente",
        "fillVertical": "Rellenar celdas verticalmentemente"
    },
    "decimal": ",",
    "searchBuilder": {
        "add": "Añadir condición",
        "button": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "clearAll": "Borrar todo",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "notBetween": "No entre",
                "notEmpty": "No Vacio",
                "not": "Diferente de"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacio",
                "equals": "Igual a",
                "gt": "Mayor a",
                "gte": "Mayor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual que",
                "notBetween": "No entre",
                "notEmpty": "No vacío",
                "not": "Diferente de"
            },
            "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Igual a",
                "notEmpty": "No Vacio",
                "startsWith": "Empieza con",
                "not": "Diferente de",
                "notContains": "No Contiene",
                "notStartsWith": "No empieza con",
                "notEndsWith": "No termina con"
            },
            "array": {
                "not": "Diferente de",
                "equals": "Igual",
                "empty": "Vacío",
                "contains": "Contiene",
                "notEmpty": "No Vacío",
                "without": "Sin"
            }
        },
        "data": "Data",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle": "Criterios anulados",
        "logicAnd": "Y",
        "logicOr": "O",
        "rightTitle": "Criterios de sangría",
        "title": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Borrar todo",
        "collapse": {
            "0": "Paneles de búsqueda",
            "_": "Paneles de búsqueda (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sin paneles de búsqueda",
        "loadMessage": "Cargando paneles de búsqueda",
        "title": "Filtros Activos - %d",
        "showMessage": "Mostrar Todo",
        "collapseMessage": "Colapsar Todo"
    },
    "select": {
        "cells": {
            "1": "1 celda seleccionada",
            "_": "%d celdas seleccionadas"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnas seleccionadas"
        },
        "rows": {
            "1": "1 fila seleccionada",
            "_": "%d filas seleccionadas"
        }
    },
    "thousands": ".",
    "datetime": {
        "previous": "Anterior",
        "next": "Proximo",
        "hours": "Horas",
        "minutes": "Minutos",
        "seconds": "Segundos",
        "unknown": "-",
        "amPm": [
            "AM",
            "PM"
        ],
        "months": {
            "0": "Enero",
            "1": "Febrero",
            "10": "Noviembre",
            "11": "Diciembre",
            "2": "Marzo",
            "3": "Abril",
            "4": "Mayo",
            "5": "Junio",
            "6": "Julio",
            "7": "Agosto",
            "8": "Septiembre",
            "9": "Octubre"
        },
        "weekdays": [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
        ]
    },
    "editor": {
        "close": "Cerrar",
        "create": {
            "button": "Nuevo",
            "title": "Crear Nuevo Registro",
            "submit": "Crear"
        },
        "edit": {
            "button": "Editar",
            "title": "Editar Registro",
            "submit": "Actualizar"
        },
        "remove": {
            "button": "Eliminar",
            "title": "Eliminar Registro",
            "submit": "Eliminar",
            "confirm": {
                "_": "¿Está seguro que desea eliminar %d filas?",
                "1": "¿Está seguro que desea eliminar 1 fila?"
            }
        },
        "error": {
            "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
        },
        "multi": {
            "title": "Múltiples Valores",
            "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
            "restore": "Deshacer Cambios",
            "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
        }
    },
    "info": "Mostrando <span>_START_</span> a <span>_END_</span> de <span>_TOTAL_</span> registros",
    "stateRestore": {
        "creationModal": {
            "button": "Crear",
            "name": "Nombre:",
            "order": "Clasificación",
            "paging": "Paginación",
            "search": "Busqueda",
            "select": "Seleccionar",
            "columns": {
                "search": "Búsqueda de Columna",
                "visible": "Visibilidad de Columna"
            },
            "title": "Crear Nuevo Estado",
            "toggleLabel": "Incluir:"
        },
        "emptyError": "El nombre no puede estar vacio",
        "removeConfirm": "¿Seguro que quiere eliminar este %s?",
        "removeError": "Error al eliminar el registro",
        "removeJoiner": "y",
        "removeSubmit": "Eliminar",
        "renameButton": "Cambiar Nombre",
        "renameLabel": "Nuevo nombre para %s",
        "duplicateError": "Ya existe un Estado con este nombre.",
        "emptyStates": "No hay Estados guardados",
        "removeTitle": "Remover Estado",
        "renameTitle": "Cambiar Nombre Estado"
    }
}
};

function select2(select, dropdownParent) {
    if (!!dropdownParent) {
        $(`#${select}`).select2({
            dropdownParent: $(dropdownParent)
        });
    } else {
        $(`#${select}`).select2();
    }
}

function validarClaves(idClave, idConfir) {
    return new Promise(resolve => {
        let clave = document.querySelector(`#${idClave}`);
        let confir = document.querySelector(`#${idConfir}`);
        let mensaje = null;
        if (clave.value == "" || confir.value == "") {
            resolve(mensaje);
            return;
        }
        clave.classList.remove("is-invalid");
        confir.classList.remove("is-invalid");
        if (clave.value != confir.value) mensaje = "Las contraseñas no coinciden";
        if (!clave.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            mensaje = "La contraseña debe tener de 6 a 20 dígitos con un dígito numerico, uno en mayúsculas y uno en minúsculas";
            clave.classList.add("is-invalid");
            confir.classList.add("is-invalid");
        }
        resolve(mensaje);
    });
}
