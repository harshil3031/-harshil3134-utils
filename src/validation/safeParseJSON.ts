export function safeParseJSON<T>(
  value: string
):
  | { success: true; data: T }
  | { success: false; error: Error } {
  try {
    const parsed = JSON.parse(value) as T;
    return { success: true, data: parsed };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}