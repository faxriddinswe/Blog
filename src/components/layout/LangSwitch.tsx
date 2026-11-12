"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * One button: shows the current language ("UZ"); hovering flips it to the
 * other one ("EN") and clicking switches to it on the same page.
 */
export function LangSwitch() {
  const t = useTranslations("LangSwitch");
  const active = useLocale();
  const pathname = usePathname();
  const other = routing.locales.find((l) => l !== active) ?? routing.defaultLocale;

  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      title={t("switchTo", { language: t(other) })}
      className="lang-switch glow-hover"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="lang-switch__globe">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <span className="lang-switch__codes">
        <span className="lang-switch__code">{active.toUpperCase()}</span>
        <span aria-hidden="true" className="lang-switch__code lang-switch__code--next">
          {other.toUpperCase()}
        </span>
      </span>
      {/* Accessible name starts with the visible label (WCAG 2.5.3). */}
      <span className="sr-only"> — {t("switchTo", { language: t(other) })}</span>
    </Link>
  );
}
