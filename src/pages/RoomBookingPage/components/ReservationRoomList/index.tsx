import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservations, useRooms } from 'apis';
import { useResettableState } from 'hooks';
import { useErrorMessageContext } from '../../contexts';
import { AvailableRoomList, NoAvailbleRoom } from './AvailableRoomList';
import { ReservationBookButton } from './ReservationBookButton';
import { useReservationConditions } from '../../hooks/useReservationConditions';
import { Reservation, Room } from 'types';
import { Conditions } from '../../types';

export function ReservationRoomList() {
  const { conditions, reservationFilterKey } = useReservationConditions();

  const [selectedRoomId, setSelectedRoomId] = useResettableState<string | null>(reservationFilterKey, null);

  const { setErrorMessage } = useErrorMessageContext();

  const { data: rooms = [] } = useRooms();
  const { data: reservations = [] } = useReservations({ date: conditions.date });

  const availableRoomList = filterAvailableRoomList(rooms, conditions, reservations);
  const sortedAvailableRoomList = sortRoomList(availableRoomList);

  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: baseline;
          gap: 6px;
        `}
      >
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          예약 가능 회의실
        </Text>
        <Text typography="t7" fontWeight="medium" color={colors.grey500}>
          {sortedAvailableRoomList.length}개
        </Text>
      </div>

      <Spacing size={16} />

      {sortedAvailableRoomList.length > 0 ? (
        <AvailableRoomList
          roomList={sortedAvailableRoomList}
          onRoomClick={id => {
            setErrorMessage(null);
            setSelectedRoomId(id);
          }}
          selectedRoomId={selectedRoomId}
        />
      ) : (
        <NoAvailbleRoom />
      )}

      <Spacing size={16} />

      <ReservationBookButton selectedRoomId={selectedRoomId} resetSelectedRoomId={() => setSelectedRoomId(null)} />
    </div>
  );
}

function filterAvailableRoomList(rooms: Room[], conditions: Conditions, reservations: Reservation[]): Room[] {
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

function sortRoomList(rooms: Room[]): Room[] {
  return [...rooms].sort((a, b) => a.floor - b.floor || a.name.localeCompare(b.name));
}
