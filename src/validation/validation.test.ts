import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidURL, isValidPhone, isStrongPassword, validateEnv, isNonEmptyString, isUUID } from './index';

describe('Validation Utils', () => {
    describe('isValidEmail', () => {
        it('should return true for valid emails', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
        });

        it('should return false for invalid emails', () => {
            expect(isValidEmail('invalid-email')).toBe(false);
        });
    });

    describe('isValidURL', () => {
        it('should return true for valid URLs', () => {
            expect(isValidURL('https://google.com')).toBe(true);
        });

        it('should return false for invalid URLs', () => {
            expect(isValidURL('not-a-url')).toBe(false);
        });
    });

    describe('isValidPhone', () => {
        it('should return true for valid phone numbers', () => {
            expect(isValidPhone('+1234567890')).toBe(true);
            expect(isValidPhone('1234567890')).toBe(true);
        });

        it('should return false for invalid phone numbers', () => {
            expect(isValidPhone('abc')).toBe(false);
        });
    });

    describe('isStrongPassword', () => {
        it('should identify strong passwords', () => {
            const result = isStrongPassword('Abc1234!');
            expect(result.isValid).toBe(true);
        });

        it('should identify weak passwords', () => {
            const result = isStrongPassword('weak');
            expect(result.isValid).toBe(false);
        });
    });

    describe('validateEnv', () => {
        it('should validate and parse correctly', () => {
            const env = { PORT: '3000', DEBUG: 'true' };
            const config = validateEnv<{ PORT: number; DEBUG: boolean }>({
                PORT: { type: 'number' },
                DEBUG: { type: 'boolean' }
            }, env);
            expect(config.PORT).toBe(3000);
            expect(config.DEBUG).toBe(true);
        });

        it('should throw on missing required', () => {
            expect(() => validateEnv({ KEY: { required: true } }, {})).toThrow(/Missing: KEY/);
        });

        it('should use defaults', () => {
            const config = validateEnv<{ PORT: number }>({
                PORT: { type: 'number', default: 8080 }
            }, {});
            expect(config.PORT).toBe(8080);
        });
    });

    describe('type guards', () => {
        it('isNonEmptyString', () => {
            expect(isNonEmptyString('foo')).toBe(true);
            expect(isNonEmptyString(' ')).toBe(false);
        });

        it('isUUID', () => {
            expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
            expect(isUUID('invalid')).toBe(false);
        });
    });
});
