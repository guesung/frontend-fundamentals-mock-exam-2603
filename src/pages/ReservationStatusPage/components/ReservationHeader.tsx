import { css } from '@emotion/react';
import { Top } from '_tosslib/components';

export function ReservationHeader() {
  return (
    <Top.Top03
      css={css`
        padding-left: 24px;
        padding-right: 24px;
      `}
    >
      회의실 예약
    </Top.Top03>
  );
}
