import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  experimental: {
    staleTimes: {
      dynamic: 60,
      static: 180,
    },
    middlewareClientMaxBodySize: "40mb",
    serverActions: {
      bodySizeLimit: "40mb",
    },
  },
  async headers() {
    // Safari / iOS friendly transport + caching headers (safe defaults).
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/orbit/login",
          destination: "/admin/login",
        },
        {
          source: "/orbit",
          destination: "/admin",
        },
        {
          source: "/orbit/:path*",
          destination: "/admin/:path*",
        },
        {
          source: "/uploads/:filename",
          destination: "/api/media/:filename",
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/trip/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/everest-base-camp-luxury-trek",
        destination: "/everest-base-camp-trek",
        permanent: true,
      },
      {
        source: "/packages/everest-base-camp-luxury-trek",
        destination: "/everest-base-camp-trek",
        permanent: true,
      },
      {
        source: "/packages/everest-base-camp-trek",
        destination: "/everest-base-camp-trek",
        permanent: true,
      },
      {
        source: "/luxury-everest-base-camp-trek",
        destination: "/everest-base-camp-trek",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;