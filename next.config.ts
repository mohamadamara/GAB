import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root to this project (a stray lockfile higher up confuses inference).
  outputFileTracingRoot: path.join(__dirname),
  // Pages from the marketplace concept: keep old links working.
  async redirects() {
    return [
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/platform", destination: "/projects", permanent: true },
      { source: "/builders", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
