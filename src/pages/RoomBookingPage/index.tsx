import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ReservationHeader } from 'components/ReservationHeader';
import { ReservationCondition, ReservationNavigation, ReservationRoomList, ValidationError } from './components';
import { ReservationError } from './components/ReservationError';
import { ErrorMessageContextProvider } from './contexts/ErrorMessageContextProvider';
import { useReservationSearchParams } from './hooks';

export function RoomBookingPage() {
  const { rservationFilterKey } = useReservationSearchParams();

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <ReservationNavigation />

      <ReservationHeader>예약하기</ReservationHeader>

      <ErrorMessageContextProvider resetKey={rservationFilterKey}>
        <ReservationError />

        <Spacing size={24} />

        <ReservationCondition />

        <Spacing size={24} />

        <ReservationRoomList />
      </ErrorMessageContextProvider>

      <Spacing size={24} />

      <ValidationError />

      <Spacing size={24} />

      <Border size={8} />
    </div>
  );
}
