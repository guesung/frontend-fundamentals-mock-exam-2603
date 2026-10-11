import { Conditions } from '../types';

export function getValidationError(conditions: Conditions) {
  if (!hasTimeRange(conditions)) {
    return;
  }
  if (conditions.endTime <= conditions.startTime) {
    return '종료 시간은 시작 시간보다 늦어야 합니다.';
  }
  if (conditions.attendees < 1) {
    return '참석 인원은 1명 이상이어야 합니다.';
  }
}

export function hasTimeRange(conditions: Conditions) {
  return conditions.endTime !== '' && conditions.startTime !== '';
}
