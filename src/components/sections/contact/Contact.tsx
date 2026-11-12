import { useTranslations } from "next-intl";
import { GlowFrame } from "@/components/ui/GlowFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { LeadForm } from "./LeadForm";
import { TashkentClock } from "./TashkentClock";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" aria-labelledby="contact-title" className="section contact">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="contact-title"
            eyebrow={t("eyebrow")}
            title={t("title")}
            lead={t("lead")}
          />
          <TashkentClock />
          <SocialLinks label={t("socialsLabel")} />
        </div>

        <GlowFrame className="self-start">
          <div className="p-6 md:p-9">
            <LeadForm />
          </div>
        </GlowFrame>
      </div>
    </section>
  );
}
