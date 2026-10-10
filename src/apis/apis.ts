import { http } from 'modules';
import type {
  CancelReservationResponse,
  CreateReservationPayload,
  CreateReservationResponse,
  GetMyReservations,
  GetReservationResponse,
  GetRoomResponse,
} from './types';

export function getRooms() {
  return http.get<GetRoomResponse>('/api/rooms');
}

export function getReservations(date: string) {
  return http.get<GetReservationResponse>(`/api/reservations?date=${date}`);
}

export async function createReservation(payload: CreateReservationPayload) {
  return http.post<typeof payload, CreateReservationResponse>('/api/reservations', payload);
}

export function getMyReservations() {
  return http.get<GetMyReservations>('/api/my-reservations');
}

export function cancelReservation(id: string) {
  return http.delete<CancelReservationResponse>(`/api/reservations/${id}`);
}
