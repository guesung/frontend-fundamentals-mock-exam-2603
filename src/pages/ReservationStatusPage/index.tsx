import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useLocation } from 'react-router-dom';

import { Header } from 'components';
import {
  MessageBanner,
  MyReservation,
  ReservationButton,
  ReservationDateSelector,
  ReservationTimeline,
  type Message,
} from './components';
import { useEffect, useState } from 'react';
import { DateContextProvider } from './contexts/DateContext';

export function ReservationStatusPage() {
  const location = useLocation();

  const locationState = location.state as { message?: string } | null;
  const [message, setMessage] = useState<Message | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, '');
    }
  }, [locationState]);

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

      {message && <MessageBanner message={message} />}

      <MyReservation setMessage={setMessage} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <ReservationButton />

      <Spacing size={24} />
    </div>
  );
}
