import { sleep } from "./sleep";
import { throwIfAborted } from "./abort";

export interface RetryOptions {
  /** Maximum number of attempts (default: 3) */
  attempts?: number;
  /** Initial delay between retries in milliseconds (default: 500) */
  delayMs?: number;
  /** Factor to multiply delay by after each failed attempt (default: 1) */
  backoffFactor?: number;
  /** Custom logic to determine if a retry should occur based on the error */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  /** Optional AbortSignal to cancel retries */
  signal?: AbortSignal;
}

/**
 * Retries an asynchronous function with configurable attempts and backoff.
 * 
 * @example
 * ```ts
 * const data = await retry(() => fetchUsers(), {
 *   attempts: 5,
 *   delayMs: 1000,
 *   backoffFactor: 2
 * });
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
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

      if (
        currentAttempt >= attempts ||
        !shouldRetry(error, currentAttempt)
      ) {
        throw error;
      }

      await sleep(currentDelay, signal);
      currentDelay *= backoffFactor;
    }
  }

  throw new Error("Retry failed unexpectedly");
}