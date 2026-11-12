import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { ProjectCard } from "./ProjectCard";

/**
 * Pinned horizontal gallery on wide screens (sticky stage + scroll-driven
 * translateX, projects.css); a native swipe/scroll-snap row everywhere else.
 */
export function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale() as Locale;
  const hasDemo = projects.some((p) => p.demo);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="projects"
      style={{ "--count": projects.length } as CSSProperties}
    >
      <div className="projects__stage">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="projects-title"
            eyebrow={t("eyebrow")}
            title={t("title")}
            lead={t("lead")}
          />
          {hasDemo && (
            <p className="max-w-xs font-mono text-xs text-text-muted">{t("demoNote")}</p>
          )}
        </div>

        <div className="projects__viewport">
          <ol className="projects__track">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                locale={locale}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
