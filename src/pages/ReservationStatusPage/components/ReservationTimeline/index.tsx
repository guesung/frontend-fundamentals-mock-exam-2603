import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservations, useRooms } from 'apis';
import { Room } from 'types';
import { useDateContext } from '../../contexts';
import { TimelineHeader } from './TimelineHeader';
import { TimelineRoom } from './TimelineRoom';
import { useState } from 'react';

export function ReservationTimeline() {
  const { date } = useDateContext();
  const [activeReservationId, setActiveReservationId] = useState<string>('');

  const { data: reservations = [] } = useReservations({ date });
  const { data: rooms = [] } = useRooms();

  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 현황
      </Text>

      <Spacing size={16} />

      <div
        css={css`
          background: ${colors.grey50};
          border-radius: 14px;
          padding: 16px;
        `}
      >
        <TimelineHeader />

        <Spacing size={4} />

        {rooms.map((room: Room) => (
          <TimelineRoom
            key={room.id}
            roomReservations={reservations.filter(reservation => reservation.roomId === room.id)}
            room={room}
            activeReservationId={activeReservationId}
            onReservationItemClick={(id: string) => setActiveReservationId(prev => (prev === id ? '' : id))}
          />
        ))}
      </div>
    </div>
  );
}
