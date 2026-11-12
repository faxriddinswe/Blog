import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// All three families are SIL Open Font License 1.1 — free for commercial use.
// latin-ext covers Uzbek Latin letters such as oʻ / gʻ.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
