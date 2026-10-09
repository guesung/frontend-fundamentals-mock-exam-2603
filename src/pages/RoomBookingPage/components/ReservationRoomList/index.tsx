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

export function ReservationRoomList() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('');
  const { onErrorMessageChange } = useErrorMessageContext();

  const { date, attendees, endTime, equipment, startTime, preferredFloor } = useReservationSearchParams();
  const navigate = useNavigate();

  const { data: rooms = [] } = useRooms();
  const { data: reservations = [] } = useReservations({ date });
  const { mutateAsync: createReservation, isPending } = useCreateReservation();

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

  const handleBook = async () => {
    if (!selectedRoomId) {
      onErrorMessageChange('회의실을 선택해주세요.');
      return;
    }
    if (!startTime || !endTime) {
      onErrorMessageChange('시작 시간과 종료 시간을 선택해주세요.');
      return;
    }

    try {
      const result = await createReservation({
        roomId: selectedRoomId,
        date,
        start: startTime,
        end: endTime,
        attendees,
        equipment,
      });

      if ('ok' in result && result.ok) {
        navigate('/', { state: { message: '예약이 완료되었습니다!' } });
        return;
      }

      const errResult = result as { message?: string };
      onErrorMessageChange(errResult.message ?? '예약에 실패했습니다.');
      setSelectedRoomId(null);
    } catch (err: unknown) {
      let serverMessage = '예약에 실패했습니다.';
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      onErrorMessageChange(serverMessage);
      setSelectedRoomId(null);
    }
  };

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
      <Button display="full" onClick={handleBook} disabled={isPending}>
        {isPending ? '예약 중...' : '확정'}
      </Button>
    </div>
  );
}
