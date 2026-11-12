import type { ComponentType } from "react";
import type { SkillGroup, SkillScene } from "@/content/skills";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { AgentRingScene } from "./scenes/AgentRingScene";
import { BrowserScene } from "./scenes/BrowserScene";
import { CodeScene } from "./scenes/CodeScene";
import { DatabaseScene } from "./scenes/DatabaseScene";
import { TerminalScene } from "./scenes/TerminalScene";

const SCENES: Record<SkillScene, ComponentType> = {
  code: CodeScene,
  "agent-ring": AgentRingScene,
  database: DatabaseScene,
  terminal: TerminalScene,
  browser: BrowserScene,
};

const SIZE: Record<SkillGroup["size"], string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  small: "",
};

interface SkillCardProps {
  group: SkillGroup;
  locale: Locale;
}

export function SkillCard({ group, locale }: SkillCardProps) {
  const Scene = SCENES[group.scene];

  return (
    <article data-spotlight className={cn("skill-card glow-edge", SIZE[group.size])}>
      <div className="skill-card__stage">
        <Scene />
      </div>
      <div className="relative z-10 p-6 md:p-7">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-text-on-light">
          {group.title[locale]}
        </h3>
        <p className="mt-2 text-text-muted-on-light">{group.description[locale]}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-black/10 bg-white/70 px-3 py-1 font-mono text-xs text-text-on-light"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
