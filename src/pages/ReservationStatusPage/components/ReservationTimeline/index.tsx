import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservations, useRooms } from 'apis';
import { useState } from 'react';
import { Room } from 'types';
import { TimelineHeader } from './TimelineHeader';
import { TimelineRoom } from './TimelineRoom';
import { useDateContext } from '../../contexts';
import { ReservationItem } from './ReservationItem';

export function ReservationTimeline() {
  const [activeReservationId, setActiveReservationId] = useState<string | null>(null);

  const { date } = useDateContext();

  const { data: rooms = [] } = useRooms();
  const { data: reservations = [] } = useReservations({ date });

  const toggleReservation = (id: string) => {
    setActiveReservationId(prev => (prev === id ? null : id));
  };

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

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}
        >
          {rooms.map((room: Room) => (
            <TimelineRoom key={room.id} name={room.name}>
              {reservations
                .filter(reservation => reservation.roomId === room.id)
                .map(reservation => (
                  <ReservationItem
                    key={reservation.id}
                    reservation={reservation}
                    name={room.name}
                    isActive={activeReservationId === reservation.id}
                    onReservationItemClick={() => toggleReservation(reservation.id)}
                  />
                ))}
            </TimelineRoom>
          ))}
        </div>
      </div>
    </div>
  );
}
