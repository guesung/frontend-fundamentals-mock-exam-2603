import { useQuery } from '@tanstack/react-query';
import { getReservations } from 'pages/remotes';

export function useReservations(date: string) {
  return useQuery({
    queryKey: ['reservations', date],
    queryFn: () => getReservations(date),
    enabled: !!date,
    initialData: [],
  });
}
