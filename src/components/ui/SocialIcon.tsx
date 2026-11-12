import { siGithub, siTelegram, siX } from "simple-icons";
import type { SocialKind } from "@/content/types";

// Simple Icons (CC0). LinkedIn is not in Simple Icons (removed at the brand's
// request), so it gets a plain "in" glyph of our own.
const PATHS: Partial<Record<SocialKind, string>> = {
  github: siGithub.path,
  telegram: siTelegram.path,
  x: siX.path,
  linkedin:
    "M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h3v12H3zM9 9h2.9v1.7h.04c.4-.76 1.38-1.95 3.06-1.95C18.6 8.75 21 10.6 21 14.6V21h-3v-5.7c0-1.6-.3-3.2-2.25-3.2-1.95 0-2.25 1.4-2.25 3.1V21H9z",
};

/** Monochrome social logo in currentColor. */
export function SocialIcon({
  kind,
  className,
}: {
  kind: SocialKind;
  className?: string;
}) {
  const d = PATHS[kind];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
