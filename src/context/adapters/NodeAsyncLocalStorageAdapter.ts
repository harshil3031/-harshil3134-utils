import { AsyncLocalStorage } from "async_hooks";
import { ContextAdapter } from "../ContextManager";
import { RequestContext } from "../ContextTypes";

export class NodeAsyncLocalStorageAdapter implements ContextAdapter {
  private storage = new AsyncLocalStorage<RequestContext>();

  run<T>(context: RequestContext, fn: () => T): T {
    return this.storage.run(context, fn);
  }

  get(): RequestContext | undefined {
    return this.storage.getStore();
  }

  set(context: Partial<RequestContext>) {
    const current = this.storage.getStore();
    if (!current) return;

    this.storage.enterWith({
      ...current,
      ...context,
    });
  }
}