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

interface UseAvailableRoomsParams {
  rooms: Room[];
  reservations: Reservation[];
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: Equipment[];
  preferredFloor: number | null;
  isFilterComplete: boolean;
}

export function useAvailableRooms(params: UseAvailableRoomsParams): { availableRooms: Room[]; floors: number[] } {
  const { rooms, reservations, date, startTime, endTime, attendees, equipment, preferredFloor, isFilterComplete } =
    params;

  const floors = useMemo(
    () => [...new Set(rooms.map((room: Room) => room.floor))].sort((a: number, b: number) => a - b),
    [rooms]
  );

  const availableRooms = useMemo(() => {
    if (!isFilterComplete) return [];
    return rooms
      .filter((room: Room) => {
        const isCapacitySatisfied = room.capacity >= attendees;
        const isEquipmentSatisfied = equipment.every(equipment => room.equipment.includes(equipment));
        const isPreferredFloorSatisfied = preferredFloor === null || room.floor === preferredFloor;
        const isTimeConflict = reservations.some(reservation =>
          hasTimeConflict(reservation, room.id, date, startTime, endTime)
        );
        return isCapacitySatisfied && isEquipmentSatisfied && isPreferredFloorSatisfied && !isTimeConflict;
      })
      .sort((a: Room, b: Room) => a.floor - b.floor || a.name.localeCompare(b.name));
  }, [rooms, reservations, date, startTime, endTime, attendees, equipment, preferredFloor, isFilterComplete]);

  return { availableRooms, floors };
}
