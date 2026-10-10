import { useSearchParams } from 'react-router-dom';

type Options<T> = {
  defaultValue: T;
  parser?: (value: string | null) => T;
};

export function useSearchParamsState<T>(key: string, { defaultValue, parser = v => v as T }: Options<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = parser(searchParams.get(key)) || defaultValue;

  const setValue = (newValue: T) => {
    if (key === 'equipment') console.log(newValue);

    const newSearchParams = new URLSearchParams(searchParams);

    if (newValue === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, String(newValue));
    }

    setSearchParams(newSearchParams);
  };

  return [value, setValue] as const;
}
