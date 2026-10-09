import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ReservationHeader } from 'components/ReservationHeader';
import { useState } from 'react';
import { ReservationButton, ReservationCondition, ReservationNavigation, ReservationRoomList } from './components';
import { ReservationError } from './components/ReservationError';
import { useReservationSearchParams } from './hooks';

const TIME_SLOTS: string[] = [];
for (let h = 9; h <= 20; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 20) {
    TIME_SLOTS.push(`${String(h).padStart(2, '0')}:30`);
  }
}

export function RoomBookingPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { date, attendees, endTime, equipment, startTime, preferredFloor } = useReservationSearchParams();

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
      validationError = '종료 시간은 시작 시간보다 늦어야 합니다.';
    } else if (attendees < 1) {
      validationError = '참석 인원은 1명 이상이어야 합니다.';
    }
  }
  const isFilterComplete = hasTimeInputs && !validationError;

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

      {isFilterComplete && (
        <ReservationRoomList
          selectedRoomId={selectedRoomId}
          setErrorMessage={setErrorMessage}
          setSelectedRoomId={setSelectedRoomId}
        />
      )}
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

      <Spacing size={24} />
    </div>
  );
}
