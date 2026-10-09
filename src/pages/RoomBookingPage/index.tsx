import { css } from '@emotion/react';
import { colors } from '_tosslib/constants/colors';
import { useSearchParams } from 'react-router-dom';
import { ReservationCondition } from './components';

export function RoomBookingPage() {
  const [searchParams] = useSearchParams();
  const filterKey = searchParams.toString();

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <ReservationCondition />
    </div>
  );
}
