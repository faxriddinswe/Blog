import type { routing } from "./routing";
import type messages from "./messages/uz.json";

// Typed keys: t("Hero.missing") becomes a compile error.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
