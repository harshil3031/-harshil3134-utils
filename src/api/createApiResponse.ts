export interface ApiSuccessResponse<T> {
  success: true;
  message?: string | undefined;
  data: T;
  meta?: Record<string, unknown> | undefined;
}

export function createApiResponse<T>(
  data: T,
  options?: {
    message?: string;
    meta?: Record<string, unknown>;
  }
): ApiSuccessResponse<T> {
  return {
    success: true,
    message: options?.message,
    data,
    meta: options?.meta,
  };
}