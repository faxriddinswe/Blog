"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Switches locale while staying on the same page (brief §9 Global). */
export function LangSwitch() {
  const t = useTranslations("LangSwitch");
  const active = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex items-center gap-1 rounded-full border border-border bg-bg-elevated/60 p-1 backdrop-blur-md"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 font-mono text-xs uppercase transition-colors duration-(--dur-fast)",
              isActive ? "bg-text text-bg" : "text-text-muted hover:text-text",
            )}
          >
            {locale}
            {/* Accessible name starts with the visible label (WCAG 2.5.3). */}
            <span className="sr-only"> — {t(locale)}</span>
          </Link>
        );
      })}
    </div>
  );
}
