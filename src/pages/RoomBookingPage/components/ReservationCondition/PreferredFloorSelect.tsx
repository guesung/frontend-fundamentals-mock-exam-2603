import { css } from '@emotion/react';
import { Select, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useRooms } from 'apis';
import { Room } from 'types';
import { useReservationConditions } from '../../hooks';
import { Suspense } from 'react';

export function PreferredFloorSelect() {
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
        선호 층
      </Text>
      <Select
        value={conditions.preferredFloor ?? 'all'}
        onChange={e => {
          const val = e.target.value;
          conditionsSetter.preferredFloor(val === 'all' ? null : Number(val));
        }}
        aria-label="선호 층"
      >
        <option value="all">전체</option>

        <Suspense fallback={null}>
          <PreferredFloorOptions />
        </Suspense>
      </Select>
    </div>
  );
}

function PreferredFloorOptions() {
  const { data: rooms = [] } = useRooms();

  function getFloors(rooms: Room[]) {
    return [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b);
  }

  return (
    <>
      {getFloors(rooms).map(floor => (
        <option key={floor} value={floor}>
          {floor}층
        </option>
      ))}
    </>
  );
}
