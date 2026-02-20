import { describe, it, expect } from "vitest";
import {
    chunk,
    sample,
    shuffle,
    range,
    unique,
} from "./index";

describe("Collection Utilities", () => {
    it("chunk splits array correctly", () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
        expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });

    it("sample returns an element from array", () => {
        const arr = [1, 2, 3];
        const item = sample(arr);
        expect(arr).toContain(item);
        expect(sample([])).toBeUndefined();
    });

    it("shuffle randomizes array", () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const shuffled = shuffle(arr);
        expect(shuffled).toHaveLength(arr.length);
        expect(shuffled).toContain(1);
        // Theoretically could be same, but highly unlikely for 10 elements
        expect(shuffled).not.toEqual(arr);
    });

    it("range generates numeric sequence", () => {
        expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
        expect(range(2, 5)).toEqual([2, 3, 4]);
        expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    });

    it("unique removes duplicates", () => {
        expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
        const users = [
            { id: 1, name: "A" },
            { id: 2, name: "B" },
            { id: 1, name: "C" },
        ];
        expect(unique(users, (u) => u.id)).toHaveLength(2);
    });
});
