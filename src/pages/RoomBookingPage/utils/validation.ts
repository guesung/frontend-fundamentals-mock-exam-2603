type GetValidationErrorParams = {
  endTime: string;
  startTime: string;
  attendees: number;
};

export function getValidationError({ endTime, startTime, attendees }: GetValidationErrorParams) {
  if (endTime <= startTime) {
    return '종료 시간은 시작 시간보다 늦어야 합니다.';
  } else if (attendees < 1) {
    return '참석 인원은 1명 이상이어야 합니다.';
  }
}
