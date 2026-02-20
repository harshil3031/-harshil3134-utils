export interface EnvSchema<T> {
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
export function validateEnv<T extends Record<string, any>>(
  schema: EnvSchema<T>,
  envSource: Record<string, string | undefined> = typeof process !== 'undefined' ? process.env : {}
): T {
  const result: any = {};
  const missing: string[] = [];
  const invalid: string[] = [];

  for (const key in schema) {
    const config = schema[key]!;
    let value = envSource[key];

    if (!value && config.default !== undefined) {
      value = String(config.default);
    }

    if (!value) {
      if (config.required) {
        missing.push(key);
      }
      continue;
    }

    // Parse types
    let parsedValue: any = value;
    if (config.type === "number") {
      parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        invalid.push(`${key} (must be a number)`);
        continue;
      }
    } else if (config.type === "boolean") {
      parsedValue = value === "true" || value === "1" || value === "yes";
    }

    // Custom validation
    if (config.validate && !config.validate(parsedValue)) {
      invalid.push(`${key} (failed validation)`);
      continue;
    }

    result[key] = parsedValue;
  }

  if (missing.length > 0 || invalid.length > 0) {
    const errors = [
      missing.length > 0 ? `Missing: ${missing.join(", ")}` : "",
      invalid.length > 0 ? `Invalid: ${invalid.join(", ")}` : "",
    ].filter(Boolean);
    throw new Error(`Environment validation failed: ${errors.join("; ")}`);
  }

  return result as T;
}