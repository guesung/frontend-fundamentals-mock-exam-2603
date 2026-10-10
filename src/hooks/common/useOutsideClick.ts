import { useEffect, useRef } from 'react';

interface UseOutsideClickOptions {
  ignoreId: string;
}

export function useOutsideClick<T extends HTMLElement>(callackFn: () => void, { ignoreId }: UseOutsideClickOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const targetNode = event.target as HTMLElement;

      if (targetNode.id === ignoreId) {
        return;
      }

      if (!ref.current?.contains(targetNode)) {
        callackFn();
      }
    }

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [callackFn, ignoreId]);

  return { ref };
}
