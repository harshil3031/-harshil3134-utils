/**
 * Sets an item in storage with an expiration time.
 *
 * @param key - Storage key
 * @param value - Value to store
 * @param ttlMs - Time to live in milliseconds
 * @param storage - Storage engine (default: localStorage if available)
 */
declare function setWithExpiry<T>(key: string, value: T, ttlMs: number, storage?: Storage): void;

/**
 * Retrieves an item from storage and checks if it has expired.
 * If expired, it is removed and null is returned.
 *
 * @param key - Storage key
 * @param storage - Storage engine (default: localStorage if available)
 */
declare function getWithExpiry<T>(key: string, storage?: Storage): T | null;

declare function clearExpired(storage?: Storage): void;

/**
 * Checks if local/session storage is available and accessible.
 * Safe to call in non-browser environments.
 */
declare function storageAvailable(type: "localStorage" | "sessionStorage"): boolean;

export { clearExpired, getWithExpiry, setWithExpiry, storageAvailable };
