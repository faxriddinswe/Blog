import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  className?: string;
}

/** Eyebrow + big tight title (+ optional lead). Shared by every section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <header className={cn("max-w-3xl", className)}>
      <p
        className={cn(
          "flex items-center gap-3 font-mono text-xs tracking-widest uppercase",
          light ? "text-text-muted-on-light" : "text-text-muted",
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-accent-orange" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-5 font-display text-h2 leading-[0.95] font-semibold tracking-display text-balance",
          light ? "text-text-on-light" : "text-text",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-5 max-w-xl text-lg",
            light ? "text-text-muted-on-light" : "text-text-muted",
          )}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
