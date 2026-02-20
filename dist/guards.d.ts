/**
 * Type guard for checking if a value is a non-null object (and not an array).
 *
 * @example
 * ```ts
 * isObject({ a: 1 }) // true
 * isObject([])       // false
 * isObject(null)     // false
 * ```
 */
declare function isObject(val: unknown): val is Record<string, unknown>;
/**
 * Type guard for checking if a value is a string.
 */
declare function isString(val: unknown): val is string;
/**
 * Type guard for checking if a value is a number and not NaN.
 */
declare function isNumber(val: unknown): val is number;
/**
 * Type guard for checking if a value is a function.
 */
declare function isFunction(val: unknown): val is Function;
/**
 * Type guard for checking if a value is defined (not null or undefined).
 */
declare function isDefined<T>(val: T | null | undefined): val is T;
/**
 * Type guard for checking if a value is a Promise.
 */
declare function isPromise<T = any>(val: unknown): val is Promise<T>;
/**
 * Type guard for checking if a value is a boolean.
 */
declare function isBoolean(val: unknown): val is boolean;

export { isBoolean, isDefined, isFunction, isNumber, isObject, isPromise, isString };
