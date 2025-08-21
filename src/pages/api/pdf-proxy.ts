import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:1337',
      'https://martinnolan-dev.netlify.app',
    ];
    const requestOrigin = typeof req.headers.origin === 'string' ? req.headers.origin : '';
    const originToAllow = allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : allowedOrigins[0];
    res.setHeader('Access-Control-Allow-Origin', originToAllow);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ message: 'PDF URL is required' });
  }

  try {
    // Validate that the URL is from your Strapi instance (security measure)
    const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    if (!strapiApiUrl) {
      return res.status(500).json({
        message: 'Strapi configuration missing',
      });
    }

    const strapiBaseUrl = strapiApiUrl.replace('/api', '');

    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (_e) {
      return res.status(400).json({ message: 'Invalid PDF URL' });
    }
    const baseParsedUrl = new URL(strapiBaseUrl);

    // Check protocol and hostname match (allow media subdomains for Strapi)
    const isValidStrapiDomain =
      parsedUrl.protocol === baseParsedUrl.protocol &&
      (parsedUrl.hostname === baseParsedUrl.hostname ||
        // Allow *.media.strapiapp.com for media files
        (parsedUrl.hostname.includes('.media.strapiapp.com') &&
          baseParsedUrl.hostname.includes('strapiapp.com')) ||
        // Allow same base domain for Strapi cloud
        (parsedUrl.hostname.includes('strapiapp.com') &&
          baseParsedUrl.hostname.includes('strapiapp.com') &&
          parsedUrl.hostname.split('.')[0] === baseParsedUrl.hostname.split('.')[0]));

    if (!isValidStrapiDomain) {
      return res.status(403).json({
        message: 'Unauthorized PDF source',
      });
    }

    // Prevent path traversal using robust normalization
    const decodedPath = decodeURIComponent(parsedUrl.pathname);
    const normalizedPath = path.posix.normalize(decodedPath);
    // Robust path traversal protection: ensure resolved path stays within root
    const resolvedPath = path.posix.resolve('/', normalizedPath);
    if (!resolvedPath.startsWith('/')) {
      return res.status(403).json({
        message: 'Path traversal detected',
      });
    }

    let response;
    try {
      // Prepare headers for Strapi media fetch
      const fetchHeaders: Record<string, string> = {
        'User-Agent': 'Martin-Nolan-CV-Viewer',
        Accept: 'application/pdf,*/*',
        'Cache-Control': 'no-cache',
      };

      // Add authorization if available for private media files
      const strapiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      if (strapiToken) {
        fetchHeaders.Authorization = `Bearer ${strapiToken}`;
      }

      // Fetch the PDF from Strapi
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

    const contentType = response.headers.get('content-type') || 'application/pdf';
    const buffer = await response.arrayBuffer();

    // Set appropriate headers for PDF display in iframe
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Allow iframe embedding from same origin
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:1337',
      'https://martinnolan-dev.netlify.app',
    ];
    const requestOrigin = typeof req.headers.origin === 'string' ? req.headers.origin : '';
    const originToAllow = allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : allowedOrigins[0];
    res.setHeader('Access-Control-Allow-Origin', originToAllow);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Type');

    // Send the PDF buffer
    res.status(200).end(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({
      message: 'Failed to load PDF',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
