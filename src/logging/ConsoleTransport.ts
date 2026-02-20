import { LogEntry } from "./Logger";
import { LogLevel } from "./LogLevel";

export const ConsoleTransport = (entry: LogEntry) => {
  const { level, message, timestamp, context, error } = entry;

  const base = `[${timestamp}] ${LogLevel[level]}: ${message}`;

  if (level === LogLevel.ERROR) {
    console.error(base, context ?? {}, error ?? "");
  } else if (level === LogLevel.WARN) {
    console.warn(base, context ?? {});
  } else {
    console.log(base, context ?? {});
  }
};