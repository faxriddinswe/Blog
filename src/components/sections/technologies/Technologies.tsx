import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techCategories } from "@/content/technologies";
import type { Locale } from "@/i18n/routing";
import { logos } from "./logos";

/**
 * "Texnologiyalar": category name as text, technologies as logos only
 * (owner request). Each logo carries its name for screen readers and as a
 * hover tooltip; the tile glows in the brand colour on hover.
 */
export function Technologies() {
  const t = useTranslations("Technologies");
  const locale = useLocale() as Locale;

  return (
    <section id="technologies" aria-labelledby="technologies-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="technologies-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />

        <div className="mt-14 grid gap-4">
          {techCategories.map((category) => (
            <div key={category.id} className="tech-row">
              <h3 className="tech-row__label">{category.label[locale]}</h3>
              <ul className="flex flex-wrap gap-3">
                {category.items.map((item) => {
                  const logo = logos[item.logo];
                  return (
                    <li
                      key={item.name}
                      title={item.name}
                      className="tech-tile glow-hover"
                      style={{ "--brand": logo.color } as CSSProperties}
                    >
                      <svg
                        role="img"
                        aria-label={item.name}
                        viewBox="0 0 24 24"
                        className="tech-tile__logo"
                      >
                        <title>{item.name}</title>
                        <path
                          d={logo.path}
                          {...(logo.stroke
                            ? {
                                fill: "none",
                                stroke: logo.color,
                                strokeWidth: 1.6,
                                strokeLinecap: "round" as const,
                                strokeLinejoin: "round" as const,
                              }
                            : { fill: logo.color })}
                        />
                      </svg>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
