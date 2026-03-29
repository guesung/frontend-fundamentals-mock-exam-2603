import { css } from '@emotion/react';
import { Text, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { inputStyle } from '_tosslib/styles/input';
import { formatDate } from '_tosslib/utils/date';
import { useReservationContext } from '../context/ReservationContext';

export function DateSelector() {
  const { date, setDate } = useReservationContext();

  return (
    <div css={css`padding: 0 24px;`}>
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        날짜 선택
      </Text>
      <Spacing size={16} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        <input
          type="date"
          value={date}
          min={formatDate(new Date())}
          onChange={e => setDate(e.target.value)}
          aria-label="날짜"
          css={inputStyle}
        />
      </div>
    </div>
  );
}
