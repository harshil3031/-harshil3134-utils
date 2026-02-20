declare function sleep(ms: number, signal?: AbortSignal): Promise<void>;

interface RetryOptions {
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
declare function retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;

declare function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMessage?: string): Promise<T>;

declare function concurrentLimit<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]>;

declare function throwIfAborted(signal?: AbortSignal): void;
declare function mergeSignals(...signals: (AbortSignal | undefined)[]): AbortSignal | undefined;

export { type RetryOptions, concurrentLimit, mergeSignals, retry, sleep, throwIfAborted, withTimeout };
