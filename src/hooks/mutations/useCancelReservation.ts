import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation } from 'pages/remotes';
import { QUERY_KEYS } from 'constants/queryKeys';

export function useCancelReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reservations() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReservations() });
    },
  });
}
