// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://faxriddinswe.uz",
  // `file` format + Vercel `cleanUrls` → /uz/about (no trailing slash), one URL per page.
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      filter: (page) => !/\/404$/.test(page) && page !== "https://faxriddinswe.uz/",
      i18n: { defaultLocale: "uz", locales: { uz: "uz-UZ", en: "en-US" } },
    }),
  ],
  image: { responsiveStyles: false },
});
