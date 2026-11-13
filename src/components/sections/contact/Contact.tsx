import { useTranslations } from "next-intl";
import { GlowFrame } from "@/components/ui/GlowFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { LeadForm } from "./LeadForm";
import { TashkentClock } from "./TashkentClock";

/**
 * Three grid items so the order can differ by screen (owner request):
 * phones — heading → form → clock & socials; desktop — heading and extras
 * on the left, the form on the right spanning both rows.
 */
export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" aria-labelledby="contact-title" className="section contact">
      <div className="container-x contact-grid">
        <SectionHeading
          id="contact-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          className="contact-grid__head"
        />

        <GlowFrame className="contact-grid__form self-start">
          <div className="p-6 md:p-9">
            <LeadForm />
          </div>
        </GlowFrame>

        <div className="contact-grid__extra flex flex-col gap-10">
          <TashkentClock />
          <SocialLinks label={t("socialsLabel")} />
        </div>
      </div>
    </section>
  );
}
