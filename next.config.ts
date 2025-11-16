import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.glitzfusion.in",
      },
      {
        protocol: "https",
        hostname: "pub-ab8a0d13b5164870b78c22a5bb310c57.r2.dev",
      },
    ],
  },
};

export default nextConfig;
