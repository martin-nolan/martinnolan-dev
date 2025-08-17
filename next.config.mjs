/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: [
      "localhost",
      "martinnolan.dev",
      // Future CMS domains
      "res.cloudinary.com",
      "images.unsplash.com",
    ],
    formats: ["image/webp", "image/avif"],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes except API routes
        source: "/((?!api/).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://api.emailjs.com https://models.github.ai http://localhost:1337;
              img-src 'self' data: https: blob:;
              media-src 'self' https:;
              script-src 'self'${isDev ? " 'unsafe-eval'" : ""};
              frame-src 'self' http://localhost:1337;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // Special headers for PDF proxy API to allow iframe embedding
        source: "/api/pdf-proxy",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          // No X-Frame-Options header to allow iframe embedding
          {
            key: "Cache-Control",
            value: "public, max-age=31536000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
