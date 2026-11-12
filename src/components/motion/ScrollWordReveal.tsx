import type { CSSProperties } from "react";

interface ScrollWordRevealProps {
  text: string;
  className?: string;
}

/**
 * Paragraph whose words light up one by one as it scrolls through the
 * viewport — scrubbed by a CSS view timeline (about.css), no JS. Each word
 * gets its slice of the range via --p (0–1). Browsers without scroll-driven
 * animations show the text fully lit. Real text, so it stays readable/indexable.
 */
export function ScrollWordReveal({ text, className }: ScrollWordRevealProps) {
  const words = text.split(/\s+/);
  const last = Math.max(1, words.length - 1);

  return (
    <p className={`word-reveal ${className ?? ""}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-reveal__word"
          style={{ "--p": i / last } as CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
