import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ReservationHeader } from 'components/ReservationHeader';
import { useState } from 'react';
import {
  ReservationBookButton,
  ReservationButton,
  ReservationCondition,
  ReservationNavigation,
  ReservationRoomList,
  ValidationError,
} from './components';
import { ReservationError } from './components/ReservationError';
import { useReservationSearchParams } from './hooks';
import { useSearchParams } from 'react-router-dom';
import { ErrorMessageContextProvider } from './contexts/ErrorMessageContextProvider';

const TIME_SLOTS: string[] = [];
for (let h = 9; h <= 20; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 20) {
    TIME_SLOTS.push(`${String(h).padStart(2, '0')}:30`);
  }
}

export function RoomBookingPage() {
  const [searchParams] = useSearchParams();
  const filterKey = searchParams.toString();

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <ReservationNavigation />

      <ReservationHeader>예약하기</ReservationHeader>

      <ErrorMessageContextProvider key={filterKey}>
        <ReservationError />

        <ReservationCondition />

        <ReservationRoomList key={filterKey} />

        <ReservationBookButton />
      </ErrorMessageContextProvider>

      <ReservationButton />

      <Spacing size={24} />

      <ValidationError />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <Spacing size={24} />
    </div>
  );
}
