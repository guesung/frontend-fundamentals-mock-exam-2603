import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

import { Header } from 'components';
import {
  MessageBanner,
  MyReservation,
  ReservationButton,
  ReservationDateSelector,
  ReservationTimeline,
} from './components';
import { DateContextProvider, MessageContextProvider } from './contexts';

export function ReservationStatusPage() {
  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <Header>회의실 예약</Header>

      <Spacing size={24} />

      <DateContextProvider>
        <ReservationDateSelector />

        <Spacing size={24} />

        <Border size={8} />

        <Spacing size={24} />

        <ReservationTimeline />
      </DateContextProvider>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <MessageContextProvider>
        <MessageBanner />

        <MyReservation />
      </MessageContextProvider>

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <ReservationButton />

      <Spacing size={24} />
    </div>
  );
}
