import { AppError } from "./AppError";
import { getRuntimeEnvironment } from "../internal/runtime";

export function errorSerializer(error: unknown) {
  const isProduction = getRuntimeEnvironment() === "production";

  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      ...(isProduction ? {} : { stack: error.stack })
    };
  }

  return {
    success: false,
    message: isProduction
      ? "Internal Server Error"
      : (error as Error)?.message || "Unknown Error",
    statusCode: 500,
    ...(isProduction ? {} : { stack: (error as Error)?.stack })
  };
}