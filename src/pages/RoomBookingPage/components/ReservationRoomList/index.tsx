import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservations, useRooms } from 'apis';
import { useResettableState } from 'hooks';
import { useErrorMessageContext } from 'pages/RoomBookingPage/contexts';
import { useReservationSearchParams } from '../../hooks';
import { getValidationError } from '../../utils';
import { AvailableRoomList, NoAvailbleRoom } from './AvailableRoomList';
import { ReservationBookButton } from './ReservationBookButton';

export function ReservationRoomList() {
  const { field, rservationFilterKey } = useReservationSearchParams();

  const [selectedRoomId, setSelectedRoomId] = useResettableState<string | null>(rservationFilterKey, '');

  const { onErrorMessageChange } = useErrorMessageContext();

  const { data: rooms = [] } = useRooms();
  const { data: reservations = [] } = useReservations({ date: field.date });

  const availableRoomList = rooms
    .filter(room => {
      const isCapacityAvailable = room.capacity >= field.attendees;
      const isAllEquipmentAvailable = field.equipment.every(eq => room.equipment.includes(eq));
      const isPreferredFloorAvailable = field.preferredFloor === null || room.floor === field.preferredFloor;
      const hasConflict = reservations.some(
        reservation =>
          reservation.roomId === room.id && reservation.start < field.endTime && reservation.end > field.startTime
      );

      return isCapacityAvailable && isAllEquipmentAvailable && isPreferredFloorAvailable && !hasConflict;
    })
    .sort((a, b) => a.floor - b.floor || a.name.localeCompare(b.name));

  if (field.endTime === '' || field.startTime === '') return null;
  if (getValidationError(field)) return null;
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
          {availableRoomList.length}개
        </Text>
      </div>

      <Spacing size={16} />

      {availableRoomList.length > 0 ? (
        <AvailableRoomList
          availableRoomList={availableRoomList}
          onAvilableRoomClick={id => {
            onErrorMessageChange(null);
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
