import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { Dispatch, SetStateAction } from 'react';

interface ReservationDateSelectorProps {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

export function ReservationDateSelector({ date, setDate }: ReservationDateSelectorProps) {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        날짜 선택
      </Text>

      <Spacing size={16} />

      <input
        type="date"
        value={date}
        min={formatDate(new Date())}
        onChange={e => setDate(e.target.value)}
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

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
