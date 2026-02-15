"use client";

import { useMemo, useState } from "react";

export type ScheduleDay = {
  day: string;
  title: string;
  detail: string;
};

type ScheduleSectionProps = {
  schedule: ScheduleDay[];
};

export default function ScheduleSection({ schedule }: ScheduleSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleSchedule = useMemo(() => {
    if (showAll) {
      return schedule;
    }
    return schedule.slice(0, 3);
  }, [schedule, showAll]);

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
        {visibleSchedule.map((day) => (
          <div
            key={day.day}
            className="rounded-2xl border border-mist bg-sand/80 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-xl uppercase tracking-[0.08em]">
                {day.day}
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-ember">
                {day.title}
              </span>
            </div>
            <p className="mt-2 text-sm text-stone">{day.detail}</p>
          </div>
        ))}
      </div>
      {schedule.length > 3 ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-full border border-forest/30 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-forest transition hover:border-forest"
          >
            {showAll ? "View Less" : "View Full Schedule"}
          </button>
        </div>
      ) : null}
    </>
  );
}
