interface RequestContext {
    traceId?: string;
    spanId?: string;
    requestId?: string;
    userId?: string;
    [key: string]: unknown;
}

interface ContextAdapter {
    run<T>(context: RequestContext, fn: () => T): T;
    get(): RequestContext | undefined;
    set(context: Partial<RequestContext>): void;
}
declare class ContextManager {
    private adapter;
    constructor(adapter: ContextAdapter);
    run<T>(context: RequestContext, fn: () => T): T;
    get(): RequestContext | undefined;
    set(context: Partial<RequestContext>): void;
}

declare function createSimpleContextManager(): ContextManager;

declare class NodeAsyncLocalStorageAdapter implements ContextAdapter {
    private storage;
    run<T>(context: RequestContext, fn: () => T): T;
    get(): RequestContext | undefined;
    set(context: Partial<RequestContext>): void;
}

export { type ContextAdapter, ContextManager, NodeAsyncLocalStorageAdapter, type RequestContext, createSimpleContextManager };
