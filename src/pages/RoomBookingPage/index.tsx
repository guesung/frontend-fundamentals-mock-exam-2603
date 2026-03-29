import { css } from '@emotion/react';
import { Spacing, Border } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { RoomBookingHeader } from './components/RoomBookingHeader';
import { BookingPageTitle } from './components/BookingPageTitle';
import { BookingConditionForm } from './components/BookingConditionForm';
import { AvailableRoomList } from './components/AvailableRoomList';

export function RoomBookingPage() {
  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <RoomBookingHeader />
      <BookingPageTitle />

      <Spacing size={24} />

      <BookingConditionForm />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <AvailableRoomList />

      <Spacing size={24} />
    </div>
  );
}
