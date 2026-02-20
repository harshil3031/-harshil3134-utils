/**
 * Splits an array into chunks of a specified size.
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
 * ```
 */
declare function chunk<T>(array: T[], size: number): T[][];
/**
 * Returns a random element from an array.
 */
declare function sample<T>(array: T[]): T | undefined;
/**
 * Randomly shuffles an array using the Fisher-Yates algorithm.
 * Returns a new array.
 */
declare function shuffle<T>(array: T[]): T[];
/**
 * Generates an array of numbers from start to end (exclusive).
 */
declare function range(start: number, end: number, step?: number): number[];
/**
 * Returns unique elements of an array based on a transformation function or property key.
 */
declare function unique<T>(array: T[], by?: (item: T) => unknown): T[];

export { chunk, range, sample, shuffle, unique };
