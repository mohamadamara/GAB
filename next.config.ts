import type { NextConfig } from "next";
import path from "node:path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root to this project (a stray lockfile higher up confuses inference).
  outputFileTracingRoot: path.join(__dirname),
  // The site runs on Cloudflare Workers. Next's built-in image optimizer isn't available there
  // without the paid Images binding, so project images are served as-is: export them at the
  // size they're shown (e.g. 1600×1000 covers) and compress them before adding.
  images: { unoptimized: true },
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

// Gives `next dev` access to Cloudflare bindings (no-op in production builds).
initOpenNextCloudflareForDev();
