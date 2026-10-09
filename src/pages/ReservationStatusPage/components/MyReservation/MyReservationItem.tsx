import { css } from '@emotion/react';
import { Button, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useCancelReservation } from 'apis';
import { EQUIPMENT_LABELS } from 'constants/equipment';
import { MouseEventHandler } from 'react';
import { Reservation, Room } from 'types';
import { useMessageContext } from '../../contexts';

interface MyReservationItemProps {
  reservation: Reservation;
  room?: Room;
}

export function MyReservationItem({ reservation, room }: MyReservationItemProps) {
  const { onMessageChange } = useMessageContext();
  const { mutate } = useCancelReservation();

  const handleCancel: MouseEventHandler<HTMLElement> = event => {
    event.stopPropagation();

    if (!window.confirm('정말 취소하시겠습니까?')) return;

    mutate(reservation.id, {
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
            top={room?.name ?? room?.id ?? ''}
            topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
            bottom={`${reservation.date} ${reservation.start}~${reservation.end} · ${reservation.attendees}명 · ${
              reservation.equipment.map((e: string) => EQUIPMENT_LABELS[e]).join(', ') || '장비 없음'
            }`}
            bottomProps={{ typography: 't7', color: colors.grey600 }}
          />
        }
        right={
          <Button type="danger" style="weak" size="small" onClick={handleCancel}>
            취소
          </Button>
        }
      />
    </div>
  );
}
