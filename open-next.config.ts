import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Defaults are enough: pages are rendered per request (the language comes from a cookie).
export default defineCloudflareConfig({});
