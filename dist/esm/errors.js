// src/errors/AppError.ts
var AppError = class extends Error {
  constructor(message, statusCode = 500, code, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
};

// src/errors/ErrorCodes.ts
var ErrorCodes = /* @__PURE__ */ ((ErrorCodes2) => {
  ErrorCodes2["VALIDATION_ERROR"] = "VALIDATION_ERROR";
  ErrorCodes2["UNAUTHORIZED"] = "UNAUTHORIZED";
  ErrorCodes2["FORBIDDEN"] = "FORBIDDEN";
  ErrorCodes2["NOT_FOUND"] = "NOT_FOUND";
  ErrorCodes2["CONFLICT"] = "CONFLICT";
  ErrorCodes2["INTERNAL_ERROR"] = "INTERNAL_ERROR";
  return ErrorCodes2;
})(ErrorCodes || {});

// src/internal/runtime.ts
var currentEnv = (function() {
  if (typeof process !== "undefined" && process.env) {
    const nodeEnv = process.env["NODE_ENV"];
    if (nodeEnv === "production" || nodeEnv === "test") return nodeEnv;
  }
  return "development";
})();
typeof process !== "undefined" && process.versions != null && process.versions.node != null;
function getRuntimeEnvironment() {
  return currentEnv;
}

// src/errors/errorSerializer.ts
function errorSerializer(error) {
  const isProduction = getRuntimeEnvironment() === "production";
  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      ...isProduction ? {} : { stack: error.stack }
    };
  }
  return {
    success: false,
    message: isProduction ? "Internal Server Error" : (error == null ? void 0 : error.message) || "Unknown Error",
    statusCode: 500,
    ...isProduction ? {} : { stack: error == null ? void 0 : error.stack }
  };
}

export { AppError, ErrorCodes, errorSerializer };
//# sourceMappingURL=errors.js.map
//# sourceMappingURL=errors.js.map