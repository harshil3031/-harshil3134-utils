import * as react from 'react';

declare function useIsMounted(): react.RefObject<boolean>;

declare function usePrevious<T>(value: T): T | undefined;

declare function useDebouncedValue<T>(value: T, delay: number): T;

declare function useAsyncState<T>(): {
    data: T | null;
    error: unknown;
    loading: boolean;
    run: (fn: () => Promise<T>) => Promise<void>;
};

declare function useAbortableEffect(effect: (signal: AbortSignal) => void | Promise<void>, deps: any[]): void;

declare function useStableCallback<T extends (...args: any[]) => any>(fn: T): T;

export { useAbortableEffect, useAsyncState, useDebouncedValue, useIsMounted, usePrevious, useStableCallback };
