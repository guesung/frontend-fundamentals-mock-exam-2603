import { useEffect } from 'react';

interface UseOutsideClickParams {
  callbackFn: () => void;
  selectors: string[];
}

export function useOutsideClick({ callbackFn, selectors }: UseOutsideClickParams) {
  useEffect(() => {
    function onToolTipOutsideClick(event: PointerEvent) {
      const targetElement = event.target as HTMLElement;

      if (selectors.every(selector => !targetElement.closest(selector))) {
        callbackFn();
      }
    }

    window.addEventListener('click', onToolTipOutsideClick);
    return () => window.removeEventListener('click', onToolTipOutsideClick);
  }, [callbackFn, selectors]);
}
