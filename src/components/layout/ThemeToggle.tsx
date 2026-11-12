"use client";

import { useTranslations } from "next-intl";
import { useLayoutEffect } from "react";
import { THEME_KEY } from "./ThemeScript";

/**
 * Light / night switch. Which icon shows is pure CSS (html[data-theme]), so
 * the server render and the pre-paint script never disagree.
 */
export function ThemeToggle() {
  const t = useTranslations("Theme");

  // Switching locale re-renders <html> (it lives in the [locale] root layout)
  // and drops data-theme; re-apply the saved choice before the next paint.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch {
      // Storage blocked: fall back to the default below.
    }
    root.dataset.theme = saved === "light" ? "light" : "dark";
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode: the choice just isn't remembered.
    }
    window.setTimeout(() => root.classList.remove("theme-switching"), 700);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggle")}
      title={t("toggle")}
      className="theme-toggle glow-hover"
    >
      {/* Moon in dark mode (switch to night is current), sun in light mode. */}
      <svg
        viewBox="0 0 24 24"
        className="theme-toggle__icon theme-toggle__icon--moon"
        aria-hidden="true"
      >
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="theme-toggle__icon theme-toggle__icon--sun"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </button>
  );
}
