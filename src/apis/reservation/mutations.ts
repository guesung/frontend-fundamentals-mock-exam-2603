import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation, createReservation } from './apis';
import { CreateReservationPayload } from './types';
import { QUERY_KEYS } from './queryKeys';

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation((id: string) => cancelReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReservationList() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reservations() });
    },
  });
}

export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation((data: CreateReservationPayload) => createReservation(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReservationList() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reservations(variables.date) });
    },
  });
}
