import { css } from '@emotion/react';
import { Select, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { TIME_SLOTS } from 'pages/ReservationStatusPage/constants';
import { useReservationConditions } from '../../hooks';

export function EndTimeSelect() {
  const { conditions, conditionsSetter } = useReservationConditions();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 1;
      `}
    >
      <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
        종료 시간
      </Text>
      <Select
        value={conditions.endTime}
        onChange={e => {
          conditionsSetter.endTime(e.target.value);
        }}
        aria-label="종료 시간"
      >
        <option value="">선택</option>
        {TIME_SLOTS.slice(1).map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>
    </div>
  );
}
