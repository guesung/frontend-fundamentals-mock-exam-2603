import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { formatDate } from '_tosslib/utils/date';
import { MESSAGES } from '_tosslib/constants/messages';
import { useRooms } from 'hooks/queries/useRooms';
import { useReservations } from 'hooks/queries/useReservations';
import { useMyReservations } from 'hooks/queries/useMyReservations';
import { useCancelReservation } from 'hooks/mutations/useCancelReservation';
import { Room } from '_tosslib/server/types';

interface Message {
  type: 'success' | 'error';
  text: string;
}

interface ReservationContextValue {
  date: string;
  setDate: (date: string) => void;
  activeReservation: string | null;
  setActiveReservation: (id: string | null) => void;
  message: Message | null;
  rooms: ReturnType<typeof useRooms>['data'];
  reservations: ReturnType<typeof useReservations>['data'];
  myReservationList: ReturnType<typeof useMyReservations>['data'];
  handleCancel: (id: string) => Promise<void>;
  getRoomName: (roomId: string) => string;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function useReservationContext() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservationContext must be used within ReservationProvider');
  }
  return context;
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [date, setDate] = useState(() => formatDate(new Date()));
  const [activeReservation, setActiveReservation] = useState<string | null>(null);

  const locationState = location.state as { message?: string } | null;
  const [message, setMessage] = useState<Message | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, '');
    }
  }, [locationState]);

  const { data: rooms } = useRooms();
  const { data: reservations } = useReservations(date);
  const { data: myReservationList } = useMyReservations();
  const cancelMutation = useCancelReservation();

  const handleCancel = async (id: string) => {
    try {
      await cancelMutation.mutateAsync(id);
      setMessage({ type: 'success', text: MESSAGES.CANCEL.SUCCESS });
    } catch {
      setMessage({ type: 'error', text: MESSAGES.CANCEL.FAILURE });
    }
  };

  const getRoomName = (roomId: string) =>
    rooms.find((room: Room) => room.id === roomId)?.name ?? roomId;

  return (
    <ReservationContext.Provider
      value={{
        date,
        setDate,
        activeReservation,
        setActiveReservation,
        message,
        rooms,
        reservations,
        myReservationList,
        handleCancel,
        getRoomName,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
