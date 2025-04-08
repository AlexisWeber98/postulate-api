export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: any;
  error?: Error;
}

export class Logger {
  private static formatMessage(entry: Omit<LogEntry, "timestamp">): string {
    return JSON.stringify({
      ...entry,
      timestamp: new Date().toISOString(),
    });
  }

  static error(message: string, error?: Error, context?: any) {
    console.error(
      this.formatMessage({
        level: LogLevel.ERROR,
        message,
        error,
        context,
      }),
    );
  }

  static warn(message: string, context?: any) {
    console.warn(
      this.formatMessage({
        level: LogLevel.WARN,
        message,
        context,
      }),
    );
  }

  static info(message: string, context?: any) {
    console.info(
      this.formatMessage({
        level: LogLevel.INFO,
        message,
        context,
      }),
    );
  }

  static debug(message: string, context?: any) {
    console.debug(
      this.formatMessage({
        level: LogLevel.DEBUG,
        message,
        context,
      }),
    );
  }
}
