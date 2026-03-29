import { css } from '@emotion/react';
import { useState } from 'react';
import { Text, Spacing, Button, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from '_tosslib/constants/equipment';
import { MESSAGES } from '_tosslib/constants/messages';
import { Room } from '_tosslib/server/types';
import { useRooms } from 'hooks/queries/useRooms';
import { useMyReservations } from 'hooks/queries/useMyReservations';
import { useCancelReservation } from 'hooks/mutations/useCancelReservation';
import { StatusBanner } from 'components/StatusBanner';

interface Message {
  type: 'success' | 'error';
  text: string;
}

export function MyReservationList() {
  const { data: reservations } = useMyReservations();
  const { data: rooms } = useRooms();
  const cancelMutation = useCancelReservation();
  const [message, setMessage] = useState<Message | null>(null);

  const getRoomName = (roomId: string) =>
    rooms.find((room: Room) => room.id === roomId)?.name ?? roomId;

  const handleCancel = async (id: string) => {
    try {
      await cancelMutation.mutateAsync(id);
      setMessage({ type: 'success', text: MESSAGES.CANCEL.SUCCESS });
    } catch {
      setMessage({ type: 'error', text: MESSAGES.CANCEL.FAILURE });
    }
  };

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
        {reservations.length > 0 && (
          <Text typography="t7" fontWeight="medium" color={colors.grey500}>
            {reservations.length}건
          </Text>
        )}
      </div>
      <Spacing size={16} />

      {message && <StatusBanner type={message.type} message={message.text} />}
      {message && <Spacing size={16} />}

      {reservations.length === 0 ? (
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
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {reservations.map(reservation => (
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
                    bottom={`${reservation.date} ${reservation.start}~${reservation.end} · ${
                      reservation.attendees
                    }명 · ${reservation.equipment.map(e => EQUIPMENT_LABELS[e]).join(', ') || '장비 없음'}`}
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
                      if (window.confirm('정말 취소하시겠습니까?')) {
                        handleCancel(reservation.id);
                      }
                    }}
                  >
                    취소
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
