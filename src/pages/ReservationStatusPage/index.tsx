import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Top, Spacing, Border, Button } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { MESSAGES } from '_tosslib/constants/messages';
import { formatDate } from '_tosslib/utils/date';
import { useRooms } from 'hooks/queries/useRooms';
import { useReservations } from 'hooks/queries/useReservations';
import { useMyReservations } from 'hooks/queries/useMyReservations';
import { useCancelReservation } from 'hooks/mutations/useCancelReservation';
import { DateSelector } from './components/DateSelector';
import { ReservationTimeline } from './components/ReservationTimeline';
import { MessageBanner, Message } from './components/MessageBanner';
import { MyReservationList } from './components/MyReservationList';
import { Room } from '_tosslib/server/types';

export function ReservationStatusPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(() => formatDate(new Date()));
  const [activeReservation, setActiveReservation] = useState<string | null>(null);

  const locationState = location.state as { message?: string } | null;
  const [message, setMessage] = useState<Message | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, '');
    }
  }, [locationState]);

  const { data: rooms } = useRooms();
  const { data: reservations } = useReservations(date);
  const { data: myReservationList } = useMyReservations();
  const cancelMutation = useCancelReservation();

  const handleCancel = async (id: string) => {
    try {
      await cancelMutation.mutateAsync(id);
      setMessage({ type: 'success', text: MESSAGES.CANCEL.SUCCESS });
    } catch {
      setMessage({ type: 'error', text: MESSAGES.CANCEL.FAILURE });
    }
  };

  const getRoomName = (roomId: string) => rooms.find((room: Room) => room.id === roomId)?.name ?? roomId;

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

      <DateSelector date={date} onDateChange={setDate} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <ReservationTimeline
        rooms={rooms}
        reservations={reservations}
        activeReservation={activeReservation}
        onActiveReservationChange={setActiveReservation}
      />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {message && <MessageBanner message={message} />}

      <MyReservationList reservations={myReservationList} getRoomName={getRoomName} onCancel={handleCancel} />

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
