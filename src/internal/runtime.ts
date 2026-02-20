export type RuntimeEnvironment = "development" | "production" | "test";

let currentEnv: RuntimeEnvironment = (function () {
  if (typeof process !== "undefined" && process.env) {
    const nodeEnv = process.env["NODE_ENV"];
    if (nodeEnv === "production" || nodeEnv === "test") return nodeEnv;
  }
  return "development";
})();

export const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
export const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
export const isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";

export function setRuntimeEnvironment(env: RuntimeEnvironment) {
  currentEnv = env;
}

export function getRuntimeEnvironment(): RuntimeEnvironment {
  return currentEnv;
}