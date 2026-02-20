import { describe, it, expect, vi } from "vitest";
import { debounce, throttle, batch } from "./index";

describe("Performance Utilities", () => {
    it("debounce delays execution", async () => {
        const fn = vi.fn();
        const debounced = debounce(fn, 100);

        debounced();
        debounced();
        debounced();

        expect(fn).not.toHaveBeenCalled();

        await new Promise((r) => setTimeout(r, 150));
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("throttle limits execution rate", async () => {
        const fn = vi.fn();
        const throttled = throttle(fn, 100);

        throttled();
        throttled();
        throttled();

        expect(fn).toHaveBeenCalledTimes(1);

        await new Promise((r) => setTimeout(r, 150));
        throttled();
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it("batch groups multiple calls", async () => {
        const fn = vi.fn();
        const batched = batch(fn);

        batched(1);
        batched(2);
        batched(3);

        expect(fn).not.toHaveBeenCalled();

        await new Promise(resolve => setTimeout(resolve, 0));
        expect(fn).toHaveBeenCalledWith([1, 2, 3]);
    });
});
