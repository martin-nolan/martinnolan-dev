/**
 * Server-only PDF extraction utilities
 * This file should only be imported in server-side code (API routes, getStaticProps, etc.)
 */

/**
 * Extract text from PDF URL (server-side only)
 */
export async function extractPdfTextServer(pdfUrl: string): Promise<string> {
  // Only run on server side
  if (typeof window !== 'undefined') {
    return '[Failed to extract: Client-side execution not supported]';
  }

  try {
    // Validate URL
    if (!pdfUrl || typeof pdfUrl !== 'string') {
      return '[Failed to extract: Invalid PDF URL]';
    }

    // Fetch PDF
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      return `[Failed to extract: HTTP ${response.status}]`;
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // Dynamic import to keep pdf-parse out of client bundles
    const { default: pdfParse } = await import('pdf-parse');
    const data = await pdfParse(buffer);

    return data.text || '[Failed to extract: No text found]';
  } catch (error) {
    console.error('PDF extraction error:', error);
    return `[Failed to extract: ${error instanceof Error ? error.message : 'Unknown error'}]`;
  }
}
