import type { NextConfig } from "next";

/** Static export — no Node server or database required for hosting */
const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
