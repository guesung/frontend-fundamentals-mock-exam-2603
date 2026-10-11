import { TIMELINE_START, TOTAL_MINUTES } from 'constants/time';

/**
 *
 * @param time 10:00
 * @returns 60 (9시 기준, 분)
 */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);

  return (h - TIMELINE_START) * 60 + m;
}

export function getTimelinePercentage(time: string) {
  return (timeToMinutes(time) / TOTAL_MINUTES) * 100;
}

export function getTimelineWidth(start: string, end: string) {
  return getTimelinePercentage(end) - getTimelinePercentage(start);
}
