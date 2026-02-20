export interface PasswordStrengthResult {
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
export function isStrongPassword(password: string): PasswordStrengthResult {
    const res: PasswordStrengthResult = {
        score: 0,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[^A-Za-z0-9]/.test(password),
        isLengthValid: password.length >= 8,
        isValid: false,
    };

    if (res.hasUpperCase) res.score++;
    if (res.hasLowerCase) res.score++;
    if (res.hasNumber) res.score++;
    if (res.hasSpecialChar) res.score++;
    if (res.isLengthValid) res.score++;

    res.isValid = res.score >= 4 && res.isLengthValid;

    return res;
}
