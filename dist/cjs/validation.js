'use strict';

// src/validation/assert.ts
function assert(condition, message = "Assertion failed") {
  if (!condition) {
    throw new Error(message);
  }
}

// src/validation/invariant.ts
function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// src/validation/typeGuards.ts
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
function isUUID(value) {
  if (typeof value !== "string") return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

// src/validation/safeParseJSON.ts
function safeParseJSON(value) {
  try {
    const parsed = JSON.parse(value);
    return { success: true, data: parsed };
  } catch (error) {
    return { success: false, error };
  }
}

// src/validation/validateEnv.ts
function validateEnv(schema, envSource = typeof process !== "undefined" ? process.env : {}) {
  const result = {};
  const missing = [];
  const invalid = [];
  for (const key in schema) {
    const config = schema[key];
    let value = envSource[key];
    if (!value && config.default !== void 0) {
      value = String(config.default);
    }
    if (!value) {
      if (config.required) {
        missing.push(key);
      }
      continue;
    }
    let parsedValue = value;
    if (config.type === "number") {
      parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        invalid.push(`${key} (must be a number)`);
        continue;
      }
    } else if (config.type === "boolean") {
      parsedValue = value === "true" || value === "1" || value === "yes";
    }
    if (config.validate && !config.validate(parsedValue)) {
      invalid.push(`${key} (failed validation)`);
      continue;
    }
    result[key] = parsedValue;
  }
  if (missing.length > 0 || invalid.length > 0) {
    const errors = [
      missing.length > 0 ? `Missing: ${missing.join(", ")}` : "",
      invalid.length > 0 ? `Invalid: ${invalid.join(", ")}` : ""
    ].filter(Boolean);
    throw new Error(`Environment validation failed: ${errors.join("; ")}`);
  }
  return result;
}

// src/validation/isValidEmail.ts
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// src/validation/isValidURL.ts
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// src/validation/isValidPhone.ts
function isValidPhone(phone) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ""));
}

// src/validation/isStrongPassword.ts
function isStrongPassword(password) {
  const res = {
    score: 0,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    isLengthValid: password.length >= 8,
    isValid: false
  };
  if (res.hasUpperCase) res.score++;
  if (res.hasLowerCase) res.score++;
  if (res.hasNumber) res.score++;
  if (res.hasSpecialChar) res.score++;
  if (res.isLengthValid) res.score++;
  res.isValid = res.score >= 4 && res.isLengthValid;
  return res;
}

exports.assert = assert;
exports.invariant = invariant;
exports.isNonEmptyString = isNonEmptyString;
exports.isStrongPassword = isStrongPassword;
exports.isUUID = isUUID;
exports.isValidEmail = isValidEmail;
exports.isValidPhone = isValidPhone;
exports.isValidURL = isValidURL;
exports.safeParseJSON = safeParseJSON;
exports.validateEnv = validateEnv;
//# sourceMappingURL=validation.js.map
//# sourceMappingURL=validation.js.map