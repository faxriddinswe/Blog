import { useTranslations } from "next-intl";
import { LightBeamFallback } from "@/components/motion/LightBeamFallback";
import { GlowPillLink } from "@/components/ui/GlowPillLink";
import { site, stats } from "@/content/site";

const years = stats.find((s) => s.id === "years")?.value ?? 0;

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh flex-col items-center justify-end overflow-hidden px-(--gutter) pt-32 pb-[14vh] text-center"
    >
      <LightBeamFallback />
      {/* TODO(owner): portrait with rim light goes here once public/images/portrait/ has a photo. */}

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-xs tracking-widest text-text-muted uppercase">
          {t("eyebrow", { years })}
        </p>
        <h1
          id="hero-title"
          className="mt-6 font-display text-display leading-[0.88] font-semibold tracking-display text-balance"
        >
          {site.name}
        </h1>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-1 text-base text-text-muted md:text-lg">
          {site.roles.map((role, i) => (
            <li key={role} className="whitespace-nowrap">
              {i > 0 && (
                <span aria-hidden="true" className="mr-3 text-accent-orange">
                  ·
                </span>
              )}
              {role}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <GlowPillLink href="#projects">{t("ctaProjects")}</GlowPillLink>
          <GlowPillLink href="#contact" variant="ghost">
            {t("ctaApply")}
          </GlowPillLink>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest text-text-muted uppercase">
        {t("scrollHint")}
      </p>
    </section>
  );
}
