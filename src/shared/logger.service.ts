import { Injectable } from '@nestjs/common';
const chalk = require('chalk'); // Use require for chalk

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

@Injectable()
export class LoggerService {
  private static logLevel: LogLevel = LogLevel.INFO;

  private static readonly LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
  };

  private static get timestamp(): string {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const date = String(dateObj.getDate()).padStart(2, '0');
    const hour = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${date} ${hour}:${minutes}`;
  }

  setLogLevel(logLevel: LogLevel): void {
    LoggerService.logLevel = logLevel;
  }

  private shouldLog(logLevel: LogLevel): boolean {
    return LoggerService.LOG_LEVELS[logLevel] <= LoggerService.LOG_LEVELS[LoggerService.logLevel];
  }

  error(message: string, context?: string): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.log(LogLevel.ERROR, message, context);
    }
  }

  warn(message: string, context?: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.log(LogLevel.WARN, message, context);
    }
  }

  info(message: string, context?: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.log(LogLevel.INFO, message, context);
    }
  }

  debug(message: string, context?: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.log(LogLevel.DEBUG, message, context);
    }
  }

  private log(level: LogLevel, message: string, context?: string): void {
    const logContext = context ? `[${context}] ` : '';
    const formattedMessage = `${LoggerService.timestamp} ${logContext}${message}`;

    switch (level) {
      case LogLevel.ERROR:
        console.error(chalk.red.bold(`[ERROR] ${formattedMessage}`));
        break;
      case LogLevel.WARN:
        console.warn(chalk.yellow(`[WARN] ${formattedMessage}`));
        break;
      case LogLevel.INFO:
        console.log(chalk.green(`[INFO] ${formattedMessage}`));
        break;
      case LogLevel.DEBUG:
        console.log(chalk.blue(`[DEBUG] ${formattedMessage}`));
        break;
      default:
        console.log(formattedMessage);
    }
  }
}