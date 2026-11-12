import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "en"],
  defaultLocale: "uz",
  // Brief §11: every URL carries its locale, so links are stable and shareable.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
