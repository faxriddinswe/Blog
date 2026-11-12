"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const KEYS = ["contact", "business", "task", "budget"] as const;

/** Progress for the 4 form steps; announced as "Step n of 4". */
export function LeadStepper({ current }: { current: number }) {
  const t = useTranslations("Contact");

  return (
    <div>
      <p className="sr-only" aria-live="polite">
        {t("stepOf", { current: current + 1, total: KEYS.length })}
      </p>
      <ol className="grid grid-cols-4 gap-2" aria-hidden="true">
        {KEYS.map((key, i) => (
          <li key={key} className="grid gap-2">
            <span className={cn("lead-step-bar", i <= current && "lead-step-bar--on")} />
            <span
              className={cn(
                "font-mono text-[11px] tracking-wider uppercase",
                i === current ? "text-text" : "text-text-muted",
              )}
            >
              {t(`steps.${key}`)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
