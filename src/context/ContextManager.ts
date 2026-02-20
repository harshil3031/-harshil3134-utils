import { RequestContext } from "./ContextTypes";

export interface ContextAdapter {
  run<T>(context: RequestContext, fn: () => T): T;
  get(): RequestContext | undefined;
  set(context: Partial<RequestContext>): void;
}

export class ContextManager {
  private adapter: ContextAdapter;

  constructor(adapter: ContextAdapter) {
    this.adapter = adapter;
  }

  run<T>(context: RequestContext, fn: () => T): T {
    return this.adapter.run(context, fn);
  }

  get(): RequestContext | undefined {
    return this.adapter.get();
  }

  set(context: Partial<RequestContext>) {
    this.adapter.set(context);
  }
}