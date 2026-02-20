import { describe, it, expect } from 'vitest';
import { deepClone, groupBy, flattenObject } from './index';

describe('Object Utils', () => {
    describe('deepClone', () => {
        it('should create a deep copy of an object', () => {
            const obj = { a: 1, b: { c: 2 } };
            const clone = deepClone(obj);
            expect(clone).toEqual(obj);
            expect(clone).not.toBe(obj);
            expect(clone.b).not.toBe(obj.b);
        });
    });

    describe('groupBy', () => {
        it('should group array elements by key', () => {
            const data = [
                { id: 1, category: 'A' },
                { id: 2, category: 'B' },
                { id: 3, category: 'A' },
            ];
            const grouped = groupBy(data, 'category');
            expect(grouped['A']).toHaveLength(2);
            expect(grouped['B']).toHaveLength(1);
        });
    });

    describe('flattenObject', () => {
        it('should flatten a nested object', () => {
            const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
            const flattened = flattenObject(obj);
            expect(flattened['a']).toBe(1);
            expect(flattened['b.c']).toBe(2);
            expect(flattened['b.d.e']).toBe(3);
        });
    });
});
