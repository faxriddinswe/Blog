import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "../../../../public/images/portrait/portrait.png";

/**
 * Background-removed portrait with a cool rim light (drop-shadow on the
 * silhouette) and a fade into the floor so the headline can sit over it.
 * On narrow screens it can out-size the headline and become the LCP element.
 */
export function HeroPortrait() {
  const t = useTranslations("Hero");

  return (
    <div className="hero-portrait">
      <Image
        src={portrait}
        alt={t("portraitAlt")}
        sizes="(min-width: 768px) 620px, 80vw"
        // Largest image above the fold (often the mobile LCP): fetch it first.
        loading="eager"
        fetchPriority="high"
        placeholder="blur"
        className="hero-portrait__img"
      />
    </div>
  );
}
