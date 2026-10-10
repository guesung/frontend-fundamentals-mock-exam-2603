import { Button } from '_tosslib/components';
import { useCreateReservation } from 'apis';
import axios from 'axios';
import { useReservationSearchParams } from '../../hooks';
import { useErrorMessageContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { HttpError } from 'modules';

interface ReservationBookButtonProps {
  selectedRoomId: string | null;
  resetSelectedRoomId: () => void;
}

export function ReservationBookButton({ selectedRoomId, resetSelectedRoomId }: ReservationBookButtonProps) {
  const { mutate: createReservation, isPending } = useCreateReservation();
  const { conditions } = useReservationSearchParams();

  const navigate = useNavigate();
  const { setErrorMessage } = useErrorMessageContext();

  const handleBook = async () => {
    if (!selectedRoomId) {
      setErrorMessage('회의실을 선택해주세요.');
      return;
    }
    if (!conditions.startTime || !conditions.endTime) {
      setErrorMessage('시작 시간과 종료 시간을 선택해주세요.');
      return;
    }

    createReservation(
      {
        roomId: selectedRoomId,
        date: conditions.date,
        start: conditions.startTime,
        end: conditions.endTime,
        attendees: conditions.attendees,
        equipment: conditions.equipment,
      },
      {
        onSuccess: () => {
          navigate('/', { state: { message: '예약이 완료되었습니다!' } });
        },
        onError: error => {
          const message = error instanceof HttpError ? error.serverMessage : undefined;
          setErrorMessage(message ?? '예약에 실패했습니다.');
          resetSelectedRoomId();
        },
      }
    );
  };

  return (
    <Button display="full" onClick={handleBook} disabled={isPending}>
      {isPending ? '예약 중...' : '확정'}
    </Button>
  );
}
