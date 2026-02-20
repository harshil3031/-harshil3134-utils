'use strict';

// src/guards/isType.ts
function isObject(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number" && !isNaN(val);
}
function isFunction(val) {
  return typeof val === "function";
}
function isDefined(val) {
  return val !== null && val !== void 0;
}
function isPromise(val) {
  return !!val && (typeof val === "object" || typeof val === "function") && typeof val.then === "function";
}
function isBoolean(val) {
  return typeof val === "boolean";
}

exports.isBoolean = isBoolean;
exports.isDefined = isDefined;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isString = isString;
//# sourceMappingURL=guards.js.map
//# sourceMappingURL=guards.js.map