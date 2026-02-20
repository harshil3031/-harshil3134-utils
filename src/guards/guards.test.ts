import { describe, it, expect } from "vitest";
import { isObject, isString, isNumber, isDefined, isPromise, isFunction, isBoolean } from "./isType";

describe("Guards", () => {
    it("isObject", () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ a: 1 })).toBe(true);
        expect(isObject([])).toBe(false);
        expect(isObject(null)).toBe(false);
        expect(isObject(123)).toBe(false);
    });

    it("isString", () => {
        expect(isString("hello")).toBe(true);
        expect(isString("")).toBe(true);
        expect(isString(123)).toBe(false);
        expect(isString(null)).toBe(false);
    });

    it("isNumber", () => {
        expect(isNumber(123)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(NaN)).toBe(false);
        expect(isNumber("123")).toBe(false);
    });

    it("isDefined", () => {
        expect(isDefined(0)).toBe(true);
        expect(isDefined("")).toBe(true);
        expect(isDefined(null)).toBe(false);
        expect(isDefined(undefined)).toBe(false);
    });

    it("isPromise", () => {
        expect(isPromise(Promise.resolve())).toBe(true);
        expect(isPromise({ then: () => { } })).toBe(true);
        expect(isPromise(null)).toBe(false);
        expect(isPromise({})).toBe(false);
    });

    it("isFunction", () => {
        expect(isFunction(() => { })).toBe(true);
        expect(isFunction(class { })).toBe(true);
        expect(isFunction({})).toBe(false);
    });

    it("isBoolean", () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(0)).toBe(false);
        expect(isBoolean(null)).toBe(false);
    });
});
