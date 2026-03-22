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
import { ErrorBanner } from './components/ErrorBanner';
import { BookingConditionForm } from './components/BookingConditionForm';
import { ValidationError } from './components/ValidationError';
import { AvailableRoomList } from './components/AvailableRoomList';

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

  // 입력 검증
  let validationError: string | null = null;
  const hasTimeInputs = startTime !== '' && endTime !== '';
  if (hasTimeInputs) {
    if (endTime <= startTime) {
      validationError = MESSAGES.VALIDATION.END_TIME_BEFORE_START;
    } else if (attendees < 1) {
      validationError = MESSAGES.VALIDATION.MIN_ATTENDEES;
    }
  }
  const isFilterComplete = hasTimeInputs && !validationError;

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

      const errResult = result as { message?: string };
      setErrorMessage(errResult.message ?? MESSAGES.BOOKING.FAILURE);
      setSelectedRoomId(null);
    } catch (error: unknown) {
      let serverMessage: string = MESSAGES.BOOKING.FAILURE;
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      setErrorMessage(serverMessage);
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

      {errorMessage && <ErrorBanner message={errorMessage} />}

      <Spacing size={24} />

      <BookingConditionForm
        date={date}
        startTime={startTime}
        endTime={endTime}
        attendees={attendees}
        equipment={equipment}
        preferredFloor={preferredFloor}
        floors={floors}
        onDateChange={v => {
          setDate(v);
          handleFilterChange();
        }}
        onStartTimeChange={v => {
          setStartTime(v);
          handleFilterChange();
        }}
        onEndTimeChange={v => {
          setEndTime(v);
          handleFilterChange();
        }}
        onAttendeesChange={v => {
          setAttendees(v);
          handleFilterChange();
        }}
        onEquipmentChange={v => {
          setEquipment(v);
          handleFilterChange();
        }}
        onPreferredFloorChange={v => {
          setPreferredFloor(v);
          handleFilterChange();
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
