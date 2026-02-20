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

// src/guards/isType.ts
function isObject(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
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

export { debounce, deepClone, deepFreeze, deepMerge, flattenObject, groupBy, omit, pick, throttle, uniqueBy };
//# sourceMappingURL=object.js.map
//# sourceMappingURL=object.js.map