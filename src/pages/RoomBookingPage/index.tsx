import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Top, Spacing, Border } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import axios from 'axios';
import { useRooms } from 'hooks/queries/useRooms';
import { useReservations } from 'hooks/queries/useReservations';
import { useCreateReservation } from 'hooks/mutations/useCreateReservation';
import { formatDate } from '_tosslib/utils/date';
import { useAvailableRooms } from 'hooks/useAvailableRooms';
import { ErrorBanner } from './components/ErrorBanner';
import { BookingConditionForm } from './components/BookingConditionForm';
import { ValidationError } from './components/ValidationError';
import { AvailableRoomList } from './components/AvailableRoomList';
import { Equipment } from '_tosslib/server/types';

export function RoomBookingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [date, setDate] = useState(searchParams.get('date') || formatDate(new Date()));
  const [startTime, setStartTime] = useState(searchParams.get('startTime') || '');
  const [endTime, setEndTime] = useState(searchParams.get('endTime') || '');
  const [attendees, setAttendees] = useState(Number(searchParams.get('attendees')) || 1);
  const [equipment, setEquipment] = useState<Equipment[]>(
    searchParams.get('equipment') ? (searchParams.get('equipment')!.split(',').filter(Boolean) as Equipment[]) : []
  );
  const [preferredFloor, setPreferredFloor] = useState<number | null>(
    searchParams.get('floor') ? Number(searchParams.get('floor')) : null
  );
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // URL 쿼리 파라미터 동기화
  useEffect(() => {
    const params: Record<string, string> = {};
    if (date) params.date = date;
    if (startTime) params.startTime = startTime;
    if (endTime) params.endTime = endTime;
    if (attendees > 1) params.attendees = String(attendees);
    if (equipment.length > 0) params.equipment = equipment.join(',');
    if (preferredFloor !== null) params.floor = String(preferredFloor);
    setSearchParams(params, { replace: true });
  }, [date, startTime, endTime, attendees, equipment, preferredFloor, setSearchParams]);

  const { data: rooms } = useRooms();
  const { data: reservations } = useReservations(date);
  const createMutation = useCreateReservation();

  // 필터 변경 시 선택 초기화
  const handleFilterChange = () => {
    setSelectedRoomId(null);
    setErrorMessage(null);
  };

  // 입력 검증
  let validationError: string | null = null;
  const hasTimeInputs = startTime !== '' && endTime !== '';
  if (hasTimeInputs) {
    if (endTime <= startTime) {
      validationError = '종료 시간은 시작 시간보다 늦어야 합니다.';
    } else if (attendees < 1) {
      validationError = '참석 인원은 1명 이상이어야 합니다.';
    }
  }
  const isFilterComplete = hasTimeInputs && !validationError;

  // 필터링
  const { availableRooms, floors } = useAvailableRooms({
    rooms,
    reservations,
    date,
    startTime,
    endTime,
    attendees,
    equipment,
    preferredFloor,
    isFilterComplete,
  });

  const handleBook = async () => {
    if (!selectedRoomId) {
      setErrorMessage('회의실을 선택해주세요.');
      return;
    }
    if (!startTime || !endTime) {
      setErrorMessage('시작 시간과 종료 시간을 선택해주세요.');
      return;
    }

    try {
      const result = await createMutation.mutateAsync({
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
      setErrorMessage(errResult.message ?? '예약에 실패했습니다.');
      setSelectedRoomId(null);
    } catch (err: unknown) {
      let serverMessage = '예약에 실패했습니다.';
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }
      setErrorMessage(serverMessage);
      setSelectedRoomId(null);
    }
  };

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <div
        css={css`
          padding: 12px 24px 0;
        `}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="뒤로가기"
          css={css`
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            font-size: 14px;
            color: ${colors.grey600};
            &:hover {
              color: ${colors.grey900};
            }
          `}
        >
          ← 예약 현황으로
        </button>
      </div>
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        예약하기
      </Top.Top03>

      {errorMessage && <ErrorBanner message={errorMessage} />}

      <Spacing size={24} />

      <BookingConditionForm
        date={date}
        startTime={startTime}
        endTime={endTime}
        attendees={attendees}
        equipment={equipment}
        preferredFloor={preferredFloor}
        floors={floors}
        onDateChange={v => {
          setDate(v);
          handleFilterChange();
        }}
        onStartTimeChange={v => {
          setStartTime(v);
          handleFilterChange();
        }}
        onEndTimeChange={v => {
          setEndTime(v);
          handleFilterChange();
        }}
        onAttendeesChange={v => {
          setAttendees(v);
          handleFilterChange();
        }}
        onEquipmentChange={v => {
          setEquipment(v);
          handleFilterChange();
        }}
        onPreferredFloorChange={v => {
          setPreferredFloor(v);
          handleFilterChange();
        }}
      />

      {validationError && <ValidationError message={validationError} />}

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {isFilterComplete && (
        <AvailableRoomList
          rooms={availableRooms}
          selectedRoomId={selectedRoomId}
          onRoomSelect={setSelectedRoomId}
          onBook={handleBook}
          isBooking={createMutation.isLoading}
        />
      )}

      <Spacing size={24} />
    </div>
  );
}
