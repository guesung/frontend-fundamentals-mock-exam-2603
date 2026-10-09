import { useSearchParams } from 'react-router-dom';
import { formatDate } from 'utils/date';

export function useReservationSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const date = searchParams.get('date') || formatDate(new Date());
  const startTime = searchParams.get('startTime') || '';
  const endTime = searchParams.get('endTime') || '';
  const attendees = Number(searchParams.get('attendees')) || 1;
  const equipment = searchParams.get('equipment') ? searchParams.get('equipment')!.split(',').filter(Boolean) : [];
  const preferredFloor = searchParams.get('preferredFloor') ? Number(searchParams.get('preferredFloor')) : null;

  function setSearchParamsState(key: string, value: string | null) {
    const prevParams = {
      date,
      startTime,
      endTime,
      attendees: String(attendees),
      equipment: equipment.join(','),
      preferredFloor: preferredFloor !== null ? String(preferredFloor) : '',
    };

    setSearchParams(
      {
        ...prevParams,
        [key]: value,
      },
      { replace: true }
    );
  }

  return {
    date,
    setDate: (date: string) => setSearchParamsState('date', date),
    startTime,
    setStartTime: (startTime: string) => setSearchParamsState('startTime', startTime),
    endTime,
    setEndTime: (endTime: string) => setSearchParamsState('endTime', endTime),
    attendees,
    setAttendees: (attendees: number) => setSearchParamsState('attendees', String(attendees)),
    equipment,
    setEquipment: (equipment: string[]) => setSearchParamsState('equipment', equipment.join(',')),
    preferredFloor,
    setPreferredFloor: (preferredFloor: number | null) =>
      setSearchParamsState('preferredFloor', String(preferredFloor)),
  };
}
