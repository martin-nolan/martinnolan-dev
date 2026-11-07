import type { NextConfig } from 'next';

// Static export: the whole site is HTML, CSS and a little JS in `out/`.
// Security headers are set in netlify.toml because a static export cannot set them here.
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
