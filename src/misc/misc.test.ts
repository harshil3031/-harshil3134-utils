import { describe, it, expect } from "vitest";
import { generateUUID, formatBytes, randomBetween, clamp } from "./index";

describe("Misc Utilities", () => {
    it("generateUUID returns a valid looking UUID", () => {
        const uuid = generateUUID();
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it("formatBytes formats correctly", () => {
        expect(formatBytes(1024)).toBe("1 KB");
        expect(formatBytes(1234567)).toBe("1.18 MB");
    });

    it("randomBetween returns value in range", () => {
        const val = randomBetween(1, 10);
        expect(val).toBeGreaterThanOrEqual(1);
        expect(val).toBeLessThanOrEqual(10);
    });

    it("clamp restricts values", () => {
        expect(clamp(5, 1, 10)).toBe(5);
        expect(clamp(0, 1, 10)).toBe(1);
        expect(clamp(11, 1, 10)).toBe(10);
    });
});
