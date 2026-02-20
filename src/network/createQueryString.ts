export function createQueryString(
  params: Record<string, string | number | boolean | null | undefined>
): string {
  const entries = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return entries.length > 0 ? `?${entries.join("&")}` : "";
}
