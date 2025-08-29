/**
 * Production error monitoring and reporting system
 * Provides comprehensive error tracking for debugging deployment issues
 */

import { captureFrameworkDiagnostics, analyzeComponent } from './diagnostics';

export interface ErrorReport {
  id: string;
  timestamp: string;
  type: 'javascript' | 'promise' | 'react' | 'network' | 'custom';
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  diagnostics: ReturnType<typeof captureFrameworkDiagnostics>;
  context?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ErrorMonitorConfig {
  enableConsoleLogging: boolean;
  enableLocalStorage: boolean;
  maxStoredErrors: number;
  enableGetInitialPropsTracking: boolean;
}

class ErrorMonitor {
  private config: ErrorMonitorConfig;
  private errors: ErrorReport[] = [];
  private isInitialized = false;

  constructor(config: Partial<ErrorMonitorConfig> = {}) {
    const isDev = process.env.NODE_ENV === 'development';

    this.config = {
      enableConsoleLogging: isDev, // Only log in development
      enableLocalStorage: isDev, // Only store in development
      maxStoredErrors: isDev ? 50 : 5, // Minimal storage in production
      enableGetInitialPropsTracking: true, // Keep this for critical error detection
      ...config,
    };
  }

  /**
   * Initialize error monitoring
   */
  initialize(): () => void {
    if (this.isInitialized || typeof window === 'undefined') {
      return () => {}; // No-op for server-side or already initialized
    }

    this.isInitialized = true;

    // Load existing errors from localStorage
    this.loadStoredErrors();

    // Set up error listeners
    const cleanup = this.setupErrorListeners();

    // Log initialization only in development
    if (process.env.NODE_ENV === 'development') {
      this.logInfo('Error monitoring initialized', {
        config: this.config,
        existingErrors: this.errors.length,
      });
    }

    return cleanup;
  }

  /**
   * Set up all error event listeners
   */
  private setupErrorListeners(): () => void {
    const cleanupFunctions: Array<() => void> = [];

    // JavaScript errors
    const handleError = (event: ErrorEvent) => {
      this.captureError({
        type: 'javascript',
        message: event.message,
        stack: event.error?.stack,
        severity: this.determineSeverity(event.message, event.error?.stack),
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error,
        },
      });
    };

    // Promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      this.captureError({
        type: 'promise',
        message: reason?.message || String(reason),
        stack: reason?.stack,
        severity: this.determineSeverity(reason?.message, reason?.stack),
        context: {
          reason: reason,
          promise: event.promise,
        },
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    cleanupFunctions.push(() => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }

  /**
   * Capture and process an error
   */
  captureError(errorData: Partial<ErrorReport>): void {
    const error: ErrorReport = {
      id: this.generateErrorId(),
      timestamp: new Date().toISOString(),
      type: errorData.type || 'custom',
      message: errorData.message || 'Unknown error',
      stack: errorData.stack,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      diagnostics: captureFrameworkDiagnostics(),
      context: errorData.context,
      severity: errorData.severity || 'medium',
    };

    // Add to errors array
    this.errors.push(error);

    // Maintain max errors limit
    if (this.errors.length > this.config.maxStoredErrors) {
      this.errors = this.errors.slice(-this.config.maxStoredErrors);
    }

    // Store in localStorage if enabled
    if (this.config.enableLocalStorage) {
      this.storeErrors();
    }

    // Log to console if enabled
    if (this.config.enableConsoleLogging) {
      this.logError(error);
    }

    // Special handling for getInitialProps errors
    if (this.config.enableGetInitialPropsTracking && this.isGetInitialPropsError(error)) {
      this.handleGetInitialPropsError(error);
    }
  }

  /**
   * Check if error is related to getInitialProps
   */
  private isGetInitialPropsError(error: ErrorReport): boolean {
    const message = error.message.toLowerCase();
    const stack = error.stack?.toLowerCase() || '';

    return (
      message.includes('getinitialprops') ||
      stack.includes('getinitialprops') ||
      message.includes('cannot read properties of undefined') ||
      stack.includes('_app.getInitialProps')
    );
  }

  /**
   * Handle getInitialProps specific errors
   */
  private handleGetInitialPropsError(error: ErrorReport): void {
    // Only log detailed info in development, but always mark as critical
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 getInitialProps Error Detected');
      console.error('Error Details:', error);

      // Try to analyze current component state
      if (typeof window !== 'undefined' && (window as any).__NEXT_DATA__) {
        const nextData = (window as any).__NEXT_DATA__;
        console.log('Next.js Data:', {
          page: nextData.page,
          buildId: nextData.buildId,
          props: nextData.props,
          query: nextData.query,
        });
      }

      // Log component analysis if available
      if (error.context && error.context.component) {
        const componentAnalysis = analyzeComponent(error.context.component);
        console.log('Component Analysis:', componentAnalysis);
      }

      console.groupEnd();
    } else {
      // In production, only log critical errors to console.error
      console.error('Critical getInitialProps error:', error.message);
    }

    // Mark as critical severity
    error.severity = 'critical';
  }

  /**
   * Determine error severity based on message and stack
   */
  private determineSeverity(message?: string, stack?: string): ErrorReport['severity'] {
    if (!message) return 'low';

    const msg = message.toLowerCase();
    const stk = stack?.toLowerCase() || '';

    // Critical errors
    if (
      msg.includes('getinitialprops') ||
      msg.includes('cannot read properties of undefined') ||
      stk.includes('getinitialprops')
    ) {
      return 'critical';
    }

    // High severity errors
    if (
      msg.includes('network error') ||
      msg.includes('failed to fetch') ||
      msg.includes('syntax error') ||
      msg.includes('reference error')
    ) {
      return 'high';
    }

    // Medium severity errors
    if (msg.includes('type error') || msg.includes('range error') || msg.includes('eval error')) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Generate unique error ID
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Log error to console with formatting
   */
  private logError(error: ErrorReport): void {
    const severityEmoji = {
      low: '🟡',
      medium: '🟠',
      high: '🔴',
      critical: '🚨',
    };

    console.group(`${severityEmoji[error.severity]} Error Monitor - ${error.type.toUpperCase()}`);
    console.error('Message:', error.message);

    if (error.stack) {
      console.error('Stack:', error.stack);
    }

    console.log('Context:', error.context);
    console.log('Diagnostics:', error.diagnostics);
    console.log('Error ID:', error.id);
    console.groupEnd();
  }

  /**
   * Log info message
   */
  private logInfo(message: string, data?: any): void {
    console.log(`ℹ️ Error Monitor: ${message}`, data || '');
  }

  /**
   * Store errors in localStorage
   */
  private storeErrors(): void {
    try {
      localStorage.setItem('error-monitor-logs', JSON.stringify(this.errors));
    } catch (e) {
      // localStorage might be full or unavailable
      console.warn('Failed to store errors in localStorage:', e);
    }
  }

  /**
   * Load errors from localStorage
   */
  private loadStoredErrors(): void {
    try {
      const stored = localStorage.getItem('error-monitor-logs');
      if (stored) {
        this.errors = JSON.parse(stored);
      }
    } catch (e) {
      // Invalid JSON or localStorage unavailable
      console.warn('Failed to load stored errors:', e);
      this.errors = [];
    }
  }

  /**
   * Get all captured errors
   */
  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  /**
   * Get errors by severity
   */
  getErrorsBySeverity(severity: ErrorReport['severity']): ErrorReport[] {
    return this.errors.filter((error) => error.severity === severity);
  }

  /**
   * Clear all stored errors
   */
  clearErrors(): void {
    this.errors = [];
    if (this.config.enableLocalStorage) {
      try {
        localStorage.removeItem('error-monitor-logs');
      } catch (e) {
        console.warn('Failed to clear stored errors:', e);
      }
    }
  }

  /**
   * Get error summary
   */
  getSummary(): {
    total: number;
    bySeverity: Record<string, number>;
    byType: Record<string, number>;
  } {
    const bySeverity: Record<string, number> = {};
    const byType: Record<string, number> = {};

    this.errors.forEach((error) => {
      bySeverity[error.severity] = (bySeverity[error.severity] || 0) + 1;
      byType[error.type] = (byType[error.type] || 0) + 1;
    });

    return {
      total: this.errors.length,
      bySeverity,
      byType,
    };
  }
}

// Global error monitor instance
let globalErrorMonitor: ErrorMonitor | null = null;

/**
 * Initialize global error monitoring
 */
export function initializeErrorMonitoring(config?: Partial<ErrorMonitorConfig>): () => void {
  if (globalErrorMonitor) {
    console.warn('Error monitoring already initialized');
    return () => {};
  }

  globalErrorMonitor = new ErrorMonitor(config);
  return globalErrorMonitor.initialize();
}

/**
 * Get the global error monitor instance
 */
export function getErrorMonitor(): ErrorMonitor | null {
  return globalErrorMonitor;
}

/**
 * Manually report an error
 */
export function reportError(
  message: string,
  context?: Record<string, any>,
  severity?: ErrorReport['severity']
): void {
  if (globalErrorMonitor) {
    globalErrorMonitor.captureError({
      type: 'custom',
      message,
      context,
      severity,
    });
  }
}

/**
 * Report component-related error
 */
export function reportComponentError(
  component: any,
  message: string,
  context?: Record<string, unknown>
): void {
  if (globalErrorMonitor) {
    const componentAnalysis = analyzeComponent(component);
    globalErrorMonitor.captureError({
      type: 'react',
      message,
      severity: 'high',
      context: {
        ...context,
        component: componentAnalysis,
      },
    });
  }
}
