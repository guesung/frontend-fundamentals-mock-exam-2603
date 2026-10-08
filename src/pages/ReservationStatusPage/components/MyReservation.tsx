import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { Button, ListRow, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useCancelReservation } from 'apis';
import { getMyReservations, getRooms } from 'apis/api';
import { EQUIPMENT_LABELS } from 'constants/equipment';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Reservation, Room } from 'types';
import { Message } from './MessageBanner';
import { MessageContext } from '../contexts';

export function MyReservation() {
  const { data: myReservationList = [] } = useQuery(['myReservations'], getMyReservations);
  const { onMessageChange } = useContext(MessageContext);

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
            <MyReservationItem key={reservation.id} reservation={reservation} onMessageChange={onMessageChange} />
          ))}
        </div>
      ) : (
        <MyReservationEmpty />
      )}
    </div>
  );
}

interface MyReservationItemProps {
  reservation: Reservation;
  onMessageChange: (message: Message | null) => void;
}

function MyReservationItem({ reservation, onMessageChange }: MyReservationItemProps) {
  const { data: rooms = [] } = useQuery(['rooms'], getRooms);
  const { mutate } = useCancelReservation();

  const getRoomName = (roomId: string) => rooms.find((r: Room) => r.id === roomId)?.name ?? roomId;

  const handleCancel = async (id: string) => {
    if (!window.confirm('정말 취소하시겠습니까?')) return;

    mutate(id, {
      onSuccess: () => {
        onMessageChange({ type: 'success', text: '예약이 취소되었습니다.' });
      },
      onError: () => {
        onMessageChange({ type: 'error', text: '취소에 실패했습니다.' });
      },
    });
  };

  return (
    <div
      key={reservation.id}
      css={css`
        padding: 14px 16px;
        border-radius: 14px;
        background: ${colors.grey50};
        border: 1px solid ${colors.grey200};
      `}
    >
      <ListRow
        contents={
          <ListRow.Text2Rows
            top={getRoomName(reservation.roomId)}
            topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
            bottom={`${reservation.date} ${reservation.start}~${reservation.end} · ${reservation.attendees}명 · ${
              reservation.equipment.map((e: string) => EQUIPMENT_LABELS[e]).join(', ') || '장비 없음'
            }`}
            bottomProps={{ typography: 't7', color: colors.grey600 }}
          />
        }
        right={
          <Button
            type="danger"
            style="weak"
            size="small"
            onClick={e => {
              e.stopPropagation();
              handleCancel(reservation.id);
            }}
          >
            취소
          </Button>
        }
      />
    </div>
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
