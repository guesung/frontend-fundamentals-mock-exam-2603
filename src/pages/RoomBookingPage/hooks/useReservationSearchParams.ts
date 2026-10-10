import { useSearchParamsState } from 'hooks/useSearchParamsState';
import { formatDate } from 'utils/date';

export function useReservationSearchParams() {
  const [date, setDate] = useSearchParamsState<string>('date', { defaultValue: formatDate(new Date()) });
  const [startTime, setStartTime] = useSearchParamsState<string>('startTime', { defaultValue: '' });
  const [endTime, setEndTime] = useSearchParamsState<string>('endTime', { defaultValue: '' });
  const [attendees, setAttendees] = useSearchParamsState<number>('attendees', {
    defaultValue: 1,
    parser: attendees => Number(attendees),
  });
  const [equipment, setEquipment] = useSearchParamsState<string[]>('equipment', {
    defaultValue: [],
    parser: equipment => equipment?.split(',') ?? [],
  });
  const [preferredFloor, setPreferredFloor] = useSearchParamsState<number | null>('preferredFloor', {
    defaultValue: null,
    parser: preferredFloor => Number(preferredFloor),
  });

  const field = {
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
  };

  const fieldSetter = {
    setDate,
    setStartTime,
    setEndTime,
    setAttendees,
    setEquipment,
    setPreferredFloor,
  };

  console.log(field);

  return {
    field,
    fieldSetter,
  };
}
