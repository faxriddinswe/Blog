import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// All three families are SIL Open Font License 1.1 — free for commercial use.
// Google's "latin" subset already covers Uzbek ʻ ʼ (U+02BB–02BC), so no latin-ext.
// Only the display face is preloaded: it renders the LCP headline. The others
// swap in from size-adjusted fallbacks without competing for early bandwidth.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});
