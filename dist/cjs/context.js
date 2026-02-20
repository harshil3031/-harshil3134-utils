'use strict';

var async_hooks = require('async_hooks');

// src/context/ContextManager.ts
var ContextManager = class {
  constructor(adapter) {
    this.adapter = adapter;
  }
  run(context, fn) {
    return this.adapter.run(context, fn);
  }
  get() {
    return this.adapter.get();
  }
  set(context) {
    this.adapter.set(context);
  }
};

// src/context/createContextManager.ts
var SimpleContextAdapter = class {
  run(context, fn) {
    this.context = context;
    const result = fn();
    this.context = void 0;
    return result;
  }
  get() {
    return this.context;
  }
  set(context) {
    if (!this.context) return;
    this.context = { ...this.context, ...context };
  }
};
function createSimpleContextManager() {
  return new ContextManager(new SimpleContextAdapter());
}
var NodeAsyncLocalStorageAdapter = class {
  constructor() {
    this.storage = new async_hooks.AsyncLocalStorage();
  }
  run(context, fn) {
    return this.storage.run(context, fn);
  }
  get() {
    return this.storage.getStore();
  }
  set(context) {
    const current = this.storage.getStore();
    if (!current) return;
    this.storage.enterWith({
      ...current,
      ...context
    });
  }
};

exports.ContextManager = ContextManager;
exports.NodeAsyncLocalStorageAdapter = NodeAsyncLocalStorageAdapter;
exports.createSimpleContextManager = createSimpleContextManager;
//# sourceMappingURL=context.js.map
//# sourceMappingURL=context.js.map