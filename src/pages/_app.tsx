import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import { ThemeProvider } from "@/shared/ui/theme-context";
import { Toaster } from "@/shared/ui/toaster";
import { TooltipProvider } from "@/shared/ui/tooltip";
import "@/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
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

export default MyApp;
