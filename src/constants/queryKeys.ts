export const QUERY_KEYS = {
  rooms: () => ['rooms'],
  reservations: () => ['reservations'],
  reservationsByDate: (date: string) => ['reservations', date],
  myReservations: () => ['myReservations'],
} as const;
