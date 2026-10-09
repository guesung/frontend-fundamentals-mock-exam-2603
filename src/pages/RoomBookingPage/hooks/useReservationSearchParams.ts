import { useSearchParamsState } from 'hooks/useSearchParamsState';
import { formatDate } from 'utils/date';

export function useReservationSearchParams() {
  const [date, setDate] = useSearchParamsState('date');
  const [startTime, setStartTime] = useSearchParamsState('startTime');
  const [endTime, setEndTime] = useSearchParamsState('endTime');
  const [attendees, setAttendees] = useSearchParamsState('attendees');
  const [equipment, setEquipment] = useSearchParamsState('equipment');
  const [preferredFloor, setPreferredFloor] = useSearchParamsState('preferredFloor');

  const field = {
    date: date || formatDate(new Date()),
    startTime,
    endTime,
    attendees: Number(attendees) || 1,
    equipment: equipment ? equipment.split(',') : [],
    preferredFloor: preferredFloor ? Number(preferredFloor) : null,
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
