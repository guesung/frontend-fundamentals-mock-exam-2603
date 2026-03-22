import { useQuery } from '@tanstack/react-query';
import { getRooms } from 'pages/remotes';
import { QUERY_KEYS } from 'constants/queryKeys';

export function useRooms() {
  return useQuery({
    queryKey: QUERY_KEYS.rooms(),
    queryFn: getRooms,
    initialData: [],
  });
}
