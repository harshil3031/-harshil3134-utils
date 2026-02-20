export { d as debounce, t as throttle } from './throttle-DZpQt0gT.mjs';

declare function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;

declare function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;

declare function deepClone<T>(value: T): T;

/**
 * Deeply merges two objects. Sources overwrite targets.
 *
 * @example
 * ```ts
 * const target = { a: 1, b: { c: 2 } };
 * const source = { b: { d: 3 }, e: 4 };
 * deepMerge(target, source) // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * ```
 *
 * @param target - The base object
 * @param source - The object to merge into the target
 * @returns A new object with merged properties
 */
declare function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T;

declare function deepFreeze<T>(obj: T): T;

declare function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]>;

declare function uniqueBy<T, K extends keyof T>(array: T[], key: K): T[];

declare function flattenObject(obj: Record<string, any>, parentKey?: string, result?: Record<string, any>): Record<string, any>;

export { deepClone, deepFreeze, deepMerge, flattenObject, groupBy, omit, pick, uniqueBy };
