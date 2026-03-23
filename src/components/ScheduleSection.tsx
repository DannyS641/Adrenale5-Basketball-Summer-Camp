"use client";

import { useMemo, useState } from "react";

export type ScheduleDay = {
  day: string;
  title: string;
  items: string[];
};

type ScheduleSectionProps = {
  schedule: ScheduleDay[];
};

export default function ScheduleSection({ schedule }: ScheduleSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  const toggleDay = (dayKey: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

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
            className="rounded-2xl border border-mist bg-cloud px-4 py-3"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-xl uppercase tracking-[0.08em]">
                {day.day}
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-ember">
                {day.title}
              </span>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-stone">
              {(expandedDays[day.day] ? day.items : day.items.slice(0, 4)).map(
                (item, index) => (
                  <li key={`${day.day}-${index}`}>{item}</li>
                ),
              )}
            </ul>
            {day.items.length > 4 ? (
              <button
                type="button"
                onClick={() => toggleDay(day.day)}
                className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-forest/80 transition hover:text-forest"
              >
                {expandedDays[day.day] ? "View Less" : "View More"}
              </button>
            ) : null}
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
