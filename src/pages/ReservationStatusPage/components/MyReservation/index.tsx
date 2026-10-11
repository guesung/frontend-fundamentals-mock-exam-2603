import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Suspense } from 'react';
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
        <Suspense fallback={null}>
          <MyReservationCount />
        </Suspense>
      </div>
      <Spacing size={16} />

      <Suspense fallback={<MyReservationList.Loading />}>
        <MyReservationList />
      </Suspense>
    </div>
  );
}
