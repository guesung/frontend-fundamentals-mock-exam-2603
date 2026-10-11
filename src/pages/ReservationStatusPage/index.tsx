import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

import { ReservationHeader } from 'components';
import {
  MessageBanner,
  MyReservation,
  ReservationButton,
  ReservationDateSelector,
  ReservationTimeline,
} from './components';
import { MessageContextProvider } from './contexts';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export function ReservationStatusPage() {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <div
          css={css`
            background: ${colors.white};
            padding-bottom: 40px;
          `}
        >
          <ReservationHeader>회의실 예약</ReservationHeader>

          <Spacing size={24} />

          <ReservationDateSelector />
          <Spacing size={24} />
          <Border size={8} />
          <Spacing size={24} />

          <ReservationTimeline />

          <Spacing size={24} />
          <Border size={8} />
          <Spacing size={24} />

          <MessageContextProvider>
            <MessageBanner />

            <ErrorBoundary fallback={null}>
              <Suspense fallback={<MyReservation.Loading />}>
                <MyReservation />
              </Suspense>
            </ErrorBoundary>
          </MessageContextProvider>

          <Spacing size={24} />
          <Border size={8} />
          <Spacing size={24} />

          <ReservationButton />

          <Spacing size={24} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
