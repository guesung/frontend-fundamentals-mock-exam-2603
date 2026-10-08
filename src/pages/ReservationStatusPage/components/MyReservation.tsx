import { css } from '@emotion/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, ListRow, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'constants/equipment';
import { cancelReservation, getMyReservations, getRooms } from 'apis/api';
import { Dispatch, SetStateAction } from 'react';
import { Message } from './MessageBanner';

interface MyReservationProps {
  setMessage: Dispatch<SetStateAction<Message | null>>;
}

export function MyReservation({ setMessage }: MyReservationProps) {
  const { data: myReservationList = [] } = useQuery(['myReservations'], getMyReservations);
  const queryClient = useQueryClient();
  const { data: rooms = [] } = useQuery(['rooms'], getRooms);

  const getRoomName = (roomId: string) =>
    rooms.find((r: { id: string; name: string }) => r.id === roomId)?.name ?? roomId;

  const cancelMutation = useMutation((id: string) => cancelReservation(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
      queryClient.invalidateQueries(['myReservations']);
    },
  });

  const handleCancel = async (id: string) => {
    try {
      await cancelMutation.mutateAsync(id);
      setMessage({ type: 'success', text: '예약이 취소되었습니다.' });
    } catch {
      setMessage({ type: 'error', text: '취소에 실패했습니다.' });
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
        {myReservationList.length > 0 && (
          <Text typography="t7" fontWeight="medium" color={colors.grey500}>
            {myReservationList.length}건
          </Text>
        )}
      </div>
      <Spacing size={16} />

      {myReservationList.length === 0 ? (
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
          {myReservationList.map(
            (res: {
              id: string;
              roomId: string;
              date: string;
              start: string;
              end: string;
              attendees: number;
              equipment: string[];
            }) => (
              <div
                key={res.id}
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
                      top={getRoomName(res.roomId)}
                      topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
                      bottom={`${res.date} ${res.start}~${res.end} · ${res.attendees}명 · ${
                        res.equipment.map((e: string) => EQUIPMENT_LABELS[e]).join(', ') || '장비 없음'
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
                        if (window.confirm('정말 취소하시겠습니까?')) {
                          handleCancel(res.id);
                        }
                      }}
                    >
                      취소
                    </Button>
                  }
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
