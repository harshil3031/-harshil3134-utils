declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly code?: string | undefined;
    constructor(message: string, statusCode?: number, code?: string, isOperational?: boolean);
}

declare enum ErrorCodes {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    INTERNAL_ERROR = "INTERNAL_ERROR"
}

declare function errorSerializer(error: unknown): {
    stack?: string;
    success: boolean;
    message: string;
    code: string | undefined;
    statusCode: number;
} | {
    stack?: string;
    success: boolean;
    message: string;
    statusCode: number;
};

export { AppError, ErrorCodes, errorSerializer };
