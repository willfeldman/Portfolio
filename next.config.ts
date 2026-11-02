import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  // Every page has a Markdown twin at the same path plus .md (see app/md and proxy.ts).
  async rewrites() {
    return [
      { source: "/index.md", destination: "/md" },
      { source: "/:path*.md", destination: "/md/:path*" },
    ];
  },
  async headers() {
    // Pages answer differently to Accept: text/markdown, so caches must key on it.
    return [{ source: "/:path*", headers: [{ key: "Vary", value: "Accept" }] }];
  },
  async redirects() {
    // Old macOS-desktop and single-page routes.
    return [
      { source: "/experience/0", destination: "/work/statapile", permanent: true },
      { source: "/experience/1", destination: "/work/freelance", permanent: true },
      { source: "/experience/2", destination: "/work/pausecircleplay", permanent: true },
      { source: "/experience/3", destination: "/work/northeastern-its", permanent: true },
      { source: "/experience/4", destination: "/work/wasserstrom", permanent: true },
      { source: "/experience/5", destination: "/work/blueport", permanent: true },
      { source: "/experience/6", destination: "/work/toast", permanent: true },
      { source: "/experience/7", destination: "/work/settle", permanent: true },
      { source: "/experience/:id", destination: "/work", permanent: true },
      { source: "/project/9", destination: "/projects/classmate", permanent: true },
      { source: "/project/:id", destination: "/projects", permanent: true },
      { source: "/organization/:id", destination: "/about", permanent: true },
      { source: "/award/:id", destination: "/about", permanent: true },
    ];
  },
};

// withBotId adds the rewrites for Vercel BotID, which screens Ask about Will for bots.
export default withBotId(nextConfig);
