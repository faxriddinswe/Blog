import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { site } from "@/content/site";

/** Name letters + 0→100 counter + curtain. Pure CSS — see src/styles/intro.css. */
export function Preloader() {
  const t = useTranslations("Preloader");
  const chars = Array.from(site.name);

  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__name">
        {chars.map((char, i) => (
          <span key={i} className="preloader__char" style={{ "--i": i } as CSSProperties}>
            {char}
          </span>
        ))}
      </div>
      <div className="preloader__meta">
        <span>{t("label")}</span>
        <span className="preloader__count" />
      </div>
      <div className="preloader__bar" />
    </div>
  );
}
