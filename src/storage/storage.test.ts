import { describe, it, expect, vi, beforeEach } from "vitest";
import { setWithExpiry, getWithExpiry, storageAvailable } from "./index";

describe("Storage Utilities", () => {
    const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        length: 0,
        clear: vi.fn(),
        key: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("setWithExpiry calls setItem with JSON", () => {
        setWithExpiry("test", { a: 1 }, 1000, mockStorage as any);
        expect(mockStorage.setItem).toHaveBeenCalledWith(
            "test",
            expect.stringContaining('"value":{"a":1}')
        );
    });

    it("getWithExpiry returns value if not expired", () => {
        const item = { value: "foo", expiry: Date.now() + 10000 };
        mockStorage.getItem.mockReturnValue(JSON.stringify(item));

        const result = getWithExpiry("test", mockStorage as any);
        expect(result).toBe("foo");
    });

    it("getWithExpiry returns null and removes item if expired", () => {
        const item = { value: "foo", expiry: Date.now() - 1000 };
        mockStorage.getItem.mockReturnValue(JSON.stringify(item));

        const result = getWithExpiry("test", mockStorage as any);
        expect(result).toBe(null);
        expect(mockStorage.removeItem).toHaveBeenCalledWith("test");
    });

    it("storageAvailable returns false in node", () => {
        // In node environment without window
        expect(storageAvailable("localStorage")).toBe(false);
    });
});
