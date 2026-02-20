import { describe, it, expect } from 'vitest';
import { formatDate, timeAgo, isExpired, addDays, isToday, startOfDay } from './index';

describe('Date Utils', () => {
    describe('formatDate', () => {
        it('should format date correctly', () => {
            const date = new Date('2023-01-01');
            expect(typeof formatDate(date, 'yyyy-MM-dd')).toBe('string');
        });
    });

    describe('timeAgo', () => {
        it('should return a string indicating relative time for past', () => {
            const now = new Date();
            const past = new Date(now.getTime() - 60000); // 1 minute ago
            expect(timeAgo(past)).toContain('minute ago');
        });

        it('should return a string indicating relative time for future', () => {
            const now = new Date();
            const future = new Date(now.getTime() + 60000); // in 1 minute
            expect(timeAgo(future)).toBe('in 1 minute');
        });

        it('should handle just now', () => {
            expect(timeAgo(new Date())).toBe('just now');
        });
    });

    describe('isExpired', () => {
        it('should return true for past dates', () => {
            const past = new Date(Date.now() - 10000);
            expect(isExpired(past)).toBe(true);
        });

        it('should return false for future dates', () => {
            const future = new Date(Date.now() + 10000);
            expect(isExpired(future)).toBe(false);
        });
    });

    describe('addDays', () => {
        it('should add days correctly', () => {
            const date = new Date('2023-01-01');
            const newDate = addDays(date, 5);
            expect(newDate.getDate()).toBe(6);
        });
    });

    describe('isToday', () => {
        it('should return true for today', () => {
            expect(isToday(new Date())).toBe(true);
        });
    });

    describe('startOfDay', () => {
        it('should set time to 00:00:00', () => {
            const date = new Date();
            const start = startOfDay(date);
            expect(start.getHours()).toBe(0);
            expect(start.getMinutes()).toBe(0);
            expect(start.getSeconds()).toBe(0);
        });
    });
});
