import { css } from '@emotion/react';
import { Top } from '_tosslib/components';
import { PropsWithChildren } from 'react';

interface HeaderProps {}

export function ReservationHeader({ children }: PropsWithChildren<HeaderProps>) {
  return (
    <Top.Top03
      css={css`
        padding-left: 24px;
        padding-right: 24px;
      `}
    >
      {children}
    </Top.Top03>
  );
}
