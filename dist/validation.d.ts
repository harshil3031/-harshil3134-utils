declare function assert(condition: unknown, message?: string): asserts condition;

declare function invariant(condition: unknown, message: string): asserts condition;

declare function isNonEmptyString(value: unknown): value is string;
declare function isUUID(value: unknown): value is string;

declare function safeParseJSON<T>(value: string): {
    success: true;
    data: T;
} | {
    success: false;
    error: Error;
};

interface EnvSchema<T> {
    [key: string]: {
        type?: "string" | "number" | "boolean";
        required?: boolean;
        default?: any;
        validate?: (value: any) => boolean;
    };
}
/**
 * Validates and parses environment variables based on a schema.
 *
 * @example
 * ```ts
 * const config = validateEnv({
 *   PORT: { type: 'number', default: 3000 },
 *   API_KEY: { required: true }
 * }, process.env);
 * ```
 */
declare function validateEnv<T extends Record<string, any>>(schema: EnvSchema<T>, envSource?: Record<string, string | undefined>): T;

/**
 * Validates whether the given string is a correctly formatted email address.
 *
 * @param email - The string to validate
 * @returns True if valid, false otherwise
 */
declare function isValidEmail(email: string): boolean;

/**
 * Validates whether the given string is a valid URL.
 *
 * @param url - The string to validate
 * @returns True if valid, false otherwise
 */
declare function isValidURL(url: string): boolean;

/**
 * Validates whether the given string is a valid phone number.
 * Supports basic E.164-like formats.
 *
 * @param phone - The string to validate
 * @returns True if valid, false otherwise
 */
declare function isValidPhone(phone: string): boolean;

interface PasswordStrengthResult {
    score: number;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    isLengthValid: boolean;
    isValid: boolean;
}
/**
 * Checks the strength of a password based on common security requirements.
 *
 * @param password - The password string to check
 * @returns A detailed result object containing score and specific criteria matches
 */
declare function isStrongPassword(password: string): PasswordStrengthResult;

export { type EnvSchema, type PasswordStrengthResult, assert, invariant, isNonEmptyString, isStrongPassword, isUUID, isValidEmail, isValidPhone, isValidURL, safeParseJSON, validateEnv };
