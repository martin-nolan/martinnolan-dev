import React from 'react';

import { clientEnv } from '@/lib/env';
import { logError } from '@/lib/logger';
import { Button, GlassCard, GradientText } from '@/ui';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  errorId?: string;
}

interface ErrorContext {
  timestamp: string;
  userAgent: string;
  url: string;
  nextVersion: string;
  buildId?: string;
  environment: string;
  netlifyContext?: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    return { hasError: true, error, errorId };
  }

  private captureErrorContext(): ErrorContext {
    const context: ErrorContext = {
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      nextVersion: process.env.NEXT_PUBLIC_NEXT_VERSION || 'unknown',
      environment: process.env.NODE_ENV || 'unknown',
    };

    // Capture Next.js build ID if available
    if (typeof window !== 'undefined' && (window as any).__NEXT_DATA__) {
      const nextData = (window as any).__NEXT_DATA__;
      context.buildId = nextData.buildId;
    }

    // Capture Netlify context if available
    if (process.env.NEXT_PUBLIC_NETLIFY_CONTEXT) {
      context.netlifyContext = process.env.NEXT_PUBLIC_NETLIFY_CONTEXT;
    }

    return context;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorContext = this.captureErrorContext();

    // Enhanced error logging with full context
    const enhancedErrorData = {
      errorId: this.state.errorId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      context: errorContext,
      props: this.props,
    };

    // Log through our standard logger (handles dev/prod appropriately)
    logError('ErrorBoundary caught an error', enhancedErrorData);

    // Store error info in state for display
    this.setState({ errorInfo });

    // Check for specific getInitialProps-related errors (always log critical errors)
    if (error.message.includes('getInitialProps') || error.stack?.includes('getInitialProps')) {
      console.error('Critical getInitialProps error:', error.message);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <GlassCard className="max-w-md p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              <GradientText>Oops! Something went wrong</GradientText>
            </h2>
            <p className="mb-6 text-muted-foreground">
              We've encountered an unexpected error. Please try refreshing the page.
            </p>

            {/* Error ID for tracking */}
            {this.state.errorId && (
              <p className="mb-4 text-xs text-muted-foreground">Error ID: {this.state.errorId}</p>
            )}

            <Button onClick={() => window.location.reload()} className="mb-4 w-full">
              Refresh Page
            </Button>

            {/* Error details - only show in development */}
            {this.state.error && clientEnv.isDevelopment && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Error Details (Development Mode)
                </summary>
                <div className="mt-2 space-y-2 text-xs">
                  <div>
                    <strong>Error:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-red-400">
                      {this.state.error.toString()}
                    </pre>
                  </div>

                  {this.state.error.stack && (
                    <div>
                      <strong>Stack Trace:</strong>
                      <pre className="mt-1 max-h-32 overflow-y-auto whitespace-pre-wrap text-[10px] text-red-400">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}

                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 max-h-32 overflow-y-auto whitespace-pre-wrap text-[10px] text-orange-400">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}

                  <div>
                    <strong>Environment:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-[10px] text-blue-400">
                      {JSON.stringify(this.captureErrorContext(), null, 2)}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
