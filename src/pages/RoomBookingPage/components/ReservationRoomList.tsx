import { css } from '@emotion/react';
import { Button, ListRow, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useCreateReservation, useReservations, useRooms } from 'apis';
import axios from 'axios';
import { EQUIPMENT_LABELS } from 'constants/equipment';
import { useNavigate } from 'react-router-dom';
import { useReservationSearchParams } from '../hooks';
import { useState } from 'react';
import { useErrorMessageContext } from '../contexts/ErrorMessageContextProvider';

export function ReservationRoomList() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('');
  const { onErrorMessageChange } = useErrorMessageContext();

  const { date, attendees, endTime, equipment, startTime, preferredFloor } = useReservationSearchParams();
  const navigate = useNavigate();

  const { data: rooms = [] } = useRooms();
  const { data: reservations = [] } = useReservations({ date });
  const { mutateAsync: createReservation, isPending } = useCreateReservation();

  const availableRooms = rooms
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
          {availableRooms.length}개
        </Text>
      </div>
      <Spacing size={16} />

      {availableRooms.length === 0 ? (
        <div
          css={css`
            padding: 40px 0;
            text-align: center;
            background: ${colors.grey50};
            border-radius: 14px;
          `}
        >
          <Text typography="t6" color={colors.grey500}>
            조건에 맞는 회의실이 없습니다.
          </Text>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {availableRooms.map(
            (room: { id: string; name: string; floor: number; capacity: number; equipment: string[] }) => {
              const isSelected = selectedRoomId === room.id;
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={room.name}
                  css={css`
                    cursor: pointer;
                    padding: 14px 16px;
                    border-radius: 14px;
                    border: 2px solid ${isSelected ? colors.blue500 : colors.grey200};
                    background: ${isSelected ? colors.blue50 : colors.white};
                    transition: all 0.15s;
                    &:hover {
                      border-color: ${isSelected ? colors.blue500 : colors.grey300};
                    }
                  `}
                >
                  <ListRow
                    contents={
                      <ListRow.Text2Rows
                        top={room.name}
                        topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
                        bottom={`${room.floor}층 · ${room.capacity}명 · ${room.equipment
                          .map((e: string) => EQUIPMENT_LABELS[e])
                          .join(', ')}`}
                        bottomProps={{ typography: 't7', color: colors.grey600 }}
                      />
                    }
                    right={
                      isSelected ? (
                        <Text typography="t7" fontWeight="bold" color={colors.blue500}>
                          선택됨
                        </Text>
                      ) : undefined
                    }
                  />
                </div>
              );
            }
          )}
        </div>
      )}

      <Spacing size={16} />
      <Button display="full" onClick={handleBook} disabled={isPending}>
        {isPending ? '예약 중...' : '확정'}
      </Button>
    </div>
  );
}
