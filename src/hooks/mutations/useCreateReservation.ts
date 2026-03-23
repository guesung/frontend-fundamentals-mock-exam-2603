import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Equipment, Reservation } from '_tosslib/server/types';
import { createReservation } from 'pages/remotes';
import { QUERY_KEYS } from 'constants/queryKeys';

export function useCreateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Reservation, 'id'>) => createReservation(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reservationsByDate(variables.date) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReservations() });
    },
  });
}
