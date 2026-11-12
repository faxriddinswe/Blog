import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "light" | "ghost";

interface GlowPillLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
}

/**
 * Glow pill CTA (brief §7). The warm halo reads `--glow` (0–1), which a
 * parent <Magnetic> sets from cursor proximity; without it the halo idles.
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
        "group relative isolate inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium transition-[translate,border-color] duration-(--dur-fast) ease-brand",
        variant === "light" &&
          [
            "bg-text text-bg shadow-[0_0_0_1px_rgb(255_255_255/0.6)]",
            // Halo: lives behind the pill, grows with cursor proximity.
            "before:absolute before:-inset-2 before:-z-10 before:rounded-full before:bg-[radial-gradient(closest-side,rgb(249_115_22/0.7),rgb(253_186_116/0.25)_60%,transparent)] before:blur-lg before:transition-opacity before:duration-(--dur-fast)",
            "before:scale-[calc(0.9+var(--glow,0)*0.25)] before:opacity-[calc(0.45+var(--glow,0)*0.55)]",
          ].join(" "),
        variant === "ghost" &&
          "border border-border-strong bg-bg-elevated/50 text-text backdrop-blur-md hover:border-text-muted",
        className,
      )}
    >
      {children}
    </Link>
  );
}
