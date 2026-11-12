import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "../../../../public/images/portrait/portrait.png";

/*
 * Stream geometry, in the overlay's 200×170 viewBox. The ring is the circle
 * (100, 50) r=48, i.e. exactly the photo frame (see .portrait-ring__svg).
 * The fall splits at the top of the ring and runs down each half to the bottom.
 */
const LEFT = "M100 2 A48 48 0 0 0 100 98";
const RIGHT = "M100 2 A48 48 0 0 1 100 98";

/**
 * The portrait in a round frame under a wide two-tone waterfall: the fall
 * pours onto the ring and splits around it — warm (amber/orange) down the
 * left half, cool (cyan/blue) down the right.
 * The photo is painted from the first frame (no opacity intro): on small
 * screens it is the LCP element. Styles in hero.css.
 */
export function HeroPortrait() {
  const t = useTranslations("Hero");

  return (
    <div className="portrait-ring">
      <span className="portrait-ring__fall" aria-hidden="true">
        <span className="portrait-ring__core" />
      </span>

      <svg viewBox="0 0 200 170" className="portrait-ring__svg" aria-hidden="true">
        <defs>
          <linearGradient
            id="stream-warm"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="170"
          >
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#fde68a" />
            <stop offset="0.7" stopColor="#fb923c" />
            <stop offset="1" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="stream-cool"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="170"
          >
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#a5f3fc" />
            <stop offset="0.7" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="50" r="48" className="portrait-ring__track" />
        <path
          d={LEFT}
          pathLength={1}
          className="portrait-ring__stream"
          stroke="url(#stream-warm)"
        />
        <path
          d={RIGHT}
          pathLength={1}
          className="portrait-ring__stream"
          stroke="url(#stream-cool)"
        />
        {/* Light packets riding each stream; two per side, half a cycle apart. */}
        <path
          d={LEFT}
          pathLength={1}
          className="portrait-ring__packet portrait-ring__packet--warm"
        />
        <path
          d={RIGHT}
          pathLength={1}
          className="portrait-ring__packet portrait-ring__packet--cool"
        />
        <path
          d={LEFT}
          pathLength={1}
          className="portrait-ring__packet portrait-ring__packet--warm portrait-ring__packet--late"
        />
        <path
          d={RIGHT}
          pathLength={1}
          className="portrait-ring__packet portrait-ring__packet--cool portrait-ring__packet--late"
        />
      </svg>

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
