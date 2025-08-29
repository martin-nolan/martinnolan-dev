import { NextApiRequest, NextApiResponse } from 'next';

import {
  handleCorsPreflightRequest,
  setCorsHeaders,
  validateMethod,
  validateUrlParameter,
  handleApiError,
  validateUrl,
} from '@/lib/api-utils';
import { serverEnv } from '@/lib/env';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight requests
  if (handleCorsPreflightRequest(req, res)) {
    return;
  }

  // Validate HTTP method
  if (!validateMethod(req, res, ['GET'])) {
    return;
  }

  // Validate URL parameter
  const url = validateUrlParameter(req, res);
  if (!url) {
    return;
  }

  try {
    // Server-side execution check
    if (typeof window !== 'undefined') {
      return res.status(500).json({ error: 'Server-side only' });
    }

    // Validate URL security
    const urlValidation = validateUrl(url);
    if (!urlValidation.isValid) {
      return res.status(urlValidation.error === 'Strapi configuration missing' ? 500 : 403).json({
        message: urlValidation.error,
      });
    }

    // Fetch PDF from Strapi
    const response = await fetchPdfFromStrapi(url);
    const contentType = response.headers.get('content-type') || 'application/pdf';
    const buffer = await response.arrayBuffer();

    // Set response headers
    setPdfResponseHeaders(res, contentType);
    setCorsHeaders(res);

    // Send the PDF buffer
    res.status(200).end(Buffer.from(buffer));
  } catch (error) {
    handleApiError(res, error);
  }
}

/**
 * Fetches PDF from Strapi with proper authentication
 */
async function fetchPdfFromStrapi(url: string): Promise<Response> {
  // Prepare headers for Strapi media fetch
  const fetchHeaders: Record<string, string> = {
    'User-Agent': 'Martin-Nolan-CV-Viewer',
    Accept: 'application/pdf,*/*',
    'Cache-Control': 'no-cache',
  };

  // Add authorization if available for private media files
  if (serverEnv.strapi?.apiToken) {
    fetchHeaders.Authorization = `Bearer ${serverEnv.strapi.apiToken}`;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: fetchHeaders,
    });
  } catch (fetchError) {
    throw new Error(
      `Network error fetching PDF: ${
        fetchError instanceof Error ? fetchError.message : 'Unknown error'
      }`
    );
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch PDF: ${response.status} - ${response.statusText}`);
  }

  return response;
}

/**
 * Sets appropriate headers for PDF response
 */
function setPdfResponseHeaders(res: NextApiResponse, contentType: string): void {
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', 'inline');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Allow iframe embedding from same origin
  res.setHeader('X-Content-Type-Options', 'nosniff');
}
