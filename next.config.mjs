/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

// Get domains from environment variables for better security
const getStrapiDomains = () => {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!strapiUrl) return [];

  try {
    const url = new URL(strapiUrl);
    const baseUrl = strapiUrl.replace("/api", "");
    const mediaUrl = new URL(baseUrl);
    mediaUrl.hostname = mediaUrl.hostname.replace(".", ".media.");

    return [url.hostname, mediaUrl.hostname];
  } catch {
    return [];
  }
};

const strapiDomains = getStrapiDomains();

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      // Local dev Strapi uploads
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },

      // Your domain
      { protocol: "https", hostname: "martinnolan.dev", pathname: "/**" },

      // Strapi dynamic domains (if strapiDomains is an array of hostnames)
      ...strapiDomains.map((domain) => ({
        protocol: "https",
        hostname: domain,
        pathname: "/**",
      })),

      // Common CDN domains
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ].filter(Boolean),
  },
  async headers() {
    // Build CSP with dynamic Strapi URLs
    const strapiConnections =
      strapiDomains.length > 0
        ? ` ${strapiDomains.map((domain) => `https://${domain}`).join(" ")}`
        : "";

    const strapiMedia =
      strapiDomains.length > 0
        ? ` ${strapiDomains.map((domain) => `https://${domain}`).join(" ")}`
        : "";

    // Add development URLs from environment variable
    const devStrapiUrls =
      isDev && process.env.NEXT_PUBLIC_STRAPI_DEV_URL
        ? ` ${process.env.NEXT_PUBLIC_STRAPI_DEV_URL}`
        : "";

    // Add local Strapi http for connect-src and frame-src in dev
    const devStrapiConnect = isDev ? " http://localhost:1337" : "";
    const devFrameSrc = isDev ? " http://localhost:1337" : "";

    const netlifyDomain = " https://martinnolan-dev.netlify.app";

    return [
      {
        // Apply security headers to all routes except API routes
        source: "/((?!api/).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              `default-src 'self';` +
              ` style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;` +
              ` font-src 'self' https://fonts.gstatic.com;` +
              ` connect-src 'self' https://api.emailjs.com https://models.github.ai${strapiConnections}${devStrapiUrls}${devStrapiConnect}${netlifyDomain};` +
              ` img-src 'self' data: https: blob:${strapiMedia}${devStrapiUrls}${devStrapiConnect}${netlifyDomain};` +
              ` media-src 'self' https:${strapiMedia}${devStrapiUrls}${devStrapiConnect}${netlifyDomain};` +
              ` script-src 'self'${isDev ? " 'unsafe-eval'" : ""};` +
              ` frame-src 'self' data:${strapiConnections}${devStrapiUrls}${devFrameSrc}${netlifyDomain};`
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
    ];
  },
};

export default nextConfig;
