import { useQuery } from '@tanstack/react-query';
import { getMyReservations, getReservations, getRooms } from './apis';

export function useMyReservationList() {
  return useQuery(['myReservations'], getMyReservations);
}

export function useRooms() {
  return useQuery(['rooms'], () => getRooms());
}

interface UseReservationsParams {
  date: string;
}

export function useReservations({ date }: UseReservationsParams) {
  return useQuery(['reservations', date], () => getReservations(date), {
    enabled: !!date,
  });
}
