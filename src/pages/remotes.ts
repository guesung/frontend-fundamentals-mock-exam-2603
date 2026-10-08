import { http } from 'pages/http';

export interface Room {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  equipment: string[];
}

type GetRoomResponse = Room[];

export function getRooms() {
  return http.get<GetRoomResponse>('/api/rooms');
}

export interface Reservation {
  id: string;
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
}

type GetReservationResponse = Reservation[];

export function getReservations(date: string) {
  return http.get<GetReservationResponse>(`/api/reservations?date=${date}`);
}

export function createReservation(data: {
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
}) {
  return http.post<typeof data, { ok: boolean; reservation?: unknown; code?: string; message?: string }>(
    '/api/reservations',
    data
  );
}

export function getMyReservations() {
  return http.get<
    { id: string; roomId: string; date: string; start: string; end: string; attendees: number; equipment: string[] }[]
  >('/api/my-reservations');
}

export function cancelReservation(id: string) {
  return http.delete<{ ok: boolean }>(`/api/reservations/${id}`);
}
