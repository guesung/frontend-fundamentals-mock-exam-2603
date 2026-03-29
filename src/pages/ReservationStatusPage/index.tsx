import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Top, Spacing, Border, Button } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { DateSelector } from './components/DateSelector';
import { ReservationTimeline } from './components/ReservationTimeline';
import { StatusBanner } from 'components/StatusBanner';
import { MyReservationList } from './components/MyReservationList';
import { ReservationProvider, useReservationContext } from './context/ReservationContext';

function ReservationStatusContent() {
  const navigate = useNavigate();
  const { message } = useReservationContext();

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        회의실 예약
      </Top.Top03>

      <Spacing size={24} />

      <DateSelector />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <ReservationTimeline />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {message && <StatusBanner type={message.type} message={message.text} />}

      <MyReservationList />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <div
        css={css`
          padding: 0 24px;
        `}
      >
        <Button display="full" onClick={() => navigate('/booking')}>
          예약하기
        </Button>
      </div>
      <Spacing size={24} />
    </div>
  );
}

export function ReservationStatusPage() {
  return (
    <ReservationProvider>
      <ReservationStatusContent />
    </ReservationProvider>
  );
}
