import { useState } from 'react';

export function useResettableState<T>(resetKey: string, initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [prevResetKey, setPrevResetKey] = useState(resetKey);

  if (prevResetKey !== resetKey) {
    setPrevResetKey(resetKey);
    setValue(initialValue);
  }

  return [value, setValue] as const;
}
