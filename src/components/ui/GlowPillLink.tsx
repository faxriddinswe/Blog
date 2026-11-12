import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "light" | "ghost";

interface GlowPillLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
}

/**
 * Glow pill CTA (brief §7). Static halo for now; magnetic pull and
 * cursor-proximity glow are added in the motion phase.
 */
export function GlowPillLink({
  variant = "light",
  className,
  ...props
}: GlowPillLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-transform duration-(--dur-fast) ease-brand hover:-translate-y-0.5",
        variant === "light" &&
          "bg-text text-bg shadow-[0_0_0_1px_rgb(255_255_255/0.6),0_8px_40px_-6px_rgb(249_115_22/0.55)] hover:shadow-[0_0_0_1px_rgb(255_255_255/0.8),0_10px_60px_-4px_rgb(249_115_22/0.75)]",
        variant === "ghost" &&
          "border border-border-strong bg-bg-elevated/40 text-text backdrop-blur-md hover:border-text-muted",
        className,
      )}
    />
  );
}
