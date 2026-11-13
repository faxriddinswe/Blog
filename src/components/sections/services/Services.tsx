import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { GlowPillLink } from "@/components/ui/GlowPillLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps, services } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { ServiceIcon } from "./ServiceIcon";

/** "Biznesingizni tizimlashtiramiz": 6 services + 4 process steps lit by scroll. */
export function Services() {
  const t = useTranslations("Services");
  const locale = useLocale() as Locale;

  return (
    <section id="services" aria-labelledby="services-title" className="section services">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />

        <ul className="mt-14 grid gap-px overflow-clip rounded-(--radius-lg) border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id} className="service-card glow-edge">
              <span className="service-card__icon">
                <ServiceIcon name={service.icon} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                {service.title[locale]}
              </h3>
              <p className="mt-2 text-text-muted">{service.description[locale]}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-24 font-mono text-xs tracking-widest text-text-muted uppercase">
          {t("processTitle")}
        </h3>
        <ol className="process mt-8">
          {processSteps.map((step, i) => (
            <li
              key={step.id}
              className="process__step"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="process__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-5 font-display text-xl font-semibold tracking-tight">
                {step.title[locale]}
              </h4>
              <p className="mt-2 text-sm text-text-muted">{step.description[locale]}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <Magnetic>
            <GlowPillLink href="#contact">{t("cta")}</GlowPillLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
