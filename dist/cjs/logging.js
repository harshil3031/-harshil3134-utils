'use strict';

// src/logging/LogLevel.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["DEBUG"] = 10] = "DEBUG";
  LogLevel2[LogLevel2["INFO"] = 20] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 30] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 40] = "ERROR";
  LogLevel2[LogLevel2["NONE"] = 100] = "NONE";
  return LogLevel2;
})(LogLevel || {});

// src/logging/Logger.ts
var Logger = class {
  constructor(level, transport) {
    this.level = level;
    this.transport = transport;
  }
  log(level, message, context, error) {
    if (level < this.level) return;
    const entry = {
      level,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      context,
      error
    };
    this.transport(entry);
  }
  debug(message, context) {
    this.log(10 /* DEBUG */, message, context);
  }
  info(message, context) {
    this.log(20 /* INFO */, message, context);
  }
  warn(message, context) {
    this.log(30 /* WARN */, message, context);
  }
  error(message, error, context) {
    this.log(40 /* ERROR */, message, context, error);
  }
};

// src/logging/ConsoleTransport.ts
var ConsoleTransport = (entry) => {
  const { level, message, timestamp, context, error } = entry;
  const base = `[${timestamp}] ${LogLevel[level]}: ${message}`;
  if (level === 40 /* ERROR */) {
    console.error(base, context != null ? context : {}, error != null ? error : "");
  } else if (level === 30 /* WARN */) {
    console.warn(base, context != null ? context : {});
  } else {
    console.log(base, context != null ? context : {});
  }
};

// src/logging/createLogger.ts
function createLogger(options) {
  var _a, _b;
  return new Logger(
    (_a = options == null ? void 0 : options.level) != null ? _a : 20 /* INFO */,
    (_b = options == null ? void 0 : options.transport) != null ? _b : ConsoleTransport
  );
}

exports.ConsoleTransport = ConsoleTransport;
exports.LogLevel = LogLevel;
exports.Logger = Logger;
exports.createLogger = createLogger;
//# sourceMappingURL=logging.js.map
//# sourceMappingURL=logging.js.map