'use strict';

var react = require('react');

// src/react/useIsMounted.ts
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

exports.useAbortableEffect = useAbortableEffect;
exports.useAsyncState = useAsyncState;
exports.useDebouncedValue = useDebouncedValue;
exports.useIsMounted = useIsMounted;
exports.usePrevious = usePrevious;
exports.useStableCallback = useStableCallback;
//# sourceMappingURL=react.js.map
//# sourceMappingURL=react.js.map