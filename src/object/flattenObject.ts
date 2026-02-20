export function flattenObject(
  obj: Record<string, any>,
  parentKey = "",
  result: Record<string, any> = {}
): Record<string, any> {
  for (const key in obj) {
    const newKey = parentKey
      ? `${parentKey}.${key}`
      : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }

  return result;
}