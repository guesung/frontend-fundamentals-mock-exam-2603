export const MESSAGES = {
  VALIDATION: {
    END_TIME_BEFORE_START: '종료 시간은 시작 시간보다 늦어야 합니다.',
    MIN_ATTENDEES: '참석 인원은 1명 이상이어야 합니다.',
    SELECT_ROOM: '회의실을 선택해주세요.',
    SELECT_TIME: '시작 시간과 종료 시간을 선택해주세요.',
  },
  BOOKING: {
    SUCCESS: '예약이 완료되었습니다!',
    FAILURE: '예약에 실패했습니다.',
  },
  CANCEL: {
    SUCCESS: '예약이 취소되었습니다.',
    FAILURE: '취소에 실패했습니다.',
  },
} as const;
