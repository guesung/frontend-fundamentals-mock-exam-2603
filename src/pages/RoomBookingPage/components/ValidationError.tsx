import { css } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservationSearchParams } from '../hooks';

export function ValidationError() {
  const { attendees, endTime, startTime } = useReservationSearchParams();

  let validationError: string | null = null;
  const hasTimeInputs = startTime !== '' && endTime !== '';
  if (hasTimeInputs) {
    if (endTime <= startTime) {
      validationError = '종료 시간은 시작 시간보다 늦어야 합니다.';
    } else if (attendees < 1) {
      validationError = '참석 인원은 1명 이상이어야 합니다.';
    }
  }

  if (!validationError) return null;
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <Spacing size={8} />
      <span
        css={css`
          color: ${colors.red500};
          font-size: 14px;
        `}
        role="alert"
      >
        {validationError}
      </span>
    </div>
  );
}
