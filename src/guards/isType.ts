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
export function isObject(val: unknown): val is Record<string, unknown> {
    return val !== null && typeof val === "object" && !Array.isArray(val);
}

/**
 * Type guard for checking if a value is a string.
 */
export function isString(val: unknown): val is string {
    return typeof val === "string";
}

/**
 * Type guard for checking if a value is a number and not NaN.
 */
export function isNumber(val: unknown): val is number {
    return typeof val === "number" && !isNaN(val);
}

/**
 * Type guard for checking if a value is a function.
 */
export function isFunction(val: unknown): val is Function {
    return typeof val === "function";
}

/**
 * Type guard for checking if a value is defined (not null or undefined).
 */
export function isDefined<T>(val: T | null | undefined): val is T {
    return val !== null && val !== undefined;
}

/**
 * Type guard for checking if a value is a Promise.
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return (
        !!val &&
        (typeof val === "object" || typeof val === "function") &&
        typeof (val as any).then === "function"
    );
}
/**
 * Type guard for checking if a value is a boolean.
 */
export function isBoolean(val: unknown): val is boolean {
    return typeof val === "boolean";
}
