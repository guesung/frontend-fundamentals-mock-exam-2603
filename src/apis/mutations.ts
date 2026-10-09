import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservation, createReservation } from './apis';
import { CreateReservationPayload } from './types';

export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation((id: string) => cancelReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
      queryClient.invalidateQueries(['myReservations']);
    },
  });
}

export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation((data: CreateReservationPayload) => createReservation(data), {
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(['reservations', variables.date]);
      queryClient.invalidateQueries(['myReservations']);
    },
  });
}
