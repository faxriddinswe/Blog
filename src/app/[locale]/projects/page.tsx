import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Projects" });
  return {
    title: t("metaTitle"),
    description: t("allLead"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/projects`])),
    },
  };
}

/** Every project in a still grid — the home page shows them as a moving loop. */
export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Projects" });
  const hasDemo = projects.some((p) => p.demo);

  return (
    <main id="main" className="section pt-40">
      <div className="container-x">
        <Link
          href="/"
          className="font-mono text-xs tracking-widest text-text-muted uppercase hover:text-text"
        >
          ← {t("backHome")}
        </Link>
        <SectionHeading
          id="projects-title"
          eyebrow={t("eyebrow")}
          title={t("allTitle")}
          lead={t("allLead")}
          className="mt-10"
        />
        {hasDemo && (
          <p className="mt-6 font-mono text-xs text-text-muted">{t("demoNote")}</p>
        )}

        <ol className="projects-grid mt-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} locale={locale} />
          ))}
        </ol>
      </div>
    </main>
  );
}
