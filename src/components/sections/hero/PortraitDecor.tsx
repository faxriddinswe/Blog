import { useLocale, useTranslations } from "next-intl";
import { stats } from "@/content/site";
import type { Locale } from "@/i18n/routing";

/**
 * Layers around the hero portrait (owner request): a breathing halftone aura
 * behind the ring, an "open to new projects" status pill, and two floating
 * glass cards with owner-confirmed stats. Decorative except the status text.
 */
export function PortraitDecor() {
  const t = useTranslations("Hero");
  const locale = useLocale() as Locale;

  return (
    <>
      <span aria-hidden="true" className="portrait-halftone" />

      <p className="portrait-status glow-hover">
        <span aria-hidden="true" className="portrait-status__dot" />
        {t("available")}
      </p>

      {stats.slice(0, 2).map((stat, i) => (
        <p
          key={stat.id}
          className={`portrait-stat portrait-stat--${i === 0 ? "a" : "b"} glow-hover`}
        >
          <span className="portrait-stat__value">
            {stat.value}
            {stat.suffix}
          </span>
          <span className="portrait-stat__label">{stat.label[locale]}</span>
        </p>
      ))}
    </>
  );
}
