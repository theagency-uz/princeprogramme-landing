import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const isGitHubPages = isGitHubActions && process.env.GITHUB_WORKFLOW === "Deploy to GitHub Pages";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isGitHubPages ? "/princeprogramme-landing" : "");

const nextConfig: NextConfig = {
  // GitHub Pages needs a static export. On a regular server we keep the
  // Next.js runtime so that /api/telegram can safely use the bot token.
  output: isGitHubPages ? "export" : isGitHubActions ? "standalone" : undefined,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
