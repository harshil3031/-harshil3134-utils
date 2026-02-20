type RuntimeEnvironment = "development" | "production" | "test";
declare const isBrowser: boolean;
declare const isNode: boolean;
declare const isReactNative: boolean;
declare function setRuntimeEnvironment(env: RuntimeEnvironment): void;
declare function getRuntimeEnvironment(): RuntimeEnvironment;

export { type RuntimeEnvironment, getRuntimeEnvironment, isBrowser, isNode, isReactNative, setRuntimeEnvironment };
