import { useTranslations } from "next-intl";
import type { Project } from "@/content/projects";

const pill =
  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-(--dur-fast)";

/**
 * "Visit site ↗" + GitHub. External links open in a new tab with
 * rel="noopener noreferrer" (brief §9). Missing links — always the case for
 * demo projects — render as a disabled "coming soon" pill, never a fake URL.
 */
export function ProjectLinks({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const live = project.demo ? undefined : project.liveUrl;
  const github = project.demo ? undefined : project.githubUrl;

  if (!live && !github) {
    return (
      <span
        aria-disabled="true"
        className={`${pill} border border-border text-text-muted`}
      >
        {t("linkSoon")}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className={`${pill} bg-text text-bg hover:bg-accent-peach`}
        >
          {t("live")} <span aria-hidden="true">↗</span>
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${pill} border border-border-strong text-text hover:border-text-muted`}
        >
          {t("github")} <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}
