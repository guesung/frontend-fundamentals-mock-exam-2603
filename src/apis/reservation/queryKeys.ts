export const QUERY_KEYS = {
  myReservationList: () => ['myReservations'],
  rooms: () => ['rooms'],
  reservations: (date?: string) => ['reservations', date],
};
