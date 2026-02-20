import { describe, it, expect } from 'vitest';
import { truncate, slugify, titleCase, maskSensitiveData, camelCase, kebabCase, snakeCase, capitalize } from './index';

describe('String Utils', () => {
    describe('truncate', () => {
        it('should truncate string at max length', () => {
            expect(truncate('hello world', 5)).toBe('he...');
        });

        it('should return original string if length is less than max', () => {
            expect(truncate('hello', 10)).toBe('hello');
        });

        it('should handle maxLen smaller than suffix', () => {
            expect(truncate('hello', 2, '...')).toBe('..');
        });
    });

    describe('slugify', () => {
        it('should convert to lowercase and replace spaces', () => {
            expect(slugify('Hello World')).toBe('hello-world');
        });

        it('should handle special characters', () => {
            expect(slugify('Hello World!')).toBe('hello-world');
        });

        it('should normalize unicode characters', () => {
            expect(slugify('München')).toBe('munchen');
        });
    });

    describe('titleCase', () => {
        it('should capitalize first letter of each word', () => {
            expect(titleCase('hello world')).toBe('Hello World');
        });
    });

    describe('maskSensitiveData', () => {
        it('should mask email addresses with multiple @ symbols', () => {
            // test.at@example.com -> local='test.at' (len 7) -> 't' + '*****' + 't' -> 't*****t@example.com'
            expect(maskSensitiveData('test.at@example.com', 'email')).toBe('t*****t@example.com');
        });

        it('should mask phone numbers with length limits', () => {
            expect(maskSensitiveData('12345678901234567890', 'phone')).toBe('************7890');
        });

        it('should handle short email locals', () => {
            expect(maskSensitiveData('a@b.com', 'email')).toBe('a*@b.com');
            expect(maskSensitiveData('ab@c.com', 'email')).toBe('a*@c.com');
        });
    });

    describe('case conversion', () => {
        it('camelCase', () => {
            expect(camelCase('hello world')).toBe('helloWorld');
            expect(camelCase('hello-world')).toBe('helloWorld');
        });

        it('kebabCase', () => {
            expect(kebabCase('helloWorld')).toBe('hello-world');
            expect(kebabCase('Hello World')).toBe('hello-world');
        });

        it('snakeCase', () => {
            expect(snakeCase('helloWorld')).toBe('hello_world');
        });

        it('capitalize', () => {
            expect(capitalize('hello')).toBe('Hello');
        });
    });
});
