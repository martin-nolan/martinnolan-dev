// Consolidated API utilities - flattened from complex nested structure
import type { NextApiRequest, NextApiResponse } from 'next';

import { clientEnv } from '@/lib/env';

// Types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface UrlValidationResult {
  isValid: boolean;
  error?: string;
  parsedUrl?: URL;
}

// Method validation
export function validateMethod(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: string[]
): boolean {
  if (!allowedMethods.includes(req.method || '')) {
    res.setHeader('Allow', allowedMethods.join(', '));
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return false;
  }
  return true;
}

// URL parameter validation
export function validateUrlParameter(req: NextApiRequest, res: NextApiResponse): string | null {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: 'URL parameter is required and must be a string' });
    return null;
  }

  return url;
}

// CORS handling
export function setCorsHeaders(res: NextApiResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function handleCorsPreflightRequest(req: NextApiRequest, res: NextApiResponse): boolean {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.status(200).end();
    return true;
  }
  return false;
}

// Security validation
export function validateStrapiUrl(url: string): UrlValidationResult {
  try {
    const parsedUrl = new URL(url);
    const strapiUrl = clientEnv.strapi.apiUrl;

    if (!strapiUrl) {
      return { isValid: false, error: 'Strapi configuration missing' };
    }

    const strapiDomain = new URL(strapiUrl).hostname;
    const allowedMediaDomain = 'holy-belief-a4e3a87afd.media.strapiapp.com';
    if (parsedUrl.hostname !== strapiDomain && parsedUrl.hostname !== allowedMediaDomain) {
      return { isValid: false, error: 'Invalid domain' };
    }

    return { isValid: true, parsedUrl };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

export function validateUrlPath(parsedUrl: URL): { isValid: boolean; error?: string } {
  const decodedPath = decodeURIComponent(parsedUrl.pathname);

  if (decodedPath.includes('..') || decodedPath.includes('//')) {
    return { isValid: false, error: 'Path traversal detected' };
  }

  const suspiciousPatterns = [/etc\/passwd/i, /\.\.\/\.\./, /\0/, /%00/, /\.\./];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(decodedPath)) {
      return { isValid: false, error: 'Suspicious path detected' };
    }
  }

  return { isValid: true };
}

export function validateUrl(url: string): UrlValidationResult {
  const strapiValidation = validateStrapiUrl(url);
  if (!strapiValidation.isValid) {
    return strapiValidation;
  }

  const pathValidation = validateUrlPath(strapiValidation.parsedUrl!);
  if (!pathValidation.isValid) {
    return pathValidation;
  }

  return { isValid: true, parsedUrl: strapiValidation.parsedUrl };
}

// Error handling
export function handleApiError(res: NextApiResponse, error: unknown): void {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      error: error.message,
      code: error.code,
    });
    return;
  }

  if (error instanceof Error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  console.error('Unknown API Error:', error);
  res.status(500).json({ error: 'Internal server error' });
}

// PDF utilities
export type PDFErrorType = 'load' | 'config' | 'network';

export function constructPdfUrl(cvPdfUrl?: string | null): string | null {
  if (!cvPdfUrl) return null;

  const strapiApiUrl = clientEnv.strapi.apiUrl;
  if (!strapiApiUrl) return null;

  const strapiBaseUrl = strapiApiUrl.replace('/api', '');

  // Check if URL is from same origin and in development
  try {
    const cvUrl = new URL(cvPdfUrl);
    const strapiUrl = new URL(strapiBaseUrl);
    const isSameOrigin =
      cvUrl.hostname === strapiUrl.hostname &&
      cvUrl.protocol === strapiUrl.protocol &&
      cvUrl.port === strapiUrl.port;

    if (isSameOrigin && clientEnv.isDevelopment) {
      return cvPdfUrl;
    }
  } catch {
    // Invalid URL, fall through to proxy
  }

  return `/api/pdf-proxy?url=${encodeURIComponent(cvPdfUrl)}`;
}

export function hasConfigError(cvPdfUrl?: string | null): boolean {
  return !!(cvPdfUrl && !clientEnv.strapi.apiUrl);
}

export function reloadPdfIframe(pdfUrl: string): void {
  const iframe = document.querySelector('iframe[title="Martin Nolan CV"]') as HTMLIFrameElement;
  if (iframe) {
    iframe.src = pdfUrl;
  }
}
