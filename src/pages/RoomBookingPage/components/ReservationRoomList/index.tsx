import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useResettableState } from 'hooks';
import { useErrorMessageContext } from 'pages/RoomBookingPage/contexts';
import { Suspense } from 'react';
import { useReservationConditions } from '../../hooks/useReservationConditions';
import { AvailableRoomCount } from './AvailableRoomCount';
import { AvailableRoomList } from './AvailableRoomList';
import { ReservationBookButton } from './ReservationBookButton';

export function ReservationRoomList() {
  const { reservationFilterKey } = useReservationConditions();

  const [selectedRoomId, setSelectedRoomId] = useResettableState<string | null>(reservationFilterKey, null);

  const { setErrorMessage } = useErrorMessageContext();

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
          예약 가능 회의실
        </Text>
        <Suspense fallback={null}>
          <AvailableRoomCount />
        </Suspense>
      </div>

      <Spacing size={16} />

      <Suspense fallback={null}>
        <AvailableRoomList
          selectedRoomId={selectedRoomId}
          onRoomClick={id => {
            setErrorMessage(null);
            setSelectedRoomId(id);
          }}
        />
      </Suspense>

      <Spacing size={16} />

      <ReservationBookButton selectedRoomId={selectedRoomId} resetSelectedRoomId={() => setSelectedRoomId(null)} />
    </div>
  );
}
