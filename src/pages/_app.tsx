import type { AppProps } from 'next/app';

import { ErrorBoundary } from '@/ui/error-boundary';
import '@/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
