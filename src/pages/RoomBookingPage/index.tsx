import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Top, Spacing, Border } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useRooms } from 'hooks/queries/useRooms';
import { useReservations } from 'hooks/queries/useReservations';
import { useAvailableRooms } from 'pages/RoomBookingPage/hooks/useAvailableRooms';
import { useBookingCondition } from './hooks/useBookingCondition';
import { useBookRoom } from './hooks/useBookRoom';
import { StatusBanner } from 'components/StatusBanner';
import { BookingConditionForm } from './components/BookingConditionForm';
import { ValidationError } from './components/ValidationError';
import { AvailableRoomList } from './components/AvailableRoomList';

export function RoomBookingPage() {
  const navigate = useNavigate();
  const { book, errorMessage, clearError, isBooking } = useBookRoom();
  const {
    condition,
    onChange,
    selectedRoomId,
    setSelectedRoomId,
    validationError,
    isFilterComplete,
  } = useBookingCondition(clearError);

  const { data: rooms } = useRooms();
  const { data: reservations } = useReservations(condition.date);

  const { availableRooms, floors } = useAvailableRooms({
    rooms,
    reservations,
    ...condition,
    isFilterComplete,
  });

  const handleBook = async () => {
    const attempted = await book({ roomId: selectedRoomId, ...condition });
    if (attempted) {
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
        condition={condition}
        floors={floors}
        onChange={onChange}
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
          isBooking={isBooking}
        />
      )}

      <Spacing size={24} />
    </div>
  );
}
