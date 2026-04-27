import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** node-ical pulls in rrule/temporal; keep it external to avoid bundler issues. */
  serverExternalPackages: ["node-ical"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
