import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import {
  logDiagnostics,
  logComponentDiagnostics,
  monitorGetInitialPropsErrors,
} from '@/lib/diagnostics';
import { initializeErrorMonitoring } from '@/lib/error-monitoring';
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
  // Enhanced production debugging with comprehensive diagnostics
  useEffect(() => {
    // Initialize comprehensive error monitoring
    const errorMonitorCleanup = initializeErrorMonitoring({
      enableConsoleLogging: true,
      enableLocalStorage: true,
      enableGetInitialPropsTracking: true,
      maxStoredErrors: 100,
    });

    // Log comprehensive framework initialization diagnostics
    logDiagnostics('App Bootstrap', {
      pagePropsKeys: pageProps ? Object.keys(pageProps) : 'No pageProps',
      hasPageProps: !!pageProps,
    });

    // Analyze the current component for potential issues
    logComponentDiagnostics(Component, 'Current Page Component');

    // Set up specialized getInitialProps error monitoring
    const diagnosticsCleanup = monitorGetInitialPropsErrors();

    return () => {
      errorMonitorCleanup();
      diagnosticsCleanup();
    };
  }, [Component, pageProps]);

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
