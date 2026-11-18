import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Adapts the Next.js build to run as a Cloudflare Worker.
// Pages built ahead of time (project pages, the share image, GitHub data) are served from the
// deployed static assets. They refresh on every deploy, not on a timer.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
