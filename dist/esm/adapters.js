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

// src/adapters/express/errorMiddleware.ts
function expressErrorMiddleware(err, req, res, next) {
  const serialized = errorSerializer(err);
  res.status(serialized.statusCode).json(serialized);
}

export { expressErrorMiddleware };
//# sourceMappingURL=adapters.js.map
//# sourceMappingURL=adapters.js.map