import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getMyReservations, getReservations, getRooms } from './apis';
import { QUERY_KEYS } from './queryKeys';

export function useMyReservationList() {
  return useSuspenseQuery({ queryKey: QUERY_KEYS.myReservationList(), queryFn: getMyReservations });
}

export function useRooms() {
  return useSuspenseQuery({ queryKey: QUERY_KEYS.rooms(), queryFn: () => getRooms() });
}

interface UseReservationsParams {
  date: string;
}

export function useReservations({ date }: UseReservationsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.reservations(date),
    queryFn: () => getReservations(date),
    keepPreviousData: true,
  });
}
