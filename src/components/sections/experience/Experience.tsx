import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/content/experience";
import type { Locale } from "@/i18n/routing";

/**
 * Vertical timeline. The rail is an SVG line whose stroke draws with scroll
 * and each node lights up as it enters (CSS view timelines, experience.css).
 * Neutral labels only — no employer names.
 */
export function Experience() {
  const t = useTranslations("Experience");
  const locale = useLocale() as Locale;

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-x">
        <SectionHeading id="experience-title" eyebrow={t("eyebrow")} title={t("title")} />

        <ol className="timeline mt-16">
          <svg className="timeline__rail" aria-hidden="true" preserveAspectRatio="none">
            <line x1="1" y1="0" x2="1" y2="100%" className="timeline__rail-base" />
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              className="timeline__rail-fill"
              pathLength={1}
            />
          </svg>

          {timeline.map((entry) => (
            <li key={entry.id} className="timeline__item">
              <span className="timeline__node" aria-hidden="true" />
              <p className="font-mono text-xs tracking-widest text-text-muted uppercase">
                {entry.start} — {entry.end ?? t("present")} · {t(`kinds.${entry.kind}`)}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {entry.title[locale]}
              </h3>
              <p className="mt-2 text-lg text-text-muted">{entry.context[locale]}</p>
              {entry.summary && (
                <p className="mt-4 max-w-xl text-text/85">{entry.summary[locale]}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
