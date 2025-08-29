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
  // Initialize error monitoring and diagnostics
  useEffect(() => {
    // Initialize error monitoring with production-optimized settings
    const errorMonitorCleanup = initializeErrorMonitoring();

    // Log diagnostics (only in development)
    logDiagnostics('App Bootstrap', {
      pagePropsKeys: pageProps ? Object.keys(pageProps) : 'No pageProps',
      hasPageProps: !!pageProps,
    });

    // Analyze the current component (only in development)
    logComponentDiagnostics(Component, 'Current Page Component');

    // Set up getInitialProps error monitoring (always enabled for critical errors)
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
