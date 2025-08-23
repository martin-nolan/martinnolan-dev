/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

// Simplified domain configuration
const getStrapiDomain = () => {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!strapiUrl) return null;

  try {
    return new URL(strapiUrl).hostname;
  } catch {
    return null;
  }
};

const strapiDomain = getStrapiDomain();

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      // Local dev Strapi uploads
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },

      // Your domain
      { protocol: 'https', hostname: 'martinnolan.dev', pathname: '/**' },

      // Strapi domain (if configured)
      ...(strapiDomain ? [{ protocol: 'https', hostname: strapiDomain, pathname: '/**' }] : []),

      // Common CDN domains
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ].filter(Boolean),
  },
  async headers() {
    // Simplified CSP configuration
    const strapiUrl = strapiDomain ? ` https://${strapiDomain}` : '';
    const devUrls = isDev ? ' http://localhost:1337' : '';

    return [
      {
        source: '/((?!api/).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              `connect-src 'self' https://api.emailjs.com https://models.github.ai${strapiUrl}${devUrls}`,
              `img-src 'self' data: https: blob:${strapiUrl}${devUrls}`,
              `media-src 'self' https:${strapiUrl}${devUrls}`,
              `script-src 'self'${isDev ? " 'unsafe-eval'" : ''}`,
              `frame-src 'self' data:${strapiUrl}${devUrls}`,
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
