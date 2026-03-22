import { useQuery } from '@tanstack/react-query';
import { getReservations } from 'pages/remotes';
import { QUERY_KEYS } from 'constants/queryKeys';

export function useReservations(date: string) {
  return useQuery({
    queryKey: QUERY_KEYS.reservationsByDate(date),
    queryFn: () => getReservations(date),
    enabled: !!date,
    initialData: [],
  });
}
