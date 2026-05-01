type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isServer: boolean;

  constructor() {
    this.isServer = typeof window === 'undefined';
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    // In production, only log errors and warnings
    if (!isDevelopment && level === 'debug') {
      return;
    }

    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...(context && { context }),
      environment: isDevelopment ? 'development' : 'production',
      side: this.isServer ? 'server' : 'client',
    };

    // In development, use console for better DX
    if (isDevelopment) {
      const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
      console[consoleMethod](`[${level.toUpperCase()}]`, message, context || '');
      return;
    }

    // In production, use structured logging
    // For server-side, you could integrate with external logging services here
    if (level === 'error' || level === 'warn') {
      // Only log errors and warnings in production
      if (this.isServer) {
        // Server-side: could send to external logging service
        console.error(JSON.stringify(logData));
      }
      // Client-side: silent in production to avoid console pollution
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }

  /**
   * Silent error handling - logs in development, silent in production
   */
  silentError(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV !== 'production') {
      this.error(message, context);
    }
    // Silent in production
  }

  /**
   * Silent warning - logs in development, silent in production
   */
  silentWarn(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV !== 'production') {
      this.warn(message, context);
    }
    // Silent in production
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logError = (message: string, context?: LogContext) => logger.error(message, context);

// Silent logging for production
export const silentError = (message: string, context?: LogContext) =>
  logger.silentError(message, context);
export const silentWarn = (message: string, context?: LogContext) =>
  logger.silentWarn(message, context);
