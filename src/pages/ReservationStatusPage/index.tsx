import { Spacing, Border } from '_tosslib/components';
import { ReservationHeader } from './components/ReservationHeader';
import { DateSelector } from './components/DateSelector';
import { ReservationTimeline } from './components/ReservationTimeline';
import { LocationMessageBanner } from './components/LocationMessageBanner';
import { MyReservationList } from './components/MyReservationList';
import { BookingButton } from './components/BookingButton';
import { DateProvider } from './context/ReservationContext';

export function ReservationStatusPage() {
  return (
    <DateProvider>
      <main>
        <ReservationHeader />

        <Spacing size={24} />

        <DateSelector />

        <Spacing size={24} />
        <Border size={8} />
        <Spacing size={24} />

        <ReservationTimeline />

        <Spacing size={24} />
        <Border size={8} />
        <Spacing size={24} />

        <LocationMessageBanner />

        <MyReservationList />

        <Spacing size={24} />
        <Border size={8} />
        <Spacing size={24} />

        <BookingButton />
        <Spacing size={24} />
      </main>
    </DateProvider>
  );
}
