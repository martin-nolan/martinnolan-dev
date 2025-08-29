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
  swcMinify: false, // Disable SWC minification to fix Netlify getInitialProps error

  // Enhanced production debugging configuration
  compiler: {
    // Temporarily disable console removal for production debugging
    removeConsole: false, // Keep console logs for debugging getInitialProps issues
  },

  // Enable source maps for better error tracking
  productionBrowserSourceMaps: true,

  // Disable webpack optimizations that might cause bundling issues
  webpack: (config, { isServer }) => {
    // Disable webpack optimizations that might interfere with Next.js internals
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        // Disable aggressive optimizations that might break getInitialProps
        usedExports: false,
        sideEffects: false,
        // Disable module concatenation which can cause issues
        concatenateModules: false,
      };
    }

    // Ensure proper module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

  // Experimental features to help with bundling issues
  experimental: {
    // Disable optimizations that might cause issues
    optimizePackageImports: [],
  },

  // Enhanced error handling
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
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
      {
        protocol: 'https',
        hostname: 'holy-belief-a4e3a87afd.media.strapiapp.com',
        pathname: '/**',
      },
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
