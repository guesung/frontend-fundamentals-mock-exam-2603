import { useMemo } from 'react';
import { Equipment, Reservation, Room } from '_tosslib/server/types';

function hasTimeConflict(
  reservation: Reservation,
  roomId: string,
  date: string,
  startTime: string,
  endTime: string
): boolean {
  return (
    reservation.roomId === roomId &&
    reservation.date === date &&
    reservation.start < endTime &&
    reservation.end > startTime
  );
}

export function useAvailableRooms(params: {
  rooms: Room[];
  reservations: Reservation[];
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: Equipment[];
  preferredFloor: number | null;
  isFilterComplete: boolean;
}): { availableRooms: Room[]; floors: number[] } {
  const { rooms, reservations, date, startTime, endTime, attendees, equipment, preferredFloor, isFilterComplete } =
    params;

  const floors = useMemo(() => [...new Set(rooms.map((room: Room) => room.floor))].sort((a, b) => a - b), [rooms]);

  const availableRooms = useMemo(() => {
    if (!isFilterComplete) return [];

    return rooms
      .filter((room: Room) => {
        if (room.capacity < attendees) return false;
        if (!equipment.every(eq => room.equipment.includes(eq))) return false;
        if (preferredFloor !== null && room.floor !== preferredFloor) return false;
        const hasConflict = reservations.some(reservation =>
          hasTimeConflict(reservation, room.id, date, startTime, endTime)
        );
        if (hasConflict) return false;
        return true;
      })
      .sort((a: Room, b: Room) => {
        if (a.floor !== b.floor) return a.floor - b.floor;
        return a.name.localeCompare(b.name);
      });
  }, [rooms, reservations, date, startTime, endTime, attendees, equipment, preferredFloor, isFilterComplete]);

  return { availableRooms, floors };
}
