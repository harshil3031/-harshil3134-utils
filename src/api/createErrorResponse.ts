export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string | undefined;
  statusCode: number;
  meta?: Record<string, unknown> | undefined;
}

export function createErrorResponse(
  message: string,
  statusCode = 500,
  code?: string,
  meta?: Record<string, unknown>
): ApiErrorResponse {
  return {
    success: false,
    message,
    statusCode,
    code,
    meta,
  };
}