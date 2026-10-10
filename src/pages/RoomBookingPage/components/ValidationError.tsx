import { css } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservationConditions } from '../hooks';
import { getValidationError, hasTimeRange } from '../utils';

export function ValidationError() {
  const { conditions } = useReservationConditions();

  if (!hasTimeRange(conditions)) return null;
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
        {getValidationError(conditions)}
      </span>
    </div>
  );
}
