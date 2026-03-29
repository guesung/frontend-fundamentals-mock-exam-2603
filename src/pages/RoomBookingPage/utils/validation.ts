import { MESSAGES } from '_tosslib/constants/messages';

export function getValidationError(startTime: string, endTime: string, attendees: number): string | null {
  const hasTimeInputs = startTime !== '' && endTime !== '';
  if (!hasTimeInputs) return null;

  if (endTime <= startTime) return MESSAGES.VALIDATION.END_TIME_BEFORE_START;
  if (attendees < 1) return MESSAGES.VALIDATION.MIN_ATTENDEES;
  return null;
}

export function isFilterComplete(startTime: string, endTime: string, attendees: number): boolean {
  return startTime !== '' && endTime !== '' && !getValidationError(startTime, endTime, attendees);
}
