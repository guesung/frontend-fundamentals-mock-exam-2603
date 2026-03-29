import { css } from '@emotion/react';
import { Top } from '_tosslib/components';

export function BookingPageTitle() {
  return (
    <Top.Top03
      css={css`
        padding-left: 24px;
        padding-right: 24px;
      `}
    >
      예약하기
    </Top.Top03>
  );
}
