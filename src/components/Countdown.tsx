"use client";

import { useEffect, useState } from "react";

const CAMP_START = "2026-07-20T09:00:00";

function getDaysUntil() {
  const start = new Date(CAMP_START).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const diff = Math.max(start - today, 0);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function Countdown() {
  const [days, setDays] = useState(getDaysUntil());

  useEffect(() => {
    const update = () => setDays(getDaysUntil());
    update();

    let intervalId: number | null = null;
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      5,
      0,
    );
    const timeoutMs = nextMidnight.getTime() - now.getTime();

    const timeoutId = window.setTimeout(() => {
      update();
      intervalId = window.setInterval(update, 24 * 60 * 60 * 1000);
    }, timeoutMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
      <span className="font-semibold tracking-[0.2em] uppercase text-citrus">
        Next Session
      </span>
      <span className="text-white/90">July 10 - 19, 2026</span>
      <span className="h-1 w-1 rounded-full bg-white/60" />
      <span className="font-semibold">{days} days away</span>
    </div>
  );
}
