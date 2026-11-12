import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "../../../../public/images/portrait/portrait.png";

const LEFT = "M50 1 A49 49 0 0 0 50 99";
const RIGHT = "M50 1 A49 49 0 0 1 50 99";

/**
 * The portrait inside a round frame, hanging on the beam: the beam pours onto
 * the top of the ring, splits, and flows down both halves (looping light
 * packets) to rejoin at the bottom. Styles in hero.css.
 * The photo is painted from the first frame (no opacity intro) because on
 * small screens it is the LCP element.
 */
export function HeroPortrait() {
  const t = useTranslations("Hero");

  return (
    <div className="portrait-ring">
      <span className="portrait-ring__beam" aria-hidden="true" />
      <div className="portrait-ring__frame">
        <Image
          src={portrait}
          alt={t("portraitAlt")}
          sizes="(min-width: 768px) 320px, 60vw"
          // Largest image above the fold (often the mobile LCP): fetch it first.
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
          className="portrait-ring__img"
        />
      </div>
      <svg viewBox="0 0 100 100" className="portrait-ring__svg" aria-hidden="true">
        <path d={LEFT} pathLength={1} className="portrait-ring__arc" />
        <path d={RIGHT} pathLength={1} className="portrait-ring__arc" />
        {/* Two packets per side, half a cycle apart, so the flow never pauses. */}
        <path d={LEFT} pathLength={1} className="portrait-ring__flow" />
        <path d={RIGHT} pathLength={1} className="portrait-ring__flow" />
        <path
          d={LEFT}
          pathLength={1}
          className="portrait-ring__flow portrait-ring__flow--late"
        />
        <path
          d={RIGHT}
          pathLength={1}
          className="portrait-ring__flow portrait-ring__flow--late"
        />
      </svg>
      <span className="portrait-ring__join" aria-hidden="true" />
    </div>
  );
}
