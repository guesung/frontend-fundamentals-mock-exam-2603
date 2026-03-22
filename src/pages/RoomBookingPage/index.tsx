import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Top, Spacing, Border } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { MESSAGES } from '_tosslib/constants/messages';
import axios from 'axios';
import { useRooms } from 'hooks/queries/useRooms';
import { useReservations } from 'hooks/queries/useReservations';
import { useCreateReservation } from 'hooks/mutations/useCreateReservation';
import { useAvailableRooms } from 'hooks/useAvailableRooms';
import { useBookingSearchParams } from 'hooks/useBookingSearchParams';
import { StatusBanner } from 'components/StatusBanner';
import { BookingConditionForm } from './components/BookingConditionForm';
import { ValidationError } from './components/ValidationError';
import { AvailableRoomList } from './components/AvailableRoomList';

function getBookingValidationError(startTime: string, endTime: string, attendees: number): string | null {
  const hasTimeInputs = startTime !== '' && endTime !== '';
  if (!hasTimeInputs) return null;

  if (endTime <= startTime) return MESSAGES.VALIDATION.END_TIME_BEFORE_START;
  if (attendees < 1) return MESSAGES.VALIDATION.MIN_ATTENDEES;
  return null;
}

export function RoomBookingPage() {
  const navigate = useNavigate();
  const {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    attendees,
    setAttendees,
    equipment,
    setEquipment,
    preferredFloor,
    setPreferredFloor,
  } = useBookingSearchParams();

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: rooms } = useRooms();
  const { data: reservations } = useReservations(date);
  const createMutation = useCreateReservation();

  // 필터 변경 시 선택 초기화
  const handleFilterChange = () => {
    setSelectedRoomId(null);
    setErrorMessage(null);
  };

  const withFilterReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      handleFilterChange();
    };

  // 입력 검증
  const validationError = getBookingValidationError(startTime, endTime, attendees);
  const isFilterComplete = startTime !== '' && endTime !== '' && !validationError;

  // 필터링
  const { availableRooms, floors } = useAvailableRooms({
    rooms,
    reservations,
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
    isFilterComplete,
  });

  const handleBook = async () => {
    if (!selectedRoomId) {
      setErrorMessage(MESSAGES.VALIDATION.SELECT_ROOM);
      return;
    }
    if (!startTime || !endTime) {
      setErrorMessage(MESSAGES.VALIDATION.SELECT_TIME);
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
        navigate('/', { state: { message: MESSAGES.BOOKING.SUCCESS } });
        return;
      }

      setErrorMessage(result.message ?? MESSAGES.BOOKING.FAILURE);
    } catch (error) {
      let serverMessage: string = MESSAGES.BOOKING.FAILURE;
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      setErrorMessage(serverMessage);
    } finally {
      setSelectedRoomId(null);
    }
  };

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <div
        css={css`
          padding: 12px 24px 0;
        `}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="뒤로가기"
          css={css`
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            font-size: 14px;
            color: ${colors.grey600};
            &:hover {
              color: ${colors.grey900};
            }
          `}
        >
          ← 예약 현황으로
        </button>
      </div>
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        예약하기
      </Top.Top03>

      {errorMessage && <StatusBanner type="error" message={errorMessage} />}

      <Spacing size={24} />

      <BookingConditionForm
        condition={{ date, startTime, endTime, attendees, equipment, preferredFloor }}
        floors={floors}
        onChange={{
          date: withFilterReset(setDate),
          startTime: withFilterReset(setStartTime),
          endTime: withFilterReset(setEndTime),
          attendees: withFilterReset(setAttendees),
          equipment: withFilterReset(setEquipment),
          preferredFloor: withFilterReset(setPreferredFloor),
        }}
      />

      {validationError && <ValidationError message={validationError} />}

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {isFilterComplete && (
        <AvailableRoomList
          rooms={availableRooms}
          selectedRoomId={selectedRoomId}
          onRoomSelect={setSelectedRoomId}
          onBook={handleBook}
          isBooking={createMutation.isLoading}
        />
      )}

      <Spacing size={24} />
    </div>
  );
}
