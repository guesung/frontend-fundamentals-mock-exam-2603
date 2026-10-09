import { css } from '@emotion/react';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ReservationHeader } from 'components/ReservationHeader';
import { useSearchParams } from 'react-router-dom';
import { ReservationCondition, ReservationNavigation, ReservationRoomList, ValidationError } from './components';
import { ReservationError } from './components/ReservationError';
import { ErrorMessageContextProvider } from './contexts/ErrorMessageContextProvider';

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
