import { css } from '@emotion/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ErrorView } from 'components/ErrorView';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MyReservationCount } from './MyReservationCount';
import { MyReservationList } from './MyReservationList';

export function MyReservation() {
  return (
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
          내 예약
        </Text>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => <ErrorView resetErrorBoundary={resetErrorBoundary} />}
            >
              <Suspense fallback={null}>
                <MyReservationCount />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
      <Spacing size={16} />

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => <ErrorView resetErrorBoundary={resetErrorBoundary} />}
          >
            <Suspense fallback={<MyReservationList.Loading />}>
              <MyReservationList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
