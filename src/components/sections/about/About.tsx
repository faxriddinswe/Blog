import { useLocale, useTranslations } from "next-intl";
import { Counter } from "@/components/motion/Counter";
import { ScrollWordReveal } from "@/components/motion/ScrollWordReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/content/site";
import type { Locale } from "@/i18n/routing";

/**
 * "Men haqimda": a wide, centred panel with a living border — the bio on the
 * left (revealed word by word), the confirmed numbers on the right.
 */
export function About() {
  const t = useTranslations("About");
  const locale = useLocale() as Locale;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <div className="about-panel glow-edge">
          <div>
            <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} />
            <ScrollWordReveal
              text={t("bio")}
              className="mt-8 font-display text-2xl leading-snug font-semibold tracking-tight text-text md:text-[1.9rem]"
            />
          </div>

          <div>
            <h3 className="sr-only">{t("statsLabel")}</h3>
            <dl className="about-stats">
              {stats.map((stat) => (
                <div key={stat.id} className="about-stats__item">
                  <dt className="mt-2 text-sm text-text-muted">{stat.label[locale]}</dt>
                  <dd className="order-first font-display text-6xl font-semibold tracking-display text-text md:text-7xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
