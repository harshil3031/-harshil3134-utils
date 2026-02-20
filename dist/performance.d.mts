export { D as DebouncedFunction, d as debounce, t as throttle } from './throttle-DZpQt0gT.mjs';

declare function memoize<T extends (...args: any[]) => any>(fn: T, resolver?: (...args: Parameters<T>) => string): T;

declare function batch<T>(fn: (items: T[]) => void): (item: T) => void;

export { batch, memoize };
