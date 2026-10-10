import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(callackFn: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const targetNode = event.target as Node;

      if (!ref.current?.contains(targetNode)) {
        callackFn();
      }
    }

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [callackFn]);

  return { ref };
}
