'use strict';

var react = require('react');
var async_hooks = require('async_hooks');

// src/errors/AppError.ts
var AppError = class extends Error {
  constructor(message, statusCode = 500, code, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
};

// src/errors/ErrorCodes.ts
var ErrorCodes = /* @__PURE__ */ ((ErrorCodes2) => {
  ErrorCodes2["VALIDATION_ERROR"] = "VALIDATION_ERROR";
  ErrorCodes2["UNAUTHORIZED"] = "UNAUTHORIZED";
  ErrorCodes2["FORBIDDEN"] = "FORBIDDEN";
  ErrorCodes2["NOT_FOUND"] = "NOT_FOUND";
  ErrorCodes2["CONFLICT"] = "CONFLICT";
  ErrorCodes2["INTERNAL_ERROR"] = "INTERNAL_ERROR";
  return ErrorCodes2;
})(ErrorCodes || {});

// src/internal/runtime.ts
var currentEnv = (function() {
  if (typeof process !== "undefined" && process.env) {
    const nodeEnv = process.env["NODE_ENV"];
    if (nodeEnv === "production" || nodeEnv === "test") return nodeEnv;
  }
  return "development";
})();
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
var isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
var isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
function setRuntimeEnvironment(env) {
  currentEnv = env;
}
function getRuntimeEnvironment() {
  return currentEnv;
}

// src/errors/errorSerializer.ts
function errorSerializer(error) {
  const isProduction = getRuntimeEnvironment() === "production";
  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      ...isProduction ? {} : { stack: error.stack }
    };
  }
  return {
    success: false,
    message: isProduction ? "Internal Server Error" : (error == null ? void 0 : error.message) || "Unknown Error",
    statusCode: 500,
    ...isProduction ? {} : { stack: error == null ? void 0 : error.stack }
  };
}

// src/validation/assert.ts
function assert(condition, message = "Assertion failed") {
  if (!condition) {
    throw new Error(message);
  }
}

// src/validation/invariant.ts
function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// src/validation/typeGuards.ts
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
function isUUID(value) {
  if (typeof value !== "string") return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

// src/validation/safeParseJSON.ts
function safeParseJSON(value) {
  try {
    const parsed = JSON.parse(value);
    return { success: true, data: parsed };
  } catch (error) {
    return { success: false, error };
  }
}

// src/validation/validateEnv.ts
function validateEnv(schema, envSource = typeof process !== "undefined" ? process.env : {}) {
  const result = {};
  const missing = [];
  const invalid = [];
  for (const key in schema) {
    const config = schema[key];
    let value = envSource[key];
    if (!value && config.default !== void 0) {
      value = String(config.default);
    }
    if (!value) {
      if (config.required) {
        missing.push(key);
      }
      continue;
    }
    let parsedValue = value;
    if (config.type === "number") {
      parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        invalid.push(`${key} (must be a number)`);
        continue;
      }
    } else if (config.type === "boolean") {
      parsedValue = value === "true" || value === "1" || value === "yes";
    }
    if (config.validate && !config.validate(parsedValue)) {
      invalid.push(`${key} (failed validation)`);
      continue;
    }
    result[key] = parsedValue;
  }
  if (missing.length > 0 || invalid.length > 0) {
    const errors = [
      missing.length > 0 ? `Missing: ${missing.join(", ")}` : "",
      invalid.length > 0 ? `Invalid: ${invalid.join(", ")}` : ""
    ].filter(Boolean);
    throw new Error(`Environment validation failed: ${errors.join("; ")}`);
  }
  return result;
}

// src/validation/isValidEmail.ts
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// src/validation/isValidURL.ts
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// src/validation/isValidPhone.ts
function isValidPhone(phone) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ""));
}

// src/validation/isStrongPassword.ts
function isStrongPassword(password) {
  const res = {
    score: 0,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    isLengthValid: password.length >= 8,
    isValid: false
  };
  if (res.hasUpperCase) res.score++;
  if (res.hasLowerCase) res.score++;
  if (res.hasNumber) res.score++;
  if (res.hasSpecialChar) res.score++;
  if (res.isLengthValid) res.score++;
  res.isValid = res.score >= 4 && res.isLengthValid;
  return res;
}

// src/guards/isType.ts
function isObject(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number" && !isNaN(val);
}
function isFunction(val) {
  return typeof val === "function";
}
function isDefined(val) {
  return val !== null && val !== void 0;
}
function isPromise(val) {
  return !!val && (typeof val === "object" || typeof val === "function") && typeof val.then === "function";
}
function isBoolean(val) {
  return typeof val === "boolean";
}

// src/collection/index.ts
function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
function sample(array) {
  if (array.length === 0) return void 0;
  return array[Math.floor(Math.random() * array.length)];
}
function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}
function unique(array, by) {
  const seen = /* @__PURE__ */ new Set();
  return array.filter((item) => {
    const value = by ? by(item) : item;
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

// src/async/sleep.ts
function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal == null ? void 0 : signal.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }
    const timeoutId = setTimeout(resolve, ms);
    signal == null ? void 0 : signal.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

// src/async/abort.ts
function throwIfAborted(signal) {
  if (signal == null ? void 0 : signal.aborted) {
    throw new DOMException("Operation aborted", "AbortError");
  }
}
function mergeSignals(...signals) {
  const validSignals = signals.filter(Boolean);
  if (validSignals.length === 0) return void 0;
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  validSignals.forEach((signal) => {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener("abort", onAbort);
    }
  });
  return controller.signal;
}

// src/async/retry.ts
async function retry(fn, options = {}) {
  const {
    attempts = 3,
    delayMs = 500,
    backoffFactor = 1,
    shouldRetry = () => true,
    signal
  } = options;
  let currentAttempt = 0;
  let currentDelay = delayMs;
  while (currentAttempt < attempts) {
    throwIfAborted(signal);
    try {
      return await fn();
    } catch (error) {
      currentAttempt++;
      if (currentAttempt >= attempts || !shouldRetry(error, currentAttempt)) {
        throw error;
      }
      await sleep(currentDelay, signal);
      currentDelay *= backoffFactor;
    }
  }
  throw new Error("Retry failed unexpectedly");
}

// src/async/withTimeout.ts
function withTimeout(promise, timeoutMs, errorMessage = "Operation timed out") {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(errorMessage));
    }, timeoutMs);
  });
  return Promise.race([
    promise.finally(() => clearTimeout(timeoutId)),
    timeoutPromise
  ]);
}

// src/async/concurrentLimit.ts
async function concurrentLimit(tasks, limit) {
  const results = [];
  const executing = [];
  for (const task of tasks) {
    const p = task().then((result) => {
      results.push(result);
    });
    executing.push(p);
    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex((e) => e === p),
        1
      );
    }
  }
  await Promise.all(executing);
  return results;
}

// src/api/createApiResponse.ts
function createApiResponse(data, options) {
  return {
    success: true,
    message: options == null ? void 0 : options.message,
    data,
    meta: options == null ? void 0 : options.meta
  };
}

// src/api/createErrorResponse.ts
function createErrorResponse(message, statusCode = 500, code, meta) {
  return {
    success: false,
    message,
    statusCode,
    code,
    meta
  };
}

// src/api/createPaginationMeta.ts
function createPaginationMeta(page, limit, totalItems) {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}

// src/api/parseQueryParams.ts
function parseQueryParams(params) {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  return {
    page: page < 1 ? 1 : page,
    limit: limit < 1 ? 10 : limit,
    sort: params.sort,
    order: params.order === "desc" ? "desc" : params.order === "asc" ? "asc" : void 0,
    search: params.search
  };
}

// src/performance/debounce.ts
function debounce(fn, delay, options) {
  var _a, _b;
  let timer = null;
  let lastArgs = null;
  let lastThis;
  const leading = (_a = options == null ? void 0 : options.leading) != null ? _a : false;
  const trailing = (_b = options == null ? void 0 : options.trailing) != null ? _b : true;
  const invoke = () => {
    if (lastArgs) {
      fn.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    }
  };
  const debounced = function(...args) {
    lastArgs = args;
    lastThis = this;
    const callNow = leading && !timer;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (trailing) invoke();
    }, delay);
    if (callNow) invoke();
  };
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    lastArgs = null;
  };
  debounced.flush = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      invoke();
    }
  };
  return debounced;
}

// src/performance/throttle.ts
function throttle(fn, interval) {
  let lastTime = 0;
  let timer = null;
  return function(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// src/performance/memoize.ts
function memoize(fn, resolver) {
  const cache = /* @__PURE__ */ new Map();
  return function(...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// src/performance/batch.ts
function batch(fn) {
  let queue = [];
  let scheduled = false;
  return (item) => {
    queue.push(item);
    if (!scheduled) {
      scheduled = true;
      Promise.resolve().then(() => {
        fn(queue);
        queue = [];
        scheduled = false;
      });
    }
  };
}

// src/object/pick.ts
function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

// src/object/omit.ts
function omit(obj, keys) {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

// src/object/deepClone.ts
function deepClone(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

// src/object/deepMerge.ts
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

// src/object/deepFreeze.ts
function deepFreeze(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  Object.freeze(obj);
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return obj;
}

// src/object/groupBy.ts
function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}

// src/object/uniqueBy.ts
function uniqueBy(array, key) {
  const seen = /* @__PURE__ */ new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

// src/object/flattenObject.ts
function flattenObject(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}
function useIsMounted() {
  const isMounted = react.useRef(false);
  react.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
function usePrevious(value) {
  const ref = react.useRef(void 0);
  react.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = react.useState(value);
  react.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}
function useAsyncState() {
  const [data, setData] = react.useState(null);
  const [error, setError] = react.useState(null);
  const [loading, setLoading] = react.useState(false);
  const isMounted = useIsMounted();
  const run = react.useCallback(async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      if (isMounted.current) {
        setData(result);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);
  return {
    data,
    error,
    loading,
    run
  };
}
function useAbortableEffect(effect, deps) {
  react.useEffect(() => {
    const controller = new AbortController();
    const maybePromise = effect(controller.signal);
    return () => {
      controller.abort();
      if (maybePromise instanceof Promise) {
        maybePromise.catch(() => {
        });
      }
    };
  }, deps);
}
function useStableCallback(fn) {
  const ref = react.useRef(fn);
  ref.current = fn;
  return react.useCallback(((...args) => {
    return ref.current(...args);
  }), []);
}

// src/string/truncate.ts
function truncate(str, maxLen, suffix = "...") {
  if (str.length <= maxLen) return str;
  if (maxLen <= suffix.length) return suffix.slice(0, maxLen);
  return str.slice(0, maxLen - suffix.length) + suffix;
}

// src/string/slugify.ts
function slugify(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

// src/string/titleCase.ts
function titleCase(str) {
  return str.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// src/string/camelCase.ts
function camelCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

// src/string/kebabCase.ts
function kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
}

// src/string/snakeCase.ts
function snakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
}

// src/string/capitalize.ts
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// src/string/maskSensitiveData.ts
function maskSensitiveData(value, type) {
  if (!value) return value;
  switch (type) {
    case "email": {
      const lastAtIndex = value.lastIndexOf("@");
      if (lastAtIndex === -1) return value;
      const local = value.slice(0, lastAtIndex);
      const domain = value.slice(lastAtIndex + 1);
      if (!domain || !local) return value;
      let maskedLocal;
      if (local.length <= 2) {
        maskedLocal = local[0] + "*";
      } else {
        const maskCount = Math.min(local.length - 2, 8);
        maskedLocal = local[0] + "*".repeat(maskCount) + local[local.length - 1];
      }
      return `${maskedLocal}@${domain}`;
    }
    case "phone":
    case "card": {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 4) return value;
      const maskedLength = Math.min(digits.length - 4, 12);
      return "*".repeat(maskedLength) + digits.slice(-4);
    }
    default:
      return value;
  }
}

// src/date/formatDate.ts
function formatDate(date, format = "YYYY-MM-DD") {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return format.replace("YYYY", String(year)).replace("MM", month).replace("DD", day).replace("HH", hours).replace("mm", minutes).replace("ss", seconds);
}

// src/date/timeAgo.ts
function timeAgo(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  const now = Date.now();
  const diff = now - d.getTime();
  const isFuture = diff < 0;
  const absDiff = Math.abs(diff);
  const seconds = Math.floor(absDiff / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (seconds < 60) return isFuture ? "in a few seconds" : "just now";
  const suffix = isFuture ? "" : " ago";
  const prefix = isFuture ? "in " : "";
  if (minutes < 60) return `${prefix}${minutes} minute${minutes > 1 ? "s" : ""}${suffix}`;
  if (hours < 24) return `${prefix}${hours} hour${hours > 1 ? "s" : ""}${suffix}`;
  if (days < 30) return `${prefix}${days} day${days > 1 ? "s" : ""}${suffix}`;
  if (months < 12) return `${prefix}${months} month${months > 1 ? "s" : ""}${suffix}`;
  return `${prefix}${years} year${years > 1 ? "s" : ""}${suffix}`;
}

// src/date/isExpired.ts
function isExpired(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  return d.getTime() < Date.now();
}

// src/date/addDays.ts
function addDays(date, days) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  d.setDate(d.getDate() + days);
  return d;
}

// src/date/diffInDays.ts
function diffInDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error("Invalid date");
  }
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return Math.floor(diff / (1e3 * 60 * 60 * 24));
}

// src/date/isToday.ts
function isToday(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  const today = /* @__PURE__ */ new Date();
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
}

// src/date/startOfDay.ts
function startOfDay(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  d.setHours(0, 0, 0, 0);
  return d;
}

// src/date/endOfDay.ts
function endOfDay(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  d.setHours(23, 59, 59, 999);
  return d;
}

// src/misc/generateUUID.ts
function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}

// src/misc/formatBytes.ts
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// src/misc/randomBetween.ts
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// src/misc/copyToClipboard.ts
async function copyToClipboard(text) {
  var _a;
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    if ((_a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch (e) {
    return false;
  }
}

// src/misc/clamp.ts
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// src/network/fetchWithRetry.ts
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1e3) {
  let lastError;
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || i === retries) {
        return response;
      }
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (i === retries) {
        throw lastError;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
  }
  throw lastError || new Error("Fetch failed");
}

// src/network/createQueryString.ts
function createQueryString(params) {
  const entries = Object.entries(params).filter(([, value]) => value !== null && value !== void 0).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  return entries.length > 0 ? `?${entries.join("&")}` : "";
}

// src/network/parseQueryString.ts
function parseQueryString(url) {
  const params = {};
  const queryStart = url.indexOf("?");
  if (queryStart === -1) return params;
  const queryString = url.slice(queryStart + 1);
  const pairs = queryString.split("&");
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }
  }
  return params;
}

// src/network/isOnline.ts
function isOnline() {
  if (typeof navigator !== "undefined" && "onLine" in navigator) {
    return navigator.onLine;
  }
  return true;
}

// src/storage/setWithExpiry.ts
function setWithExpiry(key, value, ttlMs, storage) {
  const engine = storage || (typeof localStorage !== "undefined" ? localStorage : void 0);
  if (!engine) return;
  const item = {
    value,
    expiry: Date.now() + ttlMs
  };
  try {
    engine.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(`Failed to set item in storage: ${key}`, e);
  }
}

// src/storage/getWithExpiry.ts
function getWithExpiry(key, storage) {
  const engine = storage || (typeof localStorage !== "undefined" ? localStorage : void 0);
  if (!engine) return null;
  const itemStr = engine.getItem(key);
  if (!itemStr) {
    return null;
  }
  try {
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      engine.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    engine.removeItem(key);
    return null;
  }
}

// src/storage/clearExpired.ts
function clearExpired(storage = localStorage) {
  const keys = Object.keys(storage);
  for (const key of keys) {
    const itemStr = storage.getItem(key);
    if (!itemStr) continue;
    try {
      const item = JSON.parse(itemStr);
      if (item.expiry && Date.now() > item.expiry) {
        storage.removeItem(key);
      }
    } catch (e) {
    }
  }
}

// src/storage/storageAvailable.ts
function storageAvailable(type) {
  if (typeof window === "undefined" || !window[type]) {
    return false;
  }
  try {
    const storage = window[type];
    const test = "__storage_test__";
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (e) {
    return e instanceof DOMException && // everything except Firefox
    (e.code === 22 || // Firefox
    e.code === 1014 || // test name field too, because code might not be present
    // everything except Firefox
    e.name === "QuotaExceededError" || // Firefox
    e.name === "NS_ERROR_DOM_QUOTA_REACHED") && // acknowledge QuotaExceededError only if there's something already stored
    window[type].length !== 0;
  }
}

// src/logging/LogLevel.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["DEBUG"] = 10] = "DEBUG";
  LogLevel2[LogLevel2["INFO"] = 20] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 30] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 40] = "ERROR";
  LogLevel2[LogLevel2["NONE"] = 100] = "NONE";
  return LogLevel2;
})(LogLevel || {});

// src/logging/Logger.ts
var Logger = class {
  constructor(level, transport) {
    this.level = level;
    this.transport = transport;
  }
  log(level, message, context, error) {
    if (level < this.level) return;
    const entry = {
      level,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      context,
      error
    };
    this.transport(entry);
  }
  debug(message, context) {
    this.log(10 /* DEBUG */, message, context);
  }
  info(message, context) {
    this.log(20 /* INFO */, message, context);
  }
  warn(message, context) {
    this.log(30 /* WARN */, message, context);
  }
  error(message, error, context) {
    this.log(40 /* ERROR */, message, context, error);
  }
};

// src/logging/ConsoleTransport.ts
var ConsoleTransport = (entry) => {
  const { level, message, timestamp, context, error } = entry;
  const base = `[${timestamp}] ${LogLevel[level]}: ${message}`;
  if (level === 40 /* ERROR */) {
    console.error(base, context != null ? context : {}, error != null ? error : "");
  } else if (level === 30 /* WARN */) {
    console.warn(base, context != null ? context : {});
  } else {
    console.log(base, context != null ? context : {});
  }
};

// src/logging/createLogger.ts
function createLogger(options) {
  var _a, _b;
  return new Logger(
    (_a = options == null ? void 0 : options.level) != null ? _a : 20 /* INFO */,
    (_b = options == null ? void 0 : options.transport) != null ? _b : ConsoleTransport
  );
}

// src/metrics/MetricRegistry.ts
var MetricRegistry = class {
  constructor(exporter) {
    this.exporter = exporter;
  }
  counter(name, value = 1, labels) {
    this.exporter({
      type: "counter",
      name,
      value,
      labels
    });
  }
  gauge(name, value, labels) {
    this.exporter({
      type: "gauge",
      name,
      value,
      labels
    });
  }
  timing(name, durationMs, labels) {
    this.exporter({
      type: "timing",
      name,
      durationMs,
      labels
    });
  }
  async measure(name, fn, labels) {
    var _a, _b, _c, _d;
    const start = (_b = (_a = performance.now) == null ? void 0 : _a.call(performance)) != null ? _b : Date.now();
    try {
      return await fn();
    } finally {
      const end = (_d = (_c = performance.now) == null ? void 0 : _c.call(performance)) != null ? _d : Date.now();
      this.timing(name, end - start, labels);
    }
  }
};

// src/metrics/ConsoleMetricExporter.ts
var ConsoleMetricExporter = (metric) => {
  console.log("METRIC:", JSON.stringify(metric));
};

// src/metrics/createMetrics.ts
function createMetrics(options) {
  var _a;
  return new MetricRegistry(
    (_a = options == null ? void 0 : options.exporter) != null ? _a : ConsoleMetricExporter
  );
}

// src/context/ContextManager.ts
var ContextManager = class {
  constructor(adapter) {
    this.adapter = adapter;
  }
  run(context, fn) {
    return this.adapter.run(context, fn);
  }
  get() {
    return this.adapter.get();
  }
  set(context) {
    this.adapter.set(context);
  }
};

// src/context/createContextManager.ts
var SimpleContextAdapter = class {
  run(context, fn) {
    this.context = context;
    const result = fn();
    this.context = void 0;
    return result;
  }
  get() {
    return this.context;
  }
  set(context) {
    if (!this.context) return;
    this.context = { ...this.context, ...context };
  }
};
function createSimpleContextManager() {
  return new ContextManager(new SimpleContextAdapter());
}
var NodeAsyncLocalStorageAdapter = class {
  constructor() {
    this.storage = new async_hooks.AsyncLocalStorage();
  }
  run(context, fn) {
    return this.storage.run(context, fn);
  }
  get() {
    return this.storage.getStore();
  }
  set(context) {
    const current = this.storage.getStore();
    if (!current) return;
    this.storage.enterWith({
      ...current,
      ...context
    });
  }
};

// src/observability/tracing/Tracer.ts
var Tracer = class {
  constructor(exporter) {
    this.exporter = exporter;
  }
  startSpan(name, attributes) {
    const span = {
      name,
      startTime: Date.now(),
      attributes,
      context: {
        traceId: generateUUID(),
        spanId: generateUUID()
      },
      end: () => {
        span.endTime = Date.now();
        this.exporter(span);
      }
    };
    return span;
  }
  async trace(name, fn, attributes) {
    const span = this.startSpan(name, attributes);
    try {
      return await fn();
    } finally {
      span.end();
    }
  }
};

// src/observability/opentelemetry/OTelMetricExporter.ts
function createOTelMetricExporter(otelMeter) {
  return (metric) => {
    if (metric.type === "counter") {
      const counter = otelMeter.createCounter(metric.name);
      counter.add(metric.value, metric.labels);
    }
    if (metric.type === "gauge") {
      const gauge = otelMeter.createUpDownCounter(metric.name);
      gauge.add(metric.value, metric.labels);
    }
    if (metric.type === "timing") {
      const histogram = otelMeter.createHistogram(metric.name);
      histogram.record(metric.durationMs, metric.labels);
    }
  };
}

// src/observability/opentelemetry/OTelTracerBridge.ts
function createOTelSpanExporter(otelTracer) {
  return (span) => {
    const otelSpan = otelTracer.startSpan(span.name);
    if (span.attributes) {
      for (const key in span.attributes) {
        otelSpan.setAttribute(key, span.attributes[key]);
      }
    }
    otelSpan.end();
  };
}

// src/adapters/express/errorMiddleware.ts
function expressErrorMiddleware(err, req, res, next) {
  const serialized = errorSerializer(err);
  res.status(serialized.statusCode).json(serialized);
}

exports.AppError = AppError;
exports.ConsoleMetricExporter = ConsoleMetricExporter;
exports.ConsoleTransport = ConsoleTransport;
exports.ContextManager = ContextManager;
exports.ErrorCodes = ErrorCodes;
exports.LogLevel = LogLevel;
exports.Logger = Logger;
exports.MetricRegistry = MetricRegistry;
exports.NodeAsyncLocalStorageAdapter = NodeAsyncLocalStorageAdapter;
exports.Tracer = Tracer;
exports.addDays = addDays;
exports.assert = assert;
exports.batch = batch;
exports.camelCase = camelCase;
exports.capitalize = capitalize;
exports.chunk = chunk;
exports.clamp = clamp;
exports.clearExpired = clearExpired;
exports.concurrentLimit = concurrentLimit;
exports.copyToClipboard = copyToClipboard;
exports.createApiResponse = createApiResponse;
exports.createErrorResponse = createErrorResponse;
exports.createLogger = createLogger;
exports.createMetrics = createMetrics;
exports.createOTelMetricExporter = createOTelMetricExporter;
exports.createOTelSpanExporter = createOTelSpanExporter;
exports.createPaginationMeta = createPaginationMeta;
exports.createQueryString = createQueryString;
exports.createSimpleContextManager = createSimpleContextManager;
exports.debounce = debounce;
exports.deepClone = deepClone;
exports.deepFreeze = deepFreeze;
exports.deepMerge = deepMerge;
exports.diffInDays = diffInDays;
exports.endOfDay = endOfDay;
exports.errorSerializer = errorSerializer;
exports.expressErrorMiddleware = expressErrorMiddleware;
exports.fetchWithRetry = fetchWithRetry;
exports.flattenObject = flattenObject;
exports.formatBytes = formatBytes;
exports.formatDate = formatDate;
exports.generateUUID = generateUUID;
exports.getRuntimeEnvironment = getRuntimeEnvironment;
exports.getWithExpiry = getWithExpiry;
exports.groupBy = groupBy;
exports.invariant = invariant;
exports.isBoolean = isBoolean;
exports.isBrowser = isBrowser;
exports.isDefined = isDefined;
exports.isExpired = isExpired;
exports.isFunction = isFunction;
exports.isNode = isNode;
exports.isNonEmptyString = isNonEmptyString;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isOnline = isOnline;
exports.isPromise = isPromise;
exports.isReactNative = isReactNative;
exports.isString = isString;
exports.isStrongPassword = isStrongPassword;
exports.isToday = isToday;
exports.isUUID = isUUID;
exports.isValidEmail = isValidEmail;
exports.isValidPhone = isValidPhone;
exports.isValidURL = isValidURL;
exports.kebabCase = kebabCase;
exports.maskSensitiveData = maskSensitiveData;
exports.memoize = memoize;
exports.mergeSignals = mergeSignals;
exports.omit = omit;
exports.parseQueryParams = parseQueryParams;
exports.parseQueryString = parseQueryString;
exports.pick = pick;
exports.randomBetween = randomBetween;
exports.range = range;
exports.retry = retry;
exports.safeParseJSON = safeParseJSON;
exports.sample = sample;
exports.setRuntimeEnvironment = setRuntimeEnvironment;
exports.setWithExpiry = setWithExpiry;
exports.shuffle = shuffle;
exports.sleep = sleep;
exports.slugify = slugify;
exports.snakeCase = snakeCase;
exports.startOfDay = startOfDay;
exports.storageAvailable = storageAvailable;
exports.throttle = throttle;
exports.throwIfAborted = throwIfAborted;
exports.timeAgo = timeAgo;
exports.titleCase = titleCase;
exports.truncate = truncate;
exports.unique = unique;
exports.uniqueBy = uniqueBy;
exports.useAbortableEffect = useAbortableEffect;
exports.useAsyncState = useAsyncState;
exports.useDebouncedValue = useDebouncedValue;
exports.useIsMounted = useIsMounted;
exports.usePrevious = usePrevious;
exports.useStableCallback = useStableCallback;
exports.validateEnv = validateEnv;
exports.withTimeout = withTimeout;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map