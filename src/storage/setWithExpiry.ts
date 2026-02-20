interface StorageItem<T> {
  value: T;
  expiry: number;
}

/**
 * Sets an item in storage with an expiration time.
 * 
 * @param key - Storage key
 * @param value - Value to store
 * @param ttlMs - Time to live in milliseconds
 * @param storage - Storage engine (default: localStorage if available)
 */
export function setWithExpiry<T>(
  key: string,
  value: T,
  ttlMs: number,
  storage?: Storage
): void {
  const engine = storage || (typeof localStorage !== 'undefined' ? localStorage : undefined);
  if (!engine) return;

  const item: StorageItem<T> = {
    value,
    expiry: Date.now() + ttlMs,
  };

  try {
    engine.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(`Failed to set item in storage: ${key}`, e);
  }
}
