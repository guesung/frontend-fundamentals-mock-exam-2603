import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { formatDate } from 'utils/date';
import { useReservationConditions } from '../../hooks';

export function DatePicker() {
  const { conditions, conditionsSetter } = useReservationConditions();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 6px;
      `}
    >
      <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
        날짜
      </Text>
      <input
        type="date"
        value={conditions.date}
        min={formatDate(new Date())}
        onChange={e => {
          conditionsSetter.date(e.target.value);
        }}
        aria-label="날짜"
        css={css`
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.5;
          height: 48px;
          background-color: ${colors.grey50};
          border-radius: 12px;
          color: ${colors.grey800};
          width: 100%;
          border: 1px solid ${colors.grey200};
          padding: 0 16px;
          outline: none;
          transition: border-color 0.15s;
          &:focus {
            border-color: ${colors.blue500};
          }
        `}
      />
    </div>
  );
}
