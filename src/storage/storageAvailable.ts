/**
 * Checks if local/session storage is available and accessible.
 * Safe to call in non-browser environments.
 */
export function storageAvailable(type: "localStorage" | "sessionStorage"): boolean {
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
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      window[type].length !== 0
    );
  }
}
