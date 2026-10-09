import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'constants/equipment';
import { useState } from 'react';
import { Reservation, Room } from 'types';
import { TOTAL_MINUTES } from '../../constants';
import { timeToMinutes } from '../../utils';

interface TimelineRoomProps {
  roomReservations: Reservation[];
  room: Room;
}

export function TimelineRoom({ roomReservations, room }: TimelineRoomProps) {
  return (
    <div
      key={room.id}
      css={css`
        display: flex;
        align-items: center;
        height: 32px;
      `}
    >
      <RoomName>{room.name}</RoomName>
      <div
        css={css`
          flex: 1;
          height: 24px;
          background: ${colors.white};
          border-radius: 6px;
          position: relative;
          overflow: visible;
        `}
      >
        {roomReservations.map((reservation: Reservation) => (
          <ReservationItem reservation={reservation} room={room} />
        ))}
      </div>
    </div>
  );
}

interface RoomNameProps {
  children: string;
}

export function RoomName({ children }: RoomNameProps) {
  return (
    <div
      css={css`
        width: 80px;
        flex-shrink: 0;
        padding-right: 8px;
      `}
    >
      <Text
        typography="t7"
        fontWeight="medium"
        color={colors.grey700}
        ellipsisAfterLines={1}
        css={css`
          font-size: 12px;
        `}
      >
        {children}
      </Text>
    </div>
  );
}

interface ReservationItemProps {
  reservation: Reservation;
  room: Room;
}

export function ReservationItem({ reservation, room }: ReservationItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      key={reservation.id}
      css={css`
        position: absolute;
        left: ${(timeToMinutes(reservation.start) / TOTAL_MINUTES) * 100}%;
        width: ${((timeToMinutes(reservation.end) - timeToMinutes(reservation.start)) / TOTAL_MINUTES) * 100}%;
        height: 100%;
      `}
    >
      <div
        role="button"
        aria-label={`${room.name} ${reservation.start}-${reservation.end} 예약 상세`}
        onClick={() => setIsActive(prev => !prev)}
        css={css`
          width: 100%;
          height: 100%;
          background: ${colors.blue400};
          border-radius: 4px;
          opacity: ${isActive ? 1 : 0.75};
          cursor: pointer;
          transition: opacity 0.15s;
          &:hover {
            opacity: 1;
          }
        `}
      />
      {isActive && (
        <div
          role="tooltip"
          css={css`
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 6px;
            background: ${colors.grey900};
            color: ${colors.white};
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            line-height: 1.6;
          `}
        >
          <div>
            {reservation.start} ~ {reservation.end}
          </div>
          <div>{reservation.attendees}명</div>
          {reservation.equipment.length > 0 && (
            <div>{reservation.equipment.map((e: string) => EQUIPMENT_LABELS[e]).join(', ')}</div>
          )}
        </div>
      )}
    </div>
  );
}
