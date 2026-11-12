import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { site } from "@/content/site";

/**
 * First-visit intro (pure CSS, see src/styles/intro.css):
 * a beam falls onto the ring around the "F." mark, splits in two and flows
 * down both halves, flashes where the streams meet, then the curtain lifts.
 * Name letters and the 0→100 counter run alongside.
 */
export function Preloader() {
  const t = useTranslations("Preloader");
  const chars = Array.from(site.name);

  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__beam" />

      <div className="preloader__ring">
        <svg viewBox="0 0 100 100" className="preloader__svg">
          <circle cx="50" cy="50" r="48" className="preloader__track" />
          {/* Left and right halves, both drawn from the top point to the bottom point. */}
          <path d="M50 2 A48 48 0 0 0 50 98" pathLength={1} className="preloader__arc" />
          <path d="M50 2 A48 48 0 0 1 50 98" pathLength={1} className="preloader__arc" />
        </svg>
        <span className="preloader__logo">
          F<span className="text-accent-orange">.</span>
        </span>
        <span className="preloader__flash" />

        <div className="preloader__name">
          {chars.map((char, i) => (
            <span
              key={i}
              className="preloader__char"
              style={{ "--i": i } as CSSProperties}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="preloader__meta">
        <span>{t("label")}</span>
        <span className="preloader__count" />
      </div>
      <div className="preloader__bar" />
    </div>
  );
}
