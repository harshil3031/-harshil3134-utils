import { describe, it, expect, vi } from "vitest";
import { retry, sleep, withTimeout } from "./index";

describe("Async Utilities", () => {
    it("sleep delays execution", async () => {
        const start = Date.now();
        await sleep(100);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(100);
    });

    it("retry works on eventual success", async () => {
        let attempts = 0;
        const fn = async () => {
            attempts++;
            if (attempts < 3) throw new Error("Fail");
            return "Success";
        };

        const result = await retry(fn, { attempts: 5, delayMs: 10 });
        expect(result).toBe("Success");
        expect(attempts).toBe(3);
    });

    it("retry fails after maximum attempts", async () => {
        let attempts = 0;
        const fn = async () => {
            attempts++;
            throw new Error("Fail");
        };

        await expect(retry(fn, { attempts: 3, delayMs: 10 })).rejects.toThrow("Fail");
        expect(attempts).toBe(3);
    });

    it("withTimeout resolves within time", async () => {
        const fn = async () => {
            await sleep(10);
            return "OK";
        };

        const result = await withTimeout(fn(), 100);
        expect(result).toBe("OK");
    });

    it("withTimeout rejects if too slow", async () => {
        const fn = async () => {
            await sleep(200);
            return "Slow";
        };

        await expect(withTimeout(fn(), 50)).rejects.toThrow();
    });
});
