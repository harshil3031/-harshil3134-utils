/**
 * Validates whether the given string is a valid URL.
 * 
 * @param url - The string to validate
 * @returns True if valid, false otherwise
 */
export function isValidURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
