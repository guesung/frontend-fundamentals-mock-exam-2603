import { useSearchParamsState } from 'hooks/useSearchParamsState';
import { formatDate } from 'utils/date';

export function useReservationConditions() {
  const [date, setDate] = useSearchParamsState<string>('date', { defaultValue: formatDate(new Date()) });
  const [startTime, setStartTime] = useSearchParamsState<string>('startTime', { defaultValue: '' });
  const [endTime, setEndTime] = useSearchParamsState<string>('endTime', { defaultValue: '' });
  const [attendees, setAttendees] = useSearchParamsState<number>('attendees', {
    defaultValue: 1,
    parser: attendees => Number(attendees),
  });
  const [equipment, setEquipment] = useSearchParamsState<string[]>('equipment', {
    defaultValue: [],
    parser: equipment => (equipment ? equipment?.split(',') : []),
  });
  const [preferredFloor, setPreferredFloor] = useSearchParamsState<number | null>('preferredFloor', {
    defaultValue: null,
    parser: preferredFloor => Number(preferredFloor),
  });

  return {
    conditions: {
      date,
      startTime,
      endTime,
      attendees,
      equipment,
      preferredFloor,
    },
    conditionsSetter: {
      date: setDate,
      startTime: setStartTime,
      endTime: setEndTime,
      attendees: setAttendees,
      equipment: setEquipment,
      preferredFloor: setPreferredFloor,
    },
    reservationFilterKey: `${date}-${startTime}-${endTime}-${attendees}-${equipment}-${preferredFloor}`,
  };
}
