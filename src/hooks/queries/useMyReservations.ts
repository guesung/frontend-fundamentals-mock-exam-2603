import { useQuery } from '@tanstack/react-query';
import { getMyReservations } from 'pages/remotes';
import { QUERY_KEYS } from 'constants/queryKeys';

export function useMyReservations() {
  return useQuery({
    queryKey: QUERY_KEYS.myReservations(),
    queryFn: getMyReservations,
    initialData: [],
  });
}
