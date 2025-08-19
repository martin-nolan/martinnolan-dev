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
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "martinnolan.dev",
        pathname: "/**",
      },
      ...strapiDomains.map((domain) => ({
        protocol: "https",
        hostname: domain,
        pathname: "/**",
      })),
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ].filter(Boolean),
    formats: ["image/webp", "image/avif"],
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

    // Add localhost development URLs
    const devConnections = isDev ? " http://localhost:1337" : "";
    const devFrameSrc = isDev ? " http://localhost:1337" : "";
    const devMediaSrc = isDev ? " http://localhost:1337" : "";

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
              connect-src 'self' https://api.emailjs.com https://models.github.ai${strapiConnections}${devConnections};
              img-src 'self' data: https: blob:${strapiMedia}${devMediaSrc};
              media-src 'self' https:${strapiMedia}${devMediaSrc};
              script-src 'self'${isDev ? " 'unsafe-eval'" : ""};
              frame-src 'self' data:${strapiConnections}${devFrameSrc};
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
    ];
  },
};

export default nextConfig;
