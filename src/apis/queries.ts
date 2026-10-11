import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getMyReservations, getReservations, getRooms } from './apis';

export function useMyReservationList() {
  return useSuspenseQuery({ queryKey: ['myReservations'], queryFn: getMyReservations });
}

export function useRooms() {
  return useSuspenseQuery({ queryKey: ['rooms'], queryFn: () => getRooms() });
}

interface UseReservationsParams {
  date: string;
}

export function useReservations({ date }: UseReservationsParams) {
  return useQuery({
    queryKey: ['reservations', date],
    queryFn: () => getReservations(date),
  });
}
