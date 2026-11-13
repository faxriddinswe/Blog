import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "en"],
  defaultLocale: "uz",
  // Brief §11: every URL carries its locale, so links are stable and shareable.
  localePrefix: "always",
  // Owner request: "/" always opens Uzbek, regardless of browser language or
  // a previously chosen locale cookie. Visitors switch with the UZ/EN button.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
