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
  swcMinify: false, // Keep disabled - this was the root cause of the getInitialProps error

  // Production optimizations
  compiler: {
    // Remove console logs in production for better performance and security
    removeConsole: isDev
      ? false
      : {
          exclude: ['error', 'warn'], // Keep error and warning logs for monitoring
        },
  },

  // Enable source maps only in development for better debugging
  productionBrowserSourceMaps: false,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-tooltip', '@radix-ui/react-toast'],
  },

  // Optimized webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Production optimizations
    if (!dev) {
      // Enable webpack optimizations for production
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: false,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Separate vendor chunks for better caching
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            // Separate UI components chunk
            ui: {
              test: /[\\/]src[\\/]ui[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 5,
            },
          },
        },
      };
    }

    // Client-side optimizations
    if (!isServer) {
      // Keep the fallbacks that prevent Node.js module issues
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      // Tree shaking optimizations
      config.optimization.usedExports = true;
    }

    return config;
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600, // 1 hour cache for better performance
    dangerouslyAllowSVG: false, // Security: disable SVG processing
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
    // Enhanced security headers with strict CSP
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
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ...(isDev
            ? []
            : [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }]),
        ],
      },
    ];
  },
};

export default nextConfig;
