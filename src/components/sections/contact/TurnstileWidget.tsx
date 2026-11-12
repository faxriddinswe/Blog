"use client";

import { useEffect, useId } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render: (container: string, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${SCRIPT_SRC}"]`,
  );
  const script =
    existing ??
    Object.assign(document.createElement("script"), { src: SCRIPT_SRC, async: true });
  if (!existing) document.head.appendChild(script);
  return new Promise((resolve, reject) => {
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("turnstile")), {
      once: true,
    });
  });
}

/**
 * Cloudflare Turnstile, env-gated: renders nothing unless
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is set (the server checks the token only
 * when TURNSTILE_SECRET_KEY is set). The script loads only on the last step.
 */
export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const id = `ts-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    if (!SITE_KEY) return;
    let widgetId: string | undefined;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetId = window.turnstile.render(`#${id}`, {
          sitekey: SITE_KEY,
          theme: "dark",
          size: "flexible",
          callback: onToken,
        });
      })
      .catch(() => {
        // Script blocked: the server will answer "captcha" and the user sees a friendly error.
      });
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [id, onToken]);

  if (!SITE_KEY) return null;
  return <div id={id} />;
}
