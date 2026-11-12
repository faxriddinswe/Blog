import { useLocale, useTranslations } from "next-intl";
import { Counter } from "@/components/motion/Counter";
import { ScrollWordReveal } from "@/components/motion/ScrollWordReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/content/site";
import type { Locale } from "@/i18n/routing";

/** Bio revealed word by word + stat counters. No photo here (owner request). */
export function About() {
  const t = useTranslations("About");
  const locale = useLocale() as Locale;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <div className="max-w-4xl">
          <SectionHeading id="about-title" eyebrow={t("eyebrow")} title={t("title")} />
          <ScrollWordReveal
            text={t("bio")}
            className="mt-10 font-display text-2xl leading-snug font-semibold tracking-tight text-text md:text-[2.1rem]"
          />

          <h3 className="sr-only">{t("statsLabel")}</h3>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:max-w-md">
            {stats.map((stat) => (
              <div key={stat.id}>
                <dt className="mt-2 text-sm text-text-muted">{stat.label[locale]}</dt>
                <dd className="order-first font-display text-6xl font-semibold tracking-display text-text md:text-7xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
