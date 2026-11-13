import { About } from "@/components/sections/about/About";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Contact } from "@/components/sections/contact/Contact";
import { Experience } from "@/components/sections/experience/Experience";
import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";
import { Services } from "@/components/sections/services/Services";
import { Skills } from "@/components/sections/skills/Skills";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Technologies } from "@/components/sections/technologies/Technologies";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;

  return (
    <main id="main">
      <PersonJsonLd locale={locale} />
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Technologies />
      <Experience />
      <Projects />
      <Services />
      <Contact />
      <BlogTeaser />
    </main>
  );
}
