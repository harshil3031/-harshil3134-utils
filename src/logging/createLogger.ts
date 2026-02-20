import { Logger } from "./Logger";
import { LogLevel } from "./LogLevel";
import { ConsoleTransport } from "./ConsoleTransport";

export function createLogger(options?: {
  level?: LogLevel;
  transport?: (entry: any) => void;
}) {
  return new Logger(
    options?.level ?? LogLevel.INFO,
    options?.transport ?? ConsoleTransport
  );
}