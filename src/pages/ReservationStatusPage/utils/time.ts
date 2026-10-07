import { TIMELINE_START } from '../constants';

/**
 *
 * @param time 10:00
 * @returns 60 (9시 기준, 분)
 */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);

  return (h - TIMELINE_START) * 60 + m;
}
