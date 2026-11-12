"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { navItems } from "@/content/navigation";
import { Link } from "@/i18n/navigation";

/**
 * Small-screen navigation on a native <dialog>: modal focus trapping, Esc to
 * close and inert background come from the browser, not from our code.
 */
export function MobileMenu() {
  const t = useTranslations("Nav");
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-haspopup="dialog"
        className="rounded-full border border-border bg-bg-elevated/70 px-4 py-2 text-sm text-text backdrop-blur-md lg:hidden"
      >
        {t("menu")}
      </button>

      <dialog
        ref={dialog}
        aria-label={t("label")}
        className="mobile-menu"
        // Clicking the backdrop (the dialog element itself) closes it.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="flex h-full flex-col p-(--gutter)">
          <button
            type="button"
            onClick={close}
            className="self-end rounded-full border border-border-strong px-4 py-2 text-sm text-text"
          >
            {t("closeMenu")}
          </button>
          <nav aria-label={t("label")} className="mt-auto mb-auto">
            <ul className="grid gap-2">
              {navItems.map((item, i) => (
                <li
                  key={item.key}
                  className="mobile-menu__item"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    className="font-display text-5xl font-semibold tracking-display text-text hover:text-accent-peach"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
