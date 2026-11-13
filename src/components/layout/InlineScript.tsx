"use client";

/**
 * Inline script that runs only during the initial HTML parse. On the client
 * React renders it as inert `text/plain`, which avoids React's dev warning
 * about rendering <script> tags (pattern from Next docs: "Preventing flash
 * before hydration"). suppressHydrationWarning covers the type difference.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
