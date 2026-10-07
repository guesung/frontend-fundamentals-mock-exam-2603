import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Top, Spacing, Border, Button, Text, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { getRooms, getReservations, getMyReservations, cancelReservation } from 'pages/remotes';
import { Header, ReservationDateSelector, ReservationTimeline } from '../../components';
import { formatDate } from 'utils/date';
import { EQUIPMENT_LABELS } from '../../constants';
import { Message, MessageBanner } from 'components/MessageBanner';
import { MyReservation } from 'components/MyReservation';
import { ReservationButton } from 'components/ReservationButton';

export function ReservationStatusPage() {
  const location = useLocation();
  const [date, setDate] = useState(formatDate(new Date()));

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

      {/*
       */}

      <Spacing size={24} />

      <ReservationDateSelector date={date} setDate={setDate} />

      <Spacing size={24} />

      <Border size={8} />
      <Spacing size={24} />

      <ReservationTimeline date={date} />

      {/* 예약 현황 타임라인 */}

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 메시지 배너 */}
      {message && <MessageBanner message={message} />}

      <MyReservation setMessage={setMessage} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <ReservationButton />
      {/* 예약하기 버튼 */}

      <Spacing size={24} />
    </div>
  );
}
