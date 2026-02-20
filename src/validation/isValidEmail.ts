/**
 * Validates whether the given string is a correctly formatted email address.
 * 
 * @param email - The string to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
