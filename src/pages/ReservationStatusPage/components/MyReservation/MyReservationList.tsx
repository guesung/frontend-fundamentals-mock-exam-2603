import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useMyReservationList, useRooms } from 'apis/queries';
import { Reservation, Room } from 'types';
import { MyReservationItem } from './MyReservationItem';

export function MyReservationList() {
  const { data: rooms } = useRooms();
  const { data: myReservationList } = useMyReservationList();

  return (
    <>
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
    </>
  );
}

function MyReservationEmpty() {
  return (
    <div
      css={css`
        padding: 40px 0;
        text-align: center;
        background: ${colors.grey50};
        border-radius: 14px;
      `}
    >
      <Text typography="t6" color={colors.grey500}>
        예약 내역이 없습니다.
      </Text>
    </div>
  );
}

function MyReservationLoading() {
  return (
    <div
      css={css`
        width: 1px;
        height: 200px;
        background: ${colors.grey50};
      `}
    ></div>
  );
}

MyReservationList.Loading = MyReservationLoading;
