import { css } from '@emotion/react';
import { useReservations, useRooms } from 'apis';
import { useReservationDate } from 'hooks/useReservationDate';
import { useEffect, useState } from 'react';
import { Room } from 'types';
import { ReservationItem } from './ReservationItem';
import { TimelineRoom } from './TimelineRoom';
import { colors } from '_tosslib/constants/colors';

export function ReservationRoomList() {
  const [activeReservationId, setActiveReservationId] = useState<string | null>(null);

  const { date } = useReservationDate();

  const { data: rooms } = useRooms();
  const { data: reservations = [] } = useReservations({ date });

  const toggleReservation = (id: string) => {
    setActiveReservationId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    function onToolTipOutsideClick(event: PointerEvent) {
      const targetElement = event.target as HTMLElement;

      if (!targetElement.dataset.reservationId) {
        setActiveReservationId(null);
      }
    }

    window.addEventListener('click', onToolTipOutsideClick);
    return () => window.removeEventListener('click', onToolTipOutsideClick);
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 4px;
      `}
    >
      {rooms?.map((room: Room) => (
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
                onReservationItemCancel={() => setActiveReservationId(null)}
              />
            ))}
        </TimelineRoom>
      ))}
    </div>
  );
}

function Loading() {
  return (
    <div
      css={css`
        width: 100%;
        height: 256px; // 32px * 8
        padding: 0 24px;
        box-sizing: border-box;
        background: ${colors.grey50};
      `}
    ></div>
  );
}

ReservationRoomList.Loading = Loading;
