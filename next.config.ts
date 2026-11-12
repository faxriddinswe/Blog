import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Points next-intl at our request config (non-default location under src/i18n).
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Plugins are given by name with serializable options: required by Turbopack
// (see node_modules/next/dist/docs/01-app/02-guides/mdx.md).
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-pretty-code", { theme: "github-dark-dimmed", keepBackground: false }],
    ],
  },
});

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
  // www → apex (brief §4). Runs before the i18n proxy.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.faxriddinswe.uz" }],
        destination: "https://faxriddinswe.uz/:path*",
        permanent: true,
      },
    ];
  },
  // Baseline security headers. A strict CSP is left out on purpose: the
  // pre-paint preloader script and JSON-LD are inline; see DEPLOYMENT.md.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(withMDX(nextConfig));
