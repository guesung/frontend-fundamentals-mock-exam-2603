import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type LocationMessage = { message?: string } | null;

export function useLocationMessage() {
  const location = useLocation();
  const locationState = location.state as LocationMessage;

  useEffect(
    function clearLocationState() {
      const locationState = location.state as LocationMessage;
      if (locationState?.message) {
        window.history.replaceState({}, '');
      }
    },
    [location]
  );

  return { message: locationState?.message };
}
