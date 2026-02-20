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
declare function truncate(str: string, maxLen: number, suffix?: string): string;

declare function slugify(str: string): string;

declare function titleCase(str: string): string;

declare function camelCase(str: string): string;

declare function kebabCase(str: string): string;

declare function snakeCase(str: string): string;

declare function capitalize(str: string): string;

type MaskType = "email" | "phone" | "card";
declare function maskSensitiveData(value: string, type: MaskType): string;

export { type MaskType, camelCase, capitalize, kebabCase, maskSensitiveData, slugify, snakeCase, titleCase, truncate };
