import { isObject } from "../guards/isType";

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
export function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
    const output = { ...target };

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key as keyof T] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }

    return output;
}
