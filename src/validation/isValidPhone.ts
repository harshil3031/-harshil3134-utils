/**
 * Validates whether the given string is a valid phone number.
 * Supports basic E.164-like formats.
 * 
 * @param phone - The string to validate
 * @returns True if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/[\s()-]/g, ""));
}
