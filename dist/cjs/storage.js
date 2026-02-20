'use strict';

// src/storage/setWithExpiry.ts
function setWithExpiry(key, value, ttlMs, storage) {
  const engine = storage || (typeof localStorage !== "undefined" ? localStorage : void 0);
  if (!engine) return;
  const item = {
    value,
    expiry: Date.now() + ttlMs
  };
  try {
    engine.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(`Failed to set item in storage: ${key}`, e);
  }
}

// src/storage/getWithExpiry.ts
function getWithExpiry(key, storage) {
  const engine = storage || (typeof localStorage !== "undefined" ? localStorage : void 0);
  if (!engine) return null;
  const itemStr = engine.getItem(key);
  if (!itemStr) {
    return null;
  }
  try {
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      engine.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    engine.removeItem(key);
    return null;
  }
}

// src/storage/clearExpired.ts
function clearExpired(storage = localStorage) {
  const keys = Object.keys(storage);
  for (const key of keys) {
    const itemStr = storage.getItem(key);
    if (!itemStr) continue;
    try {
      const item = JSON.parse(itemStr);
      if (item.expiry && Date.now() > item.expiry) {
        storage.removeItem(key);
      }
    } catch (e) {
    }
  }
}

// src/storage/storageAvailable.ts
function storageAvailable(type) {
  if (typeof window === "undefined" || !window[type]) {
    return false;
  }
  try {
    const storage = window[type];
    const test = "__storage_test__";
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (e) {
    return e instanceof DOMException && // everything except Firefox
    (e.code === 22 || // Firefox
    e.code === 1014 || // test name field too, because code might not be present
    // everything except Firefox
    e.name === "QuotaExceededError" || // Firefox
    e.name === "NS_ERROR_DOM_QUOTA_REACHED") && // acknowledge QuotaExceededError only if there's something already stored
    window[type].length !== 0;
  }
}

exports.clearExpired = clearExpired;
exports.getWithExpiry = getWithExpiry;
exports.setWithExpiry = setWithExpiry;
exports.storageAvailable = storageAvailable;
//# sourceMappingURL=storage.js.map
//# sourceMappingURL=storage.js.map