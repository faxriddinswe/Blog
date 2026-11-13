import { socials } from "@/content/site";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  label: string;
  className?: string;
}

/** Owner's public profiles. Entries without a URL are skipped, never faked. */
export function SocialLinks({ label, className }: SocialLinksProps) {
  const items = socials.filter((s) => s.href);

  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {items.map((s) => (
        <li key={s.kind}>
          <a
            href={s.href ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-hover inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm text-text transition-colors duration-(--dur-fast) hover:border-accent-peach hover:text-accent-peach"
          >
            {s.label}
            <span aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
