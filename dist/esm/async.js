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

export { concurrentLimit, mergeSignals, retry, sleep, throwIfAborted, withTimeout };
//# sourceMappingURL=async.js.map
//# sourceMappingURL=async.js.map