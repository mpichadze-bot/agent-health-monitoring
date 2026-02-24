import type { NextConfig } from "next";

const repoName =
  (typeof process.env.GITHUB_REPOSITORY === "string" && process.env.GITHUB_REPOSITORY.split("/")[1]) ||
  "agent-health-monitoring";
const basePath = process.env.NODE_ENV === "production" ? `/${repoName}` : "";
const assetPrefix = process.env.NODE_ENV === "production" ? `/${repoName}/` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix,
  trailingSlash: true,
};

export default nextConfig;
