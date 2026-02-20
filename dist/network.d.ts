declare function fetchWithRetry(url: string, options?: RequestInit, retries?: number, delay?: number): Promise<Response>;

declare function createQueryString(params: Record<string, string | number | boolean | null | undefined>): string;

declare function parseQueryString(url: string): Record<string, string>;

declare function isOnline(): boolean;

export { createQueryString, fetchWithRetry, isOnline, parseQueryString };
