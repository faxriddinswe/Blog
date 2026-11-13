import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "light" | "ghost";

interface GlowPillLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
}

/**
 * Glow pill CTA (brief §7): always-lit turning ring (glow-hover) with a
 * warm/cool aura; a parent <Magnetic> adds the pull toward the cursor.
 */
export function GlowPillLink({
  variant = "light",
  className,
  children,
  ...props
}: GlowPillLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "glow-hover group relative isolate inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium transition-[translate,border-color] duration-(--dur-fast) ease-brand",
        variant === "light" && ["bg-text text-bg [--glow-fill:var(--text)]"].join(" "),
        variant === "ghost" &&
          "border border-border-strong bg-bg-elevated/50 text-text backdrop-blur-md hover:border-text-muted",
        className,
      )}
    >
      {children}
    </Link>
  );
}
