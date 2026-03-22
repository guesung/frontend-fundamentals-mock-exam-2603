import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { Equipment } from '_tosslib/server/types';
import { formatDate } from '_tosslib/utils/date';

export function useBookingSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsed = qs.parse(searchParams.toString());

  const date = (parsed.date as string) || formatDate(new Date());
  const startTime = (parsed.startTime as string) || '';
  const endTime = (parsed.endTime as string) || '';
  const attendees = Number(parsed.attendees) || 1;
  const equipment = parsed.equipment
    ? ((Array.isArray(parsed.equipment) ? parsed.equipment : [parsed.equipment]) as Equipment[])
    : [];
  const preferredFloor = parsed.floor ? Number(parsed.floor) : null;

  const update = useCallback(
    (partial: Record<string, unknown>) => {
      setSearchParams(
        prev => {
          const current = qs.parse(prev.toString());
          const next = qs.stringify({ ...current, ...partial }, { skipNulls: true, arrayFormat: 'comma' });
          return new URLSearchParams(next);
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setDate = useCallback((v: string) => update({ date: v }), [update]);
  const setStartTime = useCallback((v: string) => update({ startTime: v }), [update]);
  const setEndTime = useCallback((v: string) => update({ endTime: v }), [update]);
  const setAttendees = useCallback((v: number) => update({ attendees: v > 1 ? v : null }), [update]);
  const setEquipment = useCallback((v: Equipment[]) => update({ equipment: v.length ? v : null }), [update]);
  const setPreferredFloor = useCallback((v: number | null) => update({ floor: v }), [update]);

  return {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    attendees,
    setAttendees,
    equipment,
    setEquipment,
    preferredFloor,
    setPreferredFloor,
  };
}
