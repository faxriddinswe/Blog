import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

// Required by @next/mdx in the App Router. External links open safely in a new
// tab; everything else is styled by .prose-x in styles/blog.css.
function A({ href = "", ...props }: ComponentProps<"a">) {
  const external = /^https?:\/\//.test(href);
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
  ) : (
    <a href={href} {...props} />
  );
}

const components: MDXComponents = { a: A };

export function useMDXComponents(): MDXComponents {
  return components;
}
