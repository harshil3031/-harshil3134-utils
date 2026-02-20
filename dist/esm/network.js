// src/network/fetchWithRetry.ts
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1e3) {
  let lastError;
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || i === retries) {
        return response;
      }
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (i === retries) {
        throw lastError;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
  }
  throw lastError || new Error("Fetch failed");
}

// src/network/createQueryString.ts
function createQueryString(params) {
  const entries = Object.entries(params).filter(([, value]) => value !== null && value !== void 0).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  return entries.length > 0 ? `?${entries.join("&")}` : "";
}

// src/network/parseQueryString.ts
function parseQueryString(url) {
  const params = {};
  const queryStart = url.indexOf("?");
  if (queryStart === -1) return params;
  const queryString = url.slice(queryStart + 1);
  const pairs = queryString.split("&");
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }
  }
  return params;
}

// src/network/isOnline.ts
function isOnline() {
  if (typeof navigator !== "undefined" && "onLine" in navigator) {
    return navigator.onLine;
  }
  return true;
}

export { createQueryString, fetchWithRetry, isOnline, parseQueryString };
//# sourceMappingURL=network.js.map
//# sourceMappingURL=network.js.map