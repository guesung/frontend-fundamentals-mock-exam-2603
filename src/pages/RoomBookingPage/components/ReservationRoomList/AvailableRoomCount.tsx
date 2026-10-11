import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useReservations, useRooms } from 'apis';
import { useReservationConditions } from 'pages/RoomBookingPage/hooks';

import { filterAvailableRoomList } from './utils';

export function AvailableRoomCount() {
  const { conditions } = useReservationConditions();

  const { data: rooms = [] } = useRooms();
  const { data: reservations = [] } = useReservations({ date: conditions.date });

  const availableRoomList = filterAvailableRoomList(rooms, conditions, reservations);

  return (
    <Text typography="t7" fontWeight="medium" color={colors.grey500}>
      {availableRoomList.length}개
    </Text>
  );
}
