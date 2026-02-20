declare enum LogLevel {
    DEBUG = 10,
    INFO = 20,
    WARN = 30,
    ERROR = 40,
    NONE = 100
}

type LogTransport = (entry: LogEntry) => void;
interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    context?: Record<string, unknown> | undefined;
    error?: unknown;
}
declare class Logger {
    private level;
    private transport;
    constructor(level: LogLevel, transport: LogTransport);
    private log;
    debug(message: string, context?: Record<string, unknown>): void;
    info(message: string, context?: Record<string, unknown>): void;
    warn(message: string, context?: Record<string, unknown>): void;
    error(message: string, error?: unknown, context?: Record<string, unknown>): void;
}

declare function createLogger(options?: {
    level?: LogLevel;
    transport?: (entry: any) => void;
}): Logger;

declare const ConsoleTransport: (entry: LogEntry) => void;

export { ConsoleTransport, type LogEntry, LogLevel, type LogTransport, Logger, createLogger };
