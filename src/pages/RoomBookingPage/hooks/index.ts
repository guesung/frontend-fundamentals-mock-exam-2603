import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from 'utils/date';

export function useReservationSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // const [date, setDate] = useState(searchParams.get('date') || formatDate(new Date()));
  // const [startTime, setStartTime] = useState(searchParams.get('startTime') || '10:00');
  // const [endTime, setEndTime] = useState(searchParams.get('endTime') || '11:00');
  // const [attendees, setAttendees] = useState(Number(searchParams.get('attendees')) || 1);
  // const [equipment, setEquipment] = useState<string[]>(
  //   searchParams.get('equipment') ? searchParams.get('equipment')!.split(',').filter(Boolean) : []
  // );
  // const [preferredFloor, setPreferredFloor] = useState<number | null>(
  //   searchParams.get('floor') ? Number(searchParams.get('floor')) : null
  // );

  // URL 쿼리 파라미터 동기화
  // useEffect(() => {
  //   const params: Record<string, string> = {};
  //   if (date) params.date = date;
  //   if (startTime) params.startTime = startTime;
  //   if (endTime) params.endTime = endTime;
  //   if (attendees > 1) params.attendees = String(attendees);
  //   if (equipment.length > 0) params.equipment = equipment.join(',');
  //   if (preferredFloor !== null) params.floor = String(preferredFloor);

  //   setSearchParams(params, { replace: true });
  // }, [date, startTime, endTime, attendees, equipment, preferredFloor, setSearchParams]);

  /**
   * {
    "date": "2026-10-09",
    "startTime": "09:00",
    "endTime": "14:00",
    "attendees": 1,
    "equipment": [],
    "preferredFloor": null
}
   */
  /**
   * {
    "date": "2026-10-09",
    "startTime": "09:00",
    "endTime": "14:00",
    "attendees": 1,
    "equipment": [],
    "preferredFloor": null
}
   */

  const date = searchParams.get('date') || formatDate(new Date());
  const startTime = searchParams.get('startTime') || '';
  const endTime = searchParams.get('endTime') || '';
  const attendees = Number(searchParams.get('attendees')) || 1;
  const equipment = searchParams.get('equipment') ? searchParams.get('equipment')!.split(',').filter(Boolean) : [];
  const preferredFloor = searchParams.get('preferredFloor') ? Number(searchParams.get('preferredFloor')) : null;

  function setSearchParamsState(key: string, value: string | null) {
    if (value === null) return;

    const prevParams = {
      date,
      startTime,
      endTime,
      attendees: String(attendees),
      equipment: equipment.join(','),
      preferredFloor: preferredFloor !== null ? String(preferredFloor) : '',
    };

    setSearchParams(
      {
        ...prevParams,
        [key]: value,
      },
      { replace: true }
    );
  }

  return {
    date,
    setDate: (date: string) => setSearchParamsState('date', date),
    startTime,
    setStartTime: (startTime: string) => setSearchParamsState('startTime', startTime),
    endTime,
    setEndTime: (endTime: string) => setSearchParamsState('endTime', endTime),
    attendees,
    setAttendees: (attendees: number) => setSearchParamsState('attendees', String(attendees)),
    equipment,
    setEquipment: (equipment: string[]) => setSearchParamsState('equipment', equipment.join(',')),
    preferredFloor,
    setPreferredFloor: (preferredFloor: number | null) =>
      setSearchParamsState('preferredFloor', String(preferredFloor)),
  };
}
