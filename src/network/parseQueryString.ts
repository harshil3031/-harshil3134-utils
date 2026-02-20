export function parseQueryString(url: string): Record<string, string> {
  const params: Record<string, string> = {};
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
