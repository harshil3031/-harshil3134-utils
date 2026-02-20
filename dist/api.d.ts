interface ApiSuccessResponse<T> {
    success: true;
    message?: string | undefined;
    data: T;
    meta?: Record<string, unknown> | undefined;
}
declare function createApiResponse<T>(data: T, options?: {
    message?: string;
    meta?: Record<string, unknown>;
}): ApiSuccessResponse<T>;

interface ApiErrorResponse {
    success: false;
    message: string;
    code?: string | undefined;
    statusCode: number;
    meta?: Record<string, unknown> | undefined;
}
declare function createErrorResponse(message: string, statusCode?: number, code?: string, meta?: Record<string, unknown>): ApiErrorResponse;

interface PaginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
declare function createPaginationMeta(page: number, limit: number, totalItems: number): PaginationMeta;

interface ParsedQueryParams {
    page: number;
    limit: number;
    sort?: string | undefined;
    order?: "asc" | "desc" | undefined;
    search?: string | undefined;
}
declare function parseQueryParams(params: Record<string, string | undefined>): ParsedQueryParams;

export { type ApiErrorResponse, type ApiSuccessResponse, type PaginationMeta, type ParsedQueryParams, createApiResponse, createErrorResponse, createPaginationMeta, parseQueryParams };
