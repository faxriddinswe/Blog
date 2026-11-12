import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Experience } from "@/components/sections/experience/Experience";
import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";
import { Services } from "@/components/sections/services/Services";
import { Skills } from "@/components/sections/skills/Skills";
import { TechMarquee } from "@/components/sections/TechMarquee";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
