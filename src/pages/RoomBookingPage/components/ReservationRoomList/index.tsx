import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservations, useRooms } from 'apis';
import { useState } from 'react';
import { useReservationSearchParams } from '../../hooks';
import { getValidationError } from '../../utils';
import { AvailableRoomList, NoAvailbleRoom } from './AvailableRoomList';
import { ReservationBookButton } from './ReservationBookButton';

export function ReservationRoomList() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('');

  const { field } = useReservationSearchParams();

  const { data: rooms = [] } = useRooms();
  const { data: reservations = [] } = useReservations({ date: field.date });

  const availableRoomList = rooms
    .filter(room => {
      const isCapacityAvailable = room.capacity >= field.attendees;
      const isAllEquipmentAvailable = field.equipment.every(eq => room.equipment.includes(eq));
      const isPreferredFloorAvailable = field.preferredFloor === null || room.floor === field.preferredFloor;
      const isRoomConflict = reservations.some(
        r => r.roomId === room.id && r.date === field.date && r.start < field.endTime && r.end > field.startTime
      );

      return isCapacityAvailable && isAllEquipmentAvailable && isPreferredFloorAvailable && !isRoomConflict;
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
          onAvilableRoomClick={id => setSelectedRoomId(id)}
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
