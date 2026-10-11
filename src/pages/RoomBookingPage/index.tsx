import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ReservationHeader } from 'components/ReservationHeader';
import { Suspense } from 'react';
import { ReservationCondition, ReservationNavigation, ReservationRoomList, ValidationError } from './components';
import { ReservationError } from './components/ReservationError';
import { ErrorMessageContextProvider } from './contexts/ErrorMessageContextProvider';
import { useReservationConditions } from './hooks';
import { getValidationError } from './utils';

export function RoomBookingPage() {
  const { reservationFilterKey, conditions } = useReservationConditions();

  const isConditionsReady = !getValidationError(conditions);

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <ReservationNavigation />

      <ReservationHeader>예약하기</ReservationHeader>

      <ErrorMessageContextProvider resetKey={reservationFilterKey}>
        <ReservationError />

        <Spacing size={24} />

        <ReservationCondition />

        <Spacing size={24} />

        {isConditionsReady && (
          <Suspense fallback={null}>
            <ReservationRoomList />
          </Suspense>
        )}
      </ErrorMessageContextProvider>

      <Spacing size={24} />

      <ValidationError />

      <Spacing size={24} />

      <Border size={8} />
    </div>
  );
}
