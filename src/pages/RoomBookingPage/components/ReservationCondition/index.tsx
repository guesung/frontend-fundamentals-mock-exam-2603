import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { AttendeesInput } from './AttendeesInput';
import { DatePicker } from './DatePicker';
import { EndTimeSelect } from './EndTimeSelect';
import { PreferredFloorSelect } from './PreferredFloorSelect';
import { StartTimeSelect } from './StartTimeSelect';
import { EquipmentButtons } from './EquipmentButtons';

export function ReservationCondition() {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        예약 조건
      </Text>
      <Spacing size={16} />

      <DatePicker />
      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <StartTimeSelect />
        <EndTimeSelect />
      </div>

      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <AttendeesInput />
        <PreferredFloorSelect />
      </div>

      <Spacing size={14} />

      <EquipmentButtons />
    </div>
  );
}
