import { useTranslations } from "next-intl";
import { Marquee } from "@/components/motion/Marquee";
import { techList } from "@/content/skills";

export function TechMarquee() {
  const t = useTranslations("Marquee");

  return (
    <section aria-label={t("label")} className="relative border-y border-border py-7">
      <Marquee>
        <ul className="flex shrink-0 items-center">
          {techList.map((tech) => (
            <li
              key={tech}
              className="flex items-center font-display text-2xl font-semibold tracking-tight whitespace-nowrap text-text/80 md:text-4xl"
            >
              {tech}
              <span aria-hidden="true" className="marquee__sep" />
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}
