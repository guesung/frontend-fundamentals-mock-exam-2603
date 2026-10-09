import { css } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservationSearchParams } from '../hooks';
import { getValidationError } from '../utils';

export function ValidationError() {
  const { field } = useReservationSearchParams();
  const validationError = getValidationError(field);

  if (field.endTime === '' || field.startTime === '') return null;
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
