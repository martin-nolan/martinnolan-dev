/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,

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

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: false,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
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

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      if (!dev) {
        config.optimization.usedExports = true;
      }
    }

    return config;
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'martinnolan.dev.netlify.app', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ].filter(Boolean),
  },
  async headers() {
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
              "connect-src 'self'",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https:",
              `script-src 'self'${isDev ? " 'unsafe-eval'" : ''}`,
              "frame-src 'self' data:",
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
