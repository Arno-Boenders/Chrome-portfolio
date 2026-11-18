import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Cloudflare Workers has no built-in Next.js image optimiser, so images are served as they are.
  // Keep files in public/ reasonably small (about 1600px wide at most).
  images: { unoptimized: true },
};

export default nextConfig;

// Lets `npm run dev` use Cloudflare bindings, matching production.
initOpenNextCloudflareForDev();
