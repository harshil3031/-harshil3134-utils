import { useEffect } from "react";

export function useAbortableEffect(
  effect: (signal: AbortSignal) => void | Promise<void>,
  deps: any[]
) {
  useEffect(() => {
    const controller = new AbortController();

    const maybePromise = effect(controller.signal);

    return () => {
      controller.abort();
      if (maybePromise instanceof Promise) {
        maybePromise.catch(() => {});
      }
    };
  }, deps);
}