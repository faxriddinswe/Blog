import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { heroFragments, type HeroFragment } from "@/content/hero";

/** Faded code / terminal / Telegram cards drifting behind the hero (desktop only). */
export function HeroFragments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {heroFragments.map((f) => (
        <div
          key={f.id}
          className="hero-fragment intro"
          style={
            {
              top: f.top,
              [f.side]: f.inset,
              "--phase": `${f.phase}s`,
              "--d": `${0.4 + f.phase * 0.1}s`,
            } as CSSProperties
          }
        >
          <FragmentBody fragment={f} />
        </div>
      ))}
    </div>
  );
}

function FragmentBody({ fragment }: { fragment: HeroFragment }) {
  const t = useTranslations("Hero.fragments");

  if (fragment.kind === "telegram") {
    return (
      <div className="w-60 rounded-2xl border border-border bg-bg-elevated/70 p-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs">
          <span className="grid size-6 place-items-center rounded-full bg-accent-blue/30 text-[10px]">
            ✈
          </span>
          <span className="font-medium text-text">{t("telegramTitle")}</span>
          <span className="ml-auto text-text-muted">{t("telegramMeta")}</span>
        </div>
        <p className="mt-2 rounded-xl rounded-tl-sm bg-bg/60 px-3 py-2 text-xs text-text">
          {t("telegramMessage")}
        </p>
      </div>
    );
  }

  return (
    <pre className="rounded-xl border border-border bg-bg-elevated/60 px-4 py-3 text-left font-mono text-[11px] leading-relaxed text-text-muted backdrop-blur-sm">
      {fragment.kind === "terminal" && (
        <span className="mb-2 flex gap-1.5">
          <i className="size-2 rounded-full bg-accent-orange/60" />
          <i className="size-2 rounded-full bg-accent-peach/50" />
          <i className="size-2 rounded-full bg-accent-cyan/50" />
        </span>
      )}
      {fragment.lines?.join("\n")}
    </pre>
  );
}
