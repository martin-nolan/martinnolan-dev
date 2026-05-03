export function logError(message: string, context?: Record<string, unknown>): void {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ERROR]', message, context ?? '');
  }
}
