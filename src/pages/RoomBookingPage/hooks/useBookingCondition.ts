import { useState } from 'react';
import { MESSAGES } from '_tosslib/constants/messages';
import { useBookingSearchParams } from './useBookingSearchParams';

function getValidationError(startTime: string, endTime: string, attendees: number): string | null {
  const hasTimeInputs = startTime !== '' && endTime !== '';
  if (!hasTimeInputs) return null;

  if (endTime <= startTime) return MESSAGES.VALIDATION.END_TIME_BEFORE_START;
  if (attendees < 1) return MESSAGES.VALIDATION.MIN_ATTENDEES;
  return null;
}

export function useBookingCondition(onFilterChange?: () => void) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    attendees,
    setAttendees,
    equipment,
    setEquipment,
    preferredFloor,
    setPreferredFloor,
  } = useBookingSearchParams();

  const withFilterReset =
    <T>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setSelectedRoomId(null);
      onFilterChange?.();
    };

  const validationError = getValidationError(startTime, endTime, attendees);
  const isFilterComplete = startTime !== '' && endTime !== '' && !validationError;

  return {
    condition: { date, startTime, endTime, attendees, equipment, preferredFloor },
    onChange: {
      date: withFilterReset(setDate),
      startTime: withFilterReset(setStartTime),
      endTime: withFilterReset(setEndTime),
      attendees: withFilterReset(setAttendees),
      equipment: withFilterReset(setEquipment),
      preferredFloor: withFilterReset(setPreferredFloor),
    },
    selectedRoomId,
    setSelectedRoomId,
    validationError,
    isFilterComplete,
  };
}
