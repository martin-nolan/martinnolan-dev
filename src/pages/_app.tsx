import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { ErrorBoundary } from '@/ui/error-boundary';
import { Toaster as Sonner } from '@/ui/sonner';
import { ThemeProvider } from '@/ui/theme-context';
import { Toaster } from '@/ui/toaster';
import { TooltipProvider } from '@/ui/tooltip';
import '@/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Bulletproof _app.tsx pattern - no global getInitialProps
export default function MyApp({ Component, pageProps }: AppProps) {
  // Enhanced production debugging - log app initialization
  useEffect(() => {
    const appContext = {
      timestamp: new Date().toISOString(),
      nextVersion: process.env.NEXT_PUBLIC_NEXT_VERSION || 'unknown',
      environment: process.env.NODE_ENV,
      netlifyContext: process.env.NEXT_PUBLIC_NETLIFY_CONTEXT,
      buildId:
        typeof window !== 'undefined' && (window as any).__NEXT_DATA__
          ? (window as any).__NEXT_DATA__.buildId
          : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    };

    // Log app initialization for production debugging
    console.log('🚀 App Initialized - Context:', appContext);

    // Debug Component to ensure it's not undefined
    console.log('🔍 Component Debug:', {
      componentName: Component?.name || 'Unknown',
      componentType: typeof Component,
      hasGetInitialProps: !!(Component as unknown)?.getInitialProps,
      componentKeys: Component ? Object.keys(Component) : 'Component is undefined',
    });

    // Monitor for unhandled errors that might be related to getInitialProps
    const handleUnhandledError = (event: ErrorEvent) => {
      console.error('🚨 Unhandled Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        context: appContext,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 Unhandled Promise Rejection:', {
        reason: event.reason,
        context: appContext,
      });
    };

    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [Component]);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Component {...pageProps} />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
