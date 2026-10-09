import { css } from '@emotion/react';
import { Button, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useCreateReservation, useReservations, useRooms } from 'apis';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorMessageContext } from '../../contexts';
import { useReservationSearchParams } from '../../hooks';
import { getValidationError } from '../../utils';
import { AvailableRoomList, NoAvailbleRoom } from './AvailableRoomList';
import { ReservationBookButton } from './ReservationBookButton';

export function ReservationRoomList() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('');

  const { date, attendees, endTime, equipment, startTime, preferredFloor } = useReservationSearchParams();

  const { data: rooms = [] } = useRooms();
  const { data: reservations = [] } = useReservations({ date });

  const availableRoomList = rooms
    .filter(room => {
      const isCapacityAvailable = room.capacity >= attendees;
      const isAllEquipmentAvailable = equipment.every(eq => room.equipment.includes(eq));
      const isPreferredFloorAvailable = preferredFloor === null || room.floor === preferredFloor;
      const isRoomConflict = reservations.some(
        r => r.roomId === room.id && r.date === date && r.start < endTime && r.end > startTime
      );

      return isCapacityAvailable && isAllEquipmentAvailable && isPreferredFloorAvailable && !isRoomConflict;
    })
    .sort((a, b) => a.floor - b.floor || a.name.localeCompare(b.name));

  const validationError = getValidationError({ endTime, startTime, attendees });
  if (validationError) return null;
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
