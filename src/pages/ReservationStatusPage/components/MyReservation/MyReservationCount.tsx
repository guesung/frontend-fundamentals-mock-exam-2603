import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useMyReservationList } from 'apis';

export function MyReservationCount() {
  const { data: myReservationList } = useMyReservationList();

  if (myReservationList.length === 0) {
    return null;
  }

  return (
    <Text typography="t7" fontWeight="medium" color={colors.grey500}>
      {myReservationList.length}건
    </Text>
  );
}
