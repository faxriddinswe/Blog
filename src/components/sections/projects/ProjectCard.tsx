import Image from "next/image";
import { useTranslations } from "next-intl";
import { GlowFrame } from "@/components/ui/GlowFrame";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectCardProps {
  project: Project;
  index: number;
  locale: Locale;
}

export function ProjectCard({ project, index, locale }: ProjectCardProps) {
  const t = useTranslations("Projects");
  const headingId = `project-${project.slug}`;

  return (
    <li className="project-card" data-accent={project.accent}>
      <GlowFrame innerClassName="flex h-full flex-col">
        <article aria-labelledby={headingId} className="flex h-full flex-col">
          {/* Tall screenshot drifts slowly inside the window; pauses on hover. */}
          <div className="project-card__screen">
            <Image
              src={project.cover}
              alt={t("screenshotAlt", { name: project.name })}
              width={1200}
              height={2100}
              sizes="(min-width: 1024px) 36rem, 85vw"
              // SVG mocks are served as-is; real screenshots should be raster and optimized.
              unoptimized={project.cover.endsWith(".svg")}
              className="project-card__shot"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
            <div className="flex items-center gap-3 font-mono text-xs text-text-muted">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {project.demo && (
                <span className="rounded-full border border-accent-orange/50 px-2 py-0.5 tracking-widest text-accent-peach uppercase">
                  {t("demoBadge")}
                </span>
              )}
            </div>
            <h3
              id={headingId}
              className="font-display text-3xl font-semibold tracking-tight text-text"
            >
              {project.name}
            </h3>
            <p className="text-text-muted">{project.tagline[locale]}</p>
            <ul aria-label={t("stackLabel")} className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border bg-bg/50 px-3 py-1 font-mono text-xs text-text/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <ProjectLinks project={project} />
            </div>
          </div>
        </article>
      </GlowFrame>
    </li>
  );
}
