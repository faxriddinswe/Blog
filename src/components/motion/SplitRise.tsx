import type { CSSProperties } from "react";

interface SplitRiseProps {
  text: string;
}

/**
 * Server-rendered word split: each word rises out of its own mask (CSS in
 * intro.css). Words — not characters — so every word is one sizeable LCP
 * candidate; per-char inline-blocks would each count as a tiny element.
 * Screen readers get the plain string; the split copy is hidden.
 */
export function SplitRise({ text }: SplitRiseProps) {
  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span className="split-word">
              <span className="split-word__inner" style={{ "--i": i } as CSSProperties}>
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}
