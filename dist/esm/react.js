import { useRef, useEffect, useState, useCallback } from 'react';

// src/react/useIsMounted.ts
function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
function usePrevious(value) {
  const ref = useRef(void 0);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}
function useAsyncState() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();
  const run = useCallback(async (fn) => {
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
  useEffect(() => {
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
  const ref = useRef(fn);
  ref.current = fn;
  return useCallback(((...args) => {
    return ref.current(...args);
  }), []);
}

export { useAbortableEffect, useAsyncState, useDebouncedValue, useIsMounted, usePrevious, useStableCallback };
//# sourceMappingURL=react.js.map
//# sourceMappingURL=react.js.map