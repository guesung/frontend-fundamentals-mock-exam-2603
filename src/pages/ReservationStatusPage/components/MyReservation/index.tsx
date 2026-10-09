import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useMyReservationList, useRooms } from 'apis/queries';
import { Reservation, Room } from 'types';
import { MyReservationItem } from './MyReservationItem';
import { MyReservationEmpty } from './MyReservationEmpty';

export function MyReservation() {
  const { data: myReservationList = [] } = useMyReservationList();
  const { data: rooms = [] } = useRooms();

  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: baseline;
          gap: 6px;
        `}
      >
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          내 예약
        </Text>
        {myReservationList.length > 0 && (
          <Text typography="t7" fontWeight="medium" color={colors.grey500}>
            {myReservationList.length}건
          </Text>
        )}
      </div>
      <Spacing size={16} />

      {myReservationList.length > 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {myReservationList.map((reservation: Reservation) => (
            <MyReservationItem
              key={reservation.id}
              reservation={reservation}
              room={rooms.find((room: Room) => room.id === reservation.roomId)}
            />
          ))}
        </div>
      ) : (
        <MyReservationEmpty />
      )}
    </div>
  );
}
