/**
 * Truncates a string to a specified length and appends a suffix.
 * 
 * @example
 * ```ts
 * truncate("Hello World", 8) // "Hello..."
 * ```
 * 
 * @param str - The string to truncate
 * @param maxLen - The maximum length including the suffix
 * @param suffix - The suffix to append (default: "...")
 * @returns The truncated string
 */
export function truncate(
  str: string,
  maxLen: number,
  suffix = "..."
): string {
  if (str.length <= maxLen) return str;
  if (maxLen <= suffix.length) return suffix.slice(0, maxLen);
  return str.slice(0, maxLen - suffix.length) + suffix;
}
