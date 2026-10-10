import { formatDate } from 'utils/date';
import { useSearchParamsState } from './common/useSearchParamsState';

export function useReservationDate() {
  const [date, setDate] = useSearchParamsState<string>('date', { defaultValue: formatDate(new Date()) });

  return { date, setDate };
}
