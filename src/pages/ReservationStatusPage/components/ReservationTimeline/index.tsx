import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TimelineHeader } from './TimelineHeader';
import { ReservationRoomList } from './ReservationRoomList';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorView } from 'components/ErrorView';

export function ReservationTimeline() {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 현황
      </Text>

      <Spacing size={16} />

      <div
        css={css`
          background: ${colors.grey50};
          border-radius: 14px;
          padding: 16px;
        `}
      >
        <TimelineHeader />

        <Spacing size={4} />

        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => <ErrorView resetErrorBoundary={resetErrorBoundary} />}
            >
              <Suspense fallback={<ReservationRoomList.Loading />}>
                <ReservationRoomList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </div>
  );
}
