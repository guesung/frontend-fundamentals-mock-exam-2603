import { Button } from '_tosslib/components';
import { useCreateReservation } from 'apis';
import axios from 'axios';
import { useReservationSearchParams } from '../../hooks';
import { useErrorMessageContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';

interface ReservationBookButtonProps {}

export function ReservationBookButton({}: ReservationBookButtonProps) {
  const { mutateAsync: createReservation, isPending } = useCreateReservation();
  const { date, attendees, endTime, equipment, startTime, preferredFloor } = useReservationSearchParams();

  const navigate = useNavigate();
  const { onErrorMessageChange } = useErrorMessageContext();

  const handleBook = async () => {
    if (!selectedRoomId) {
      onErrorMessageChange('회의실을 선택해주세요.');
      return;
    }
    if (!startTime || !endTime) {
      onErrorMessageChange('시작 시간과 종료 시간을 선택해주세요.');
      return;
    }

    try {
      const result = await createReservation({
        roomId: selectedRoomId,
        date,
        start: startTime,
        end: endTime,
        attendees,
        equipment,
      });

      if ('ok' in result && result.ok) {
        navigate('/', { state: { message: '예약이 완료되었습니다!' } });
        return;
      }

      const errResult = result as { message?: string };
      onErrorMessageChange(errResult.message ?? '예약에 실패했습니다.');
      setSelectedRoomId(null);
    } catch (err: unknown) {
      let serverMessage = '예약에 실패했습니다.';
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      onErrorMessageChange(serverMessage);
      setSelectedRoomId(null);
    }
  };

  return (
    <Button display="full" onClick={handleBook} disabled={isPending}>
      {isPending ? '예약 중...' : '확정'}
    </Button>
  );
}
