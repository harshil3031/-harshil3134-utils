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

export { batch, debounce, memoize, throttle };
//# sourceMappingURL=performance.js.map
//# sourceMappingURL=performance.js.map