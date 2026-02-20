import { useState, useCallback } from "react";
import { useIsMounted } from "./useIsMounted";

export function useAsyncState<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const isMounted = useIsMounted();

  const run = useCallback(async (fn: () => Promise<T>) => {
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
    run,
  };
}