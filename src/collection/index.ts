/**
 * Splits an array into chunks of a specified size.
 * 
 * @example
 * ```ts
 * chunk([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Returns a random element from an array.
 */
export function sample<T>(array: T[]): T | undefined {
    if (array.length === 0) return undefined;
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Randomly shuffles an array using the Fisher-Yates algorithm.
 * Returns a new array.
 */
export function shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j]!, result[i]!];
    }
    return result;
}

/**
 * Generates an array of numbers from start to end (exclusive).
 */
export function range(start: number, end: number, step = 1): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}

/**
 * Returns unique elements of an array based on a transformation function or property key.
 */
export function unique<T>(array: T[], by?: (item: T) => unknown): T[] {
    const seen = new Set();
    return array.filter((item) => {
        const value = by ? by(item) : item;
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
    });
}
