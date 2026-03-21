import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // OpenNext on Workers: avoid default `/_next/image` optimization (often unstable or throws on the edge).
  images: { unoptimized: true },
};

const config = withNextIntl(nextConfig);
initOpenNextCloudflareForDev();
export default config;
