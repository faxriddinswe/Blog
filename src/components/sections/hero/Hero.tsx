import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { LightBeamFallback } from "@/components/motion/LightBeamFallback";
import { Magnetic } from "@/components/motion/Magnetic";
import { RotatingText } from "@/components/motion/RotatingText";
import { SplitRise } from "@/components/motion/SplitRise";
import { GlowPillLink } from "@/components/ui/GlowPillLink";
import { site, stats } from "@/content/site";
import { HeroPortrait } from "./HeroPortrait";

const years = stats.find((s) => s.id === "years")?.value ?? 0;
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section aria-labelledby="hero-title" className="hero">
      <LightBeamFallback />

      {/* Mobile: portrait on top, text centered below. ≥768px: text left, portrait right. */}
      <div className="hero__grid">
        <div className="hero__visual">
          <HeroPortrait />
        </div>

        <div className="hero__content">
          <p
            className="intro rounded-full border border-border bg-bg/60 px-3.5 py-1.5 font-mono text-[11px] tracking-widest text-text-muted uppercase backdrop-blur-md"
            style={delay(0.2)}
          >
            {t("eyebrow", { years })}
          </p>
          <h1
            id="hero-title"
            className="hero__title mt-5 font-display leading-[0.9] font-semibold tracking-display text-balance"
          >
            <SplitRise text={site.name} />
          </h1>
          <p
            className="intro mt-5 text-base text-text-muted md:text-xl"
            style={delay(0.55)}
          >
            <span className="sr-only">{t("rolesLabel")}: </span>
            <RotatingText items={site.roles} className="text-text" />
          </p>
          <div className="hero__ctas intro mt-9 flex flex-wrap gap-3" style={delay(0.7)}>
            <Magnetic>
              <GlowPillLink href="#projects">{t("ctaProjects")}</GlowPillLink>
            </Magnetic>
            <Magnetic>
              <GlowPillLink href="#contact" variant="ghost">
                {t("ctaApply")}
              </GlowPillLink>
            </Magnetic>
          </div>
        </div>
      </div>

      <p className="hero__hint intro" style={delay(1)}>
        <span>{t("scrollHint")}</span>
        <span aria-hidden="true" className="hero__hint-line" />
      </p>
    </section>
  );
}
