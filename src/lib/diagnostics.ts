/**
 * Runtime diagnostics utility for Next.js state monitoring
 * Helps debug deployment issues and framework initialization
 */

export interface DiagnosticInfo {
  timestamp: string;
  nextVersion: string;
  buildId: string;
  renderMode: string;
  environment: string;
  netlifyContext?: string;
  nodeVersion?: string;
  userAgent: string;
  url: string;
  hasWindow: boolean;
  hasDocument: boolean;
  isHydrated: boolean;
  routerReady: boolean;
}

export interface ComponentDiagnostic {
  componentName: string;
  componentType: string;
  hasGetInitialProps: boolean;
  componentKeys: string[] | string;
  isValidComponent: boolean;
}

/**
 * Captures comprehensive Next.js and environment diagnostics
 */
export function captureFrameworkDiagnostics(): DiagnosticInfo {
  const isClient = typeof window !== 'undefined';

  // Get Next.js build information
  let buildId = 'unknown';
  let renderMode = 'unknown';
  let routerReady = false;

  if (isClient && (window as any).__NEXT_DATA__) {
    const nextData = (window as any).__NEXT_DATA__;
    buildId = nextData.buildId || 'unknown';
    renderMode = nextData.isFallback ? 'fallback' : nextData.page ? 'static' : 'dynamic';
  }

  // Check router readiness
  if (isClient && (window as any).__NEXT_ROUTER__) {
    routerReady = !!(window as any).__NEXT_ROUTER__.isReady;
  }

  // Detect Netlify deployment context
  const netlifyContext =
    process.env.NEXT_PUBLIC_NETLIFY_CONTEXT ||
    (isClient && (window as any).NETLIFY_CONTEXT) ||
    undefined;

  return {
    timestamp: new Date().toISOString(),
    nextVersion: process.env.NEXT_PUBLIC_NEXT_VERSION || 'unknown',
    buildId,
    renderMode,
    environment: process.env.NODE_ENV || 'unknown',
    netlifyContext,
    nodeVersion: process.env.NODE_VERSION || process.version || 'unknown',
    userAgent: isClient && navigator ? navigator.userAgent : 'server',
    url: isClient ? window.location.href : 'server',
    hasWindow: isClient,
    hasDocument: typeof document !== 'undefined',
    isHydrated: isClient && !!(window as any).__NEXT_HYDRATED__,
    routerReady,
  };
}

/**
 * Analyzes a React component for Next.js compatibility
 */
export function analyzeComponent(Component: any): ComponentDiagnostic {
  if (!Component) {
    return {
      componentName: 'undefined',
      componentType: 'undefined',
      hasGetInitialProps: false,
      componentKeys: 'Component is undefined',
      isValidComponent: false,
    };
  }

  const componentName = Component.displayName || Component.name || 'Anonymous';
  const componentType = typeof Component;
  const hasGetInitialProps = !!(Component as any)?.getInitialProps;
  const componentKeys =
    componentType === 'function' || componentType === 'object'
      ? Object.keys(Component)
      : 'Not an object/function';

  const isValidComponent =
    componentType === 'function' &&
    (Component.prototype?.isReactComponent || typeof Component === 'function');

  return {
    componentName,
    componentType,
    hasGetInitialProps,
    componentKeys,
    isValidComponent,
  };
}

/**
 * Logs diagnostics (only in development)
 */
export function logDiagnostics(label: string, additionalData?: Record<string, any>): void {
  // Only log in development to reduce production overhead
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const diagnostics = captureFrameworkDiagnostics();

  console.group(`🔍 ${label} - Framework Diagnostics`);
  console.log('📊 System Info:', {
    nextVersion: diagnostics.nextVersion,
    buildId: diagnostics.buildId,
    environment: diagnostics.environment,
    netlifyContext: diagnostics.netlifyContext,
  });

  console.log('🌐 Runtime State:', {
    renderMode: diagnostics.renderMode,
    isHydrated: diagnostics.isHydrated,
    routerReady: diagnostics.routerReady,
  });

  if (additionalData) {
    console.log('📋 Additional Data:', additionalData);
  }

  console.groupEnd();
}

/**
 * Logs component analysis (only in development)
 */
export function logComponentDiagnostics(Component: any, label = 'Component Analysis'): void {
  // Only log in development to reduce production overhead
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const analysis = analyzeComponent(Component);

  console.group(`🧩 ${label}`);
  console.log('Component Details:', analysis);

  if (!analysis.isValidComponent) {
    console.warn('⚠️ Component Validation Issues:', {
      isUndefined: !Component,
      wrongType: analysis.componentType !== 'function',
    });
  }

  if (analysis.hasGetInitialProps) {
    console.log('📄 getInitialProps detected - this component uses server-side rendering');
  }

  console.groupEnd();
}

/**
 * Monitors for getInitialProps-related errors specifically
 */
export function monitorGetInitialPropsErrors(): () => void {
  const handleError = (event: ErrorEvent) => {
    const isGetInitialPropsError =
      event.message?.includes('getInitialProps') ||
      event.error?.stack?.includes('getInitialProps') ||
      event.error?.message?.includes('getInitialProps');

    if (isGetInitialPropsError) {
      console.group('🚨 getInitialProps Error Detected');
      console.error('Error Details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
      });

      logDiagnostics('Error Context');
      console.groupEnd();
    }
  };

  const handleRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const isGetInitialPropsError =
      reason?.message?.includes('getInitialProps') || reason?.stack?.includes('getInitialProps');

    if (isGetInitialPropsError) {
      console.group('🚨 getInitialProps Promise Rejection');
      console.error('Rejection Reason:', reason);
      logDiagnostics('Rejection Context');
      console.groupEnd();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }

  return () => {}; // No-op for server-side
}
