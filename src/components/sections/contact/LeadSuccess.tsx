"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

interface LeadSuccessProps {
  name: string;
  onReset: () => void;
}

/** Check mark draws in, warm glow blooms (CSS in contact.css). */
export function LeadSuccess({ name, onReset }: LeadSuccessProps) {
  const t = useTranslations("Contact");
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => heading.current?.focus(), []);

  return (
    <div className="lead-success" role="status">
      <svg viewBox="0 0 64 64" className="lead-success__icon" aria-hidden="true">
        <circle cx="32" cy="32" r="28" pathLength={1} className="lead-success__ring" />
        <path d="M20 33l8 8 16-17" pathLength={1} className="lead-success__check" />
      </svg>
      <h3
        ref={heading}
        tabIndex={-1}
        className="mt-6 font-display text-3xl font-semibold tracking-tight outline-none"
      >
        {t("successTitle")}
      </h3>
      <p className="mt-2 text-text-muted">{t("successBody", { name })}</p>
      <button type="button" onClick={onReset} className="lead-btn lead-btn--ghost mt-8">
        {t("again")}
      </button>
    </div>
  );
}
