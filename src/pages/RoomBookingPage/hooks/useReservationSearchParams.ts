import { useSearchParamsState } from 'hooks/useSearchParamsState';
import { formatDate } from 'utils/date';

export function useReservationSearchParams() {
  const [date, setDate] = useSearchParamsState('date', { defaultValue: formatDate(new Date()) });
  const [startTime, setStartTime] = useSearchParamsState('startTime');
  const [endTime, setEndTime] = useSearchParamsState('endTime');
  const [attendees, setAttendees] = useSearchParamsState('attendees', { defaultValue: '1' });
  const [equipment, setEquipment] = useSearchParamsState('equipment');
  const [preferredFloor, setPreferredFloor] = useSearchParamsState('preferredFloor');

  const field = {
    date,
    startTime,
    endTime,
    attendees: Number(attendees),
    equipment: equipment.split(','),
    preferredFloor: Number(preferredFloor),
  };

  const fieldSetter = {
    setDate,
    setStartTime,
    setEndTime,
    setAttendees: (attendees: number) => setAttendees(String(attendees)),
    setEquipment: (equipment: string[]) => setEquipment(equipment.join(',')),
    setPreferredFloor: (preferredFloor: number | null) => setPreferredFloor(String(preferredFloor)),
  };

  return {
    field,
    fieldSetter,
  };
}
