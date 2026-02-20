export function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException("Operation aborted", "AbortError");
  }
}

export function mergeSignals(
  ...signals: (AbortSignal | undefined)[]
): AbortSignal | undefined {
  const validSignals = signals.filter(Boolean) as AbortSignal[];

  if (validSignals.length === 0) return undefined;

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