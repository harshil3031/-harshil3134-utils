import { LogLevel } from "./LogLevel";

export type LogTransport = (entry: LogEntry) => void;

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown> | undefined;
  error?: unknown;
}

export class Logger {
  private level: LogLevel;
  private transport: LogTransport;

  constructor(level: LogLevel, transport: LogTransport) {
    this.level = level;
    this.transport = transport;
  }

  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: unknown
  ) {
    if (level < this.level) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };

    this.transport(entry);
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log(LogLevel.WARN, message, context);
  }

  error(
    message: string,
    error?: unknown,
    context?: Record<string, unknown>
  ) {
    this.log(LogLevel.ERROR, message, context, error);
  }
}