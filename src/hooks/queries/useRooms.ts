import { useQuery } from '@tanstack/react-query';
import { getRooms } from 'pages/remotes';

export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
    initialData: [],
  });
}
