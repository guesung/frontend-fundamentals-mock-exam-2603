import { useSearchParamsState } from 'hooks';
import { formatDate } from 'utils/date';
import { Conditions } from '../types/conditions';

interface UseReservationConditionsReturns {
  conditions: Conditions;
  conditionsSetter: {
    [K in keyof Conditions]: (newValue: Conditions[K]) => void;
  };
  reservationFilterKey: string;
}

export function useReservationConditions(): UseReservationConditionsReturns {
  const [date, setDate] = useSearchParamsState<Conditions['date']>('date', { defaultValue: formatDate(new Date()) });
  const [startTime, setStartTime] = useSearchParamsState<Conditions['startTime']>('startTime', { defaultValue: '' });
  const [endTime, setEndTime] = useSearchParamsState<Conditions['endTime']>('endTime', { defaultValue: '' });
  const [attendees, setAttendees] = useSearchParamsState<Conditions['attendees']>('attendees', {
    defaultValue: 1,
    parser: attendees => Number(attendees),
  });
  const [equipment, setEquipment] = useSearchParamsState<Conditions['equipment']>('equipment', {
    defaultValue: [],
    parser: equipment => (equipment ? equipment?.split(',') : []),
  });
  const [preferredFloor, setPreferredFloor] = useSearchParamsState<Conditions['preferredFloor']>('preferredFloor', {
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
