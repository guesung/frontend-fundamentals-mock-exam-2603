import { css } from '@emotion/react';
import { ListRow, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservations, useRooms } from 'apis';
import { EQUIPMENT_LABELS } from 'constants/equipment';
import { useReservationConditions } from 'pages/RoomBookingPage/hooks';

import { Room } from 'types';
import { filterAvailableRoomList, sortRoomList } from './utils';
import { hasTimeRange } from 'pages/RoomBookingPage/utils';

interface AvailableRoomListProps {
  selectedRoomId: string | null;
  onRoomClick: (id: string) => void;
}

export function AvailableRoomList({ selectedRoomId, onRoomClick }: AvailableRoomListProps) {
  const { conditions } = useReservationConditions();

  const { data: rooms } = useRooms();
  const { data: reservations = [] } = useReservations({ date: conditions.date });

  const availableRoomList = filterAvailableRoomList(rooms, conditions, reservations);
  const sortedAvailableRoomList = sortRoomList(availableRoomList);

  if (!hasTimeRange(conditions)) {
    return null;
  }
  return (
    <>
      {sortedAvailableRoomList.length > 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {sortedAvailableRoomList.map(room => (
            <AvailableRoomItem
              key={room.id}
              room={room}
              onRoomClick={onRoomClick}
              isSelected={selectedRoomId === room.id}
            />
          ))}
        </div>
      ) : (
        <NoAvailbleRoom />
      )}
    </>
  );
}

interface AvailableRoomItemProps {
  room: Room;
  onRoomClick: (id: string) => void;
  isSelected: boolean;
}

export function AvailableRoomItem({ room, onRoomClick, isSelected }: AvailableRoomItemProps) {
  return (
    <div
      key={room.id}
      onClick={() => onRoomClick(room.id)}
      role="button"
      aria-pressed={isSelected}
      aria-label={room.name}
      css={css`
        cursor: pointer;
        padding: 14px 16px;
        border-radius: 14px;
        border: 2px solid ${isSelected ? colors.blue500 : colors.grey200};
        background: ${isSelected ? colors.blue50 : colors.white};
        transition: all 0.15s;
        &:hover {
          border-color: ${isSelected ? colors.blue500 : colors.grey300};
        }
      `}
    >
      <ListRow
        contents={
          <ListRow.Text2Rows
            top={room.name}
            topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
            bottom={`${room.floor}층 · ${room.capacity}명 · ${room.equipment
              .map((e: string) => EQUIPMENT_LABELS[e])
              .join(', ')}`}
            bottomProps={{ typography: 't7', color: colors.grey600 }}
          />
        }
        right={
          isSelected && (
            <Text typography="t7" fontWeight="bold" color={colors.blue500}>
              선택됨
            </Text>
          )
        }
      />
    </div>
  );
}

export function NoAvailbleRoom() {
  return (
    <div
      css={css`
        padding: 40px 0;
        text-align: center;
        background: ${colors.grey50};
        border-radius: 14px;
      `}
    >
      <Text typography="t6" color={colors.grey500}>
        조건에 맞는 회의실이 없습니다.
      </Text>
    </div>
  );
}
