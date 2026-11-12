import { About } from "@/components/sections/about/About";
import { Hero } from "@/components/sections/hero/Hero";
import { Skills } from "@/components/sections/skills/Skills";
import { TechMarquee } from "@/components/sections/TechMarquee";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
    </main>
  );
}
