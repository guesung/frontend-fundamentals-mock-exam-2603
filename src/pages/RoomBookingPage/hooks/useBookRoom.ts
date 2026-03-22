import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MESSAGES } from '_tosslib/constants/messages';
import { Equipment } from '_tosslib/server/types';
import axios from 'axios';
import { useCreateReservation } from 'hooks/mutations/useCreateReservation';

interface BookingParams {
  roomId: string | null;
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  equipment: Equipment[];
}

export function useBookRoom() {
  const navigate = useNavigate();
  const createMutation = useCreateReservation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const book = async ({ roomId, date, startTime, endTime, attendees, equipment }: BookingParams) => {
    if (!roomId) {
      setErrorMessage(MESSAGES.VALIDATION.SELECT_ROOM);
      return false;
    }
    if (!startTime || !endTime) {
      setErrorMessage(MESSAGES.VALIDATION.SELECT_TIME);
      return false;
    }

    try {
      const result = await createMutation.mutateAsync({
        roomId,
        date,
        start: startTime,
        end: endTime,
        attendees,
        equipment,
      });

      if ('ok' in result && result.ok) {
        navigate('/', { state: { message: MESSAGES.BOOKING.SUCCESS } });
        return true;
      }

      setErrorMessage(result.message ?? MESSAGES.BOOKING.FAILURE);
    } catch (error) {
      let serverMessage: string = MESSAGES.BOOKING.FAILURE;
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      setErrorMessage(serverMessage);
    }

    return true;
  };

  return {
    book,
    errorMessage,
    clearError: () => setErrorMessage(null),
    isBooking: createMutation.isPending,
  };
}
