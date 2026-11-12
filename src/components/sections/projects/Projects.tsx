import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ProjectCard } from "./ProjectCard";

/**
 * Projects drift left in an endless loop at a calm pace (owner request).
 * The track holds the list twice and slides by exactly one copy; the copy is
 * inert and hidden from assistive tech, so links are reachable once.
 * Reduced motion: a still, swipeable row instead (projects.css).
 */
export function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale() as Locale;
  const hasDemo = projects.some((p) => p.demo);

  const list = (copy: boolean) => (
    <ol
      className="projects__group"
      aria-hidden={copy || undefined}
      inert={copy || undefined}
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} locale={locale} />
      ))}
    </ol>
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="projects"
      style={{ "--count": projects.length } as CSSProperties}
    >
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="projects-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />
        <div className="flex flex-col items-start gap-4 md:items-end">
          {hasDemo && (
            <p className="max-w-xs font-mono text-xs text-text-muted md:text-right">
              {t("demoNote")}
            </p>
          )}
          <Link
            href="/projects"
            className="glow-hover rounded-full border border-border-strong px-5 py-2.5 text-sm hover:border-text-muted"
          >
            {t("allProjects")} →
          </Link>
        </div>
      </div>

      {/* Focusable + labelled: with reduced motion this becomes a scrollable row (keyboard users can scroll it). */}
      <div
        className="projects__viewport"
        tabIndex={0}
        role="region"
        aria-labelledby="projects-title"
      >
        <div className="projects__track">
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
