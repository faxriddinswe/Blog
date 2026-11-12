"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const FORMAT = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.location.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

type Time = { h: number; m: number; s: number };

function tashkentNow(): Time {
  const parts = FORMAT.formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { h: get("hour") % 24, m: get("minute"), s: get("second") };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Live Asia/Tashkent clock: warm arc = hours (12h dial), cool arc = minutes.
 * Renders "--:--" on the server and fills in after mount — the real time is
 * client-only, so there is no hydration mismatch.
 */
export function TashkentClock() {
  const t = useTranslations("Contact");
  const [time, setTime] = useState<Time | null>(null);

  useEffect(() => {
    const tick = () => setTime(tashkentNow());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const hourPct = time ? (((time.h % 12) + time.m / 60) / 12) * 100 : 0;
  const minutePct = time ? ((time.m + time.s / 60) / 60) * 100 : 0;

  return (
    <figure className="flex items-center gap-6">
      <div className="clock">
        <svg viewBox="0 0 120 120" className="clock__dial" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className="clock__track" />
          <circle
            cx="60"
            cy="60"
            r="52"
            pathLength={100}
            className="clock__arc clock__arc--warm"
            style={{ strokeDashoffset: 100 - hourPct }}
          />
          <circle cx="60" cy="60" r="42" className="clock__track" />
          <circle
            cx="60"
            cy="60"
            r="42"
            pathLength={100}
            className="clock__arc clock__arc--cool"
            style={{ strokeDashoffset: 100 - minutePct }}
          />
        </svg>
        <time className="clock__face font-display text-3xl font-semibold tracking-tight tabular-nums">
          {time ? `${pad(time.h)}:${pad(time.m)}` : "--:--"}
          <span className="text-base text-text-muted">
            {time ? `:${pad(time.s)}` : ""}
          </span>
        </time>
      </div>
      <figcaption className="grid gap-1 font-mono text-xs tracking-widest text-text-muted uppercase">
        <span className="text-text">{t("clockLabel")}</span>
        <span>
          {site.location.timeZone} · {t("clockZone")}
        </span>
      </figcaption>
    </figure>
  );
}
