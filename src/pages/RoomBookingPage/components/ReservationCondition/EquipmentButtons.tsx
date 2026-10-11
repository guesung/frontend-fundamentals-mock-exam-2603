import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS, EQUIPMENTS } from 'constants/equipment';
import { useReservationConditions } from '../../hooks';

export function EquipmentButtons() {
  const { conditions, conditionsSetter } = useReservationConditions();

  return (
    <div>
      <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
        필요 장비
      </Text>
      <Spacing size={8} />
      <div
        css={css`
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        `}
      >
        {EQUIPMENTS.map(eq => {
          const selected = conditions.equipment.includes(eq);
          return (
            <button
              key={eq}
              type="button"
              onClick={() => {
                const next = selected ? conditions.equipment.filter(e => e !== eq) : [...conditions.equipment, eq];
                conditionsSetter.equipment(next);
              }}
              aria-label={EQUIPMENT_LABELS[eq]}
              aria-pressed={selected}
              css={css`
                padding: 8px 16px;
                border-radius: 20px;
                border: 1px solid ${selected ? colors.blue500 : colors.grey200};
                background: ${selected ? colors.blue50 : colors.grey50};
                color: ${selected ? colors.blue600 : colors.grey700};
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s;
                &:hover {
                  border-color: ${selected ? colors.blue500 : colors.grey400};
                }
              `}
            >
              {EQUIPMENT_LABELS[eq]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
