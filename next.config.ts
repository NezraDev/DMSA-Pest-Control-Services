import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Smaller modern formats for browsers that support them.
    formats: ["image/avif", "image/webp"],
    // The source photos are 1920px wide, so larger variants only add bytes.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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
