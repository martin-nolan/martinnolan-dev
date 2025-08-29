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
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError('ErrorBoundary caught an error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
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
            <Button onClick={() => window.location.reload()} className="w-full">
              Refresh Page
            </Button>
            {clientEnv.isDevelopment && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Error Details
                </summary>
                <pre className="mt-2 text-xs text-red-400">{this.state.error.toString()}</pre>
              </details>
            )}
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
