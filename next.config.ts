import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root to this project (a stray lockfile higher up confuses inference).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
