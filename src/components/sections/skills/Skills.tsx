import { useLocale, useTranslations } from "next-intl";
import { Spotlight } from "@/components/motion/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/content/skills";
import type { Locale } from "@/i18n/routing";
import { SkillCard } from "./SkillCard";

/** Bento grid of living skill cards on a drifting warm/cool aurora (follows the site theme). */
export function Skills() {
  const t = useTranslations("Skills");
  const locale = useLocale() as Locale;

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="section skills-section"
    >
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
        />
        <Spotlight className="skills-grid mt-14">
          {skillGroups.map((group) => (
            <SkillCard key={group.id} group={group} locale={locale} />
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
