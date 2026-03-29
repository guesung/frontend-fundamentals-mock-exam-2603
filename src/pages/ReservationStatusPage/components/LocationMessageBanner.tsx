import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StatusBanner } from 'components/StatusBanner';

export function LocationMessageBanner() {
  const location = useLocation();
  const locationState = location.state as { message?: string } | null;
  const message = locationState?.message ?? null;

  useEffect(() => {
    if (message) {
      window.history.replaceState({}, '');
    }
  }, [message]);

  if (!message) return null;

  return <StatusBanner type="success" message={message} />;
}
