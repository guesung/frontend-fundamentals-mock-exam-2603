import { NavigateOptions, useSearchParams } from 'react-router-dom';

type Options<T> = {
  defaultValue: T;
  parser?: (value: string | null) => T;
} & NavigateOptions;

export function useSearchParamsState<T>(
  key: string,
  { defaultValue, parser = v => v as T, ...navigateOptions }: Options<T>
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(key) ? parser(searchParams.get(key)) : defaultValue;

  const setValue = (newValue: T) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newValue === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, String(newValue));
    }

    setSearchParams(newSearchParams, { replace: true, ...navigateOptions });
  };

  return [value, setValue] as const;
}
