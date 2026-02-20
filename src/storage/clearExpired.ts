interface StorageItem {
  value: unknown;
  expiry: number;
}

export function clearExpired(storage: Storage = localStorage): void {
  const keys = Object.keys(storage);

  for (const key of keys) {
    const itemStr = storage.getItem(key);
    if (!itemStr) continue;

    try {
      const item: StorageItem = JSON.parse(itemStr);
      
      if (item.expiry && Date.now() > item.expiry) {
        storage.removeItem(key);
      }
    } catch {
      // Skip invalid items
    }
  }
}
