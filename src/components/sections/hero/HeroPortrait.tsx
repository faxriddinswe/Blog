import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "../../../../public/images/portrait/portrait.png";

/**
 * The portrait in a round frame with a glowing ring that slowly rotates
 * around it — warm (amber/orange) and cool (cyan/blue) light chasing each
 * other. Owner request: no waterfall, just the lit, turning ring.
 * The photo is painted from the first frame (no opacity intro): on small
 * screens it is the LCP element. Styles in hero.css.
 */
export function HeroPortrait() {
  const t = useTranslations("Hero");

  return (
    <div className="portrait-ring">
      <span className="portrait-ring__glow" aria-hidden="true" />
      <span className="portrait-ring__halo" aria-hidden="true" />
      <div className="portrait-ring__frame">
        <Image
          src={portrait}
          alt={t("portraitAlt")}
          sizes="(min-width: 768px) 340px, 60vw"
          // Largest image above the fold (often the mobile LCP): fetch it first.
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
          className="portrait-ring__img"
        />
      </div>
    </div>
  );
}
