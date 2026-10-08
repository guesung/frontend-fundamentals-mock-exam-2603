import { CommonPostResponse } from 'modules';
import { Reservation, Room } from 'types';

export type GetRoomResponse = Room[];

export type GetReservationResponse = Reservation[];
export type CreateReservationResponse = CommonPostResponse & { reservation?: unknown; code?: string; message?: string };
export type CancelReservationResponse = CommonPostResponse;

export type GetMyReservations = Reservation[];
export type CreateReservationPayload = Omit<Reservation, 'id'>;
