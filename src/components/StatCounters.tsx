"use client";

import { useEffect, useMemo, useState } from "react";

const STAT_DATA = [
  { label: "Athletes Trained", value: 10, suffix: "+" },
  { label: "Pro-Level Coaches", value: 12, suffix: "" },
  { label: "Skill Labs", value: 35, suffix: "" },
  { label: "Daily Film Minutes", value: 45, suffix: "+" },
];

export default function StatCounters() {
  const targets = useMemo(() => STAT_DATA.map((stat) => stat.value), []);
  const [counts, setCounts] = useState(targets.map(() => 0));

  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;

    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setCounts(targets.map((value) => Math.round(value * progress)));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [targets]);

  return (
    <div className="grid gap-6 rounded-3xl bg-forest px-8 py-10 text-white md:grid-cols-4">
      {STAT_DATA.map((stat, index) => (
        <div key={stat.label} className="space-y-2">
          <p className="text-4xl font-display tracking-[0.08em]">
            {counts[index]}
            {stat.suffix}
          </p>
          <p className="text-sm text-white/70 uppercase tracking-[0.2em]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
