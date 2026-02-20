interface DebouncedFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): void;
    cancel: () => void;
    flush: () => void;
}
declare function debounce<T extends (...args: any[]) => any>(fn: T, delay: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): DebouncedFunction<T>;

declare function throttle<T extends (...args: any[]) => any>(fn: T, interval: number): (this: any, ...args: Parameters<T>) => void;

export { type DebouncedFunction as D, debounce as d, throttle as t };
