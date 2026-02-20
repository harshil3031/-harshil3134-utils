// src/internal/runtime.ts
var currentEnv = (function() {
  if (typeof process !== "undefined" && process.env) {
    const nodeEnv = process.env["NODE_ENV"];
    if (nodeEnv === "production" || nodeEnv === "test") return nodeEnv;
  }
  return "development";
})();
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
var isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
var isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
function setRuntimeEnvironment(env) {
  currentEnv = env;
}
function getRuntimeEnvironment() {
  return currentEnv;
}

export { getRuntimeEnvironment, isBrowser, isNode, isReactNative, setRuntimeEnvironment };
//# sourceMappingURL=internal.js.map
//# sourceMappingURL=internal.js.map