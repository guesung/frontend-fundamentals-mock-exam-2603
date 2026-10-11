import { Conditions } from 'pages/RoomBookingPage/types';
import { Reservation, Room } from 'types';

export function filterAvailableRoomList(rooms: Room[], conditions: Conditions, reservations: Reservation[]): Room[] {
  return rooms.filter(room => {
    const isCapacityAvailable = room.capacity >= conditions.attendees;
    const isAllEquipmentAvailable = conditions.equipment.every(eq => room.equipment.includes(eq));
    const isPreferredFloorAvailable = conditions.preferredFloor === null || room.floor === conditions.preferredFloor;
    const hasConflict = reservations.some(
      reservation =>
        reservation.roomId === room.id &&
        reservation.start < conditions.endTime &&
        reservation.end > conditions.startTime
    );

    return isCapacityAvailable && isAllEquipmentAvailable && isPreferredFloorAvailable && !hasConflict;
  });
}

export function sortRoomList(rooms: Room[]): Room[] {
  return [...rooms].sort((a, b) => a.floor - b.floor || a.name.localeCompare(b.name));
}
