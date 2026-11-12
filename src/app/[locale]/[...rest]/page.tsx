import { notFound } from "next/navigation";

// Always 404s, so there is no navigation UI for Next's instant validation to check.
export const instant = false;

// Routes unknown paths under a valid locale to the localized not-found page.
export default function CatchAll() {
  notFound();
}
