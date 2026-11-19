import type { NextConfig } from "next";

// Only what the site loads: its own files, inline Next.js/theme scripts and styles, CARTO map
// tiles, and MapLibre's blob worker. Applied in production so local development is unaffected.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://basemaps.cartocdn.com",
  "font-src 'self' data:",
  "connect-src 'self' https://basemaps.cartocdn.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The quotation map can use the visitor's location; nothing else needs device features.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), payment=(), geolocation=(self)" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Smaller modern formats for browsers that support them.
    formats: ["image/avif", "image/webp"],
    // Photos are 1920px wide; 1440px is sharp on screen and keeps every variant small.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440],
    // One quality for every photo. Keeps the JPEG fallback (what crawlers download, after
    // Netlify's image CDN re-encodes it) under 100 KB.
    qualities: [50],
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Location URLs moved to /pest-control/<province>/<town> when every city and
    // municipality got a page. Permanent redirects keep old links and rankings.
    return [
      { source: "/pest-control/los-banos", destination: "/pest-control/laguna/los-banos", permanent: true },
      { source: "/pest-control/binan", destination: "/pest-control/laguna/binan", permanent: true },
      { source: "/pest-control/san-fernando-camarines-sur", destination: "/pest-control/camarines-sur/san-fernando", permanent: true },
      { source: "/service-areas/laguna", destination: "/pest-control/laguna", permanent: true },
      { source: "/service-areas/bicol-camarines-sur", destination: "/pest-control/camarines-sur", permanent: true },
    ];
  },
};

export default nextConfig;
