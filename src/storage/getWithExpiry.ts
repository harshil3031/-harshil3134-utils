interface StorageItem<T> {
  value: T;
  expiry: number;
}

/**
 * Retrieves an item from storage and checks if it has expired.
 * If expired, it is removed and null is returned.
 * 
 * @param key - Storage key
 * @param storage - Storage engine (default: localStorage if available)
 */
export function getWithExpiry<T>(
  key: string,
  storage?: Storage
): T | null {
  const engine = storage || (typeof localStorage !== 'undefined' ? localStorage : undefined);
  if (!engine) return null;

  const itemStr = engine.getItem(key);

  if (!itemStr) {
    return null;
  }

  try {
    const item: StorageItem<T> = JSON.parse(itemStr);

    if (Date.now() > item.expiry) {
      engine.removeItem(key);
      return null;
    }

    return item.value;
  } catch {
    engine.removeItem(key);
    return null;
  }
}
