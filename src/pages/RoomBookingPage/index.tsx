import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Top, Spacing, Border, Button, Text, Select, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import axios from 'axios';
import { EQUIPMENT_LABELS } from 'constants/equipment';
import { createReservation, getReservations, getRooms } from 'apis';
import { ReservationHeader } from 'components/ReservationHeader';
import { ReservationButton, ReservationCondition, ReservationNavigation, ReservationRoomList } from './components';
import { ReservationError } from './components/ReservationError';
import { formatDate } from 'utils/date';
import { useReservationSearchParams } from './hooks';

const TIME_SLOTS: string[] = [];
for (let h = 9; h <= 20; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 20) {
    TIME_SLOTS.push(`${String(h).padStart(2, '0')}:30`);
  }
}

export function RoomBookingPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { date, attendees, endTime, equipment, startTime, preferredFloor } = useReservationSearchParams();

  const createMutation = useMutation(
    (data: { roomId: string; date: string; start: string; end: string; attendees: number; equipment: string[] }) =>
      createReservation(data),
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(['reservations', variables.date]);
        queryClient.invalidateQueries(['myReservations']);
      },
    }
  );

  const { data: rooms = [] } = useQuery(['rooms'], getRooms);
  const { data: reservations = [] } = useQuery(['reservations', date], () => getReservations(date), {
    enabled: !!date,
  });

  // 입력 검증
  let validationError: string | null = null;
  const hasTimeInputs = startTime !== '' && endTime !== '';
  if (hasTimeInputs) {
    if (endTime <= startTime) {
      validationError = '종료 시간은 시작 시간보다 늦어야 합니다.';
    } else if (attendees < 1) {
      validationError = '참석 인원은 1명 이상이어야 합니다.';
    }
  }
  const isFilterComplete = hasTimeInputs && !validationError;

  const availableRooms = isFilterComplete
    ? rooms
        .filter((room: { id: string; capacity: number; equipment: string[]; floor: number }) => {
          if (room.capacity < attendees) return false;
          if (!equipment.every(eq => room.equipment.includes(eq))) return false;
          if (preferredFloor !== null && room.floor !== preferredFloor) return false;
          const hasConflict = reservations.some(
            (r: { roomId: string; date: string; start: string; end: string }) =>
              r.roomId === room.id && r.date === date && r.start < endTime && r.end > startTime
          );
          if (hasConflict) return false;
          return true;
        })
        .sort((a: { floor: number; name: string }, b: { floor: number; name: string }) => {
          if (a.floor !== b.floor) return a.floor - b.floor;
          return a.name.localeCompare(b.name);
        })
    : [];

  const handleBook = async () => {
    if (!selectedRoomId) {
      setErrorMessage('회의실을 선택해주세요.');
      return;
    }
    if (!startTime || !endTime) {
      setErrorMessage('시작 시간과 종료 시간을 선택해주세요.');
      return;
    }

    try {
      const result = await createMutation.mutateAsync({
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
      setErrorMessage(errResult.message ?? '예약에 실패했습니다.');
      setSelectedRoomId(null);
    } catch (err: unknown) {
      let serverMessage = '예약에 실패했습니다.';
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      setErrorMessage(serverMessage);
      setSelectedRoomId(null);
    }
  };

  // 필터 변경 시 선택 초기화
  const handleFilterChange = () => {
    setSelectedRoomId(null);
    setErrorMessage(null);
  };

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <ReservationNavigation />

      <ReservationHeader>예약하기</ReservationHeader>

      {errorMessage && <ReservationError errorMessage={errorMessage} />}

      <ReservationCondition onFilterChange={handleFilterChange} />

      <ReservationRoomList />
      <ReservationButton />

      <Spacing size={24} />

      {validationError && (
        <div
          css={css`
            padding: 0 24px;
          `}
        >
          <Spacing size={8} />
          <span
            css={css`
              color: ${colors.red500};
              font-size: 14px;
            `}
            role="alert"
          >
            {validationError}
          </span>
        </div>
      )}

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 예약 가능 회의실 목록 */}
      {isFilterComplete && (
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
          <Button display="full" onClick={handleBook} disabled={createMutation.isLoading}>
            {createMutation.isLoading ? '예약 중...' : '확정'}
          </Button>
        </div>
      )}

      <Spacing size={24} />
    </div>
  );
}
