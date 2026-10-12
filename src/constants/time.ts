export const TIMELINE_START = 9;
export const TIMELINE_END = 20;
const SLOT_INTERVAL_MINUTES = 30;
export const TOTAL_MINUTES = (TIMELINE_END - TIMELINE_START) * 60;

function minuteToTime(minutes: number) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');
  return `${hours}:${mins}`;
}

export const TIME_SLOTS = Array.from({ length: TOTAL_MINUTES / SLOT_INTERVAL_MINUTES + 1 }, (_, i) =>
  minuteToTime(TIMELINE_START * 60 + i * SLOT_INTERVAL_MINUTES)
);

export const HOUR_LABELS = TIME_SLOTS.filter(t => t.endsWith(':00'));
