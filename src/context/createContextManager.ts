import { ContextManager } from "./ContextManager";
import { RequestContext } from "./ContextTypes";

class SimpleContextAdapter {
  private context?: RequestContext | undefined;

  run<T>(context: RequestContext, fn: () => T): T {
    this.context = context;
    const result = fn();
    this.context = undefined;
    return result;
  }

  get(): RequestContext | undefined {
    return this.context;
  }

  set(context: Partial<RequestContext>) {
    if (!this.context) return;
    this.context = { ...this.context, ...context };
  }
}

export function createSimpleContextManager() {
  return new ContextManager(new SimpleContextAdapter());
}