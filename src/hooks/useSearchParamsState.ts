import { useSearchParams } from 'react-router-dom';

type Options = {
  defaultValue?: string;
};

export function useSearchParamsState(
  key: string,
  { defaultValue = '' }: Options = {}
): [string, (newValue: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(key) ?? defaultValue;
  const setValue = (newValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, String(newValue));

    setSearchParams(newSearchParams);
  };

  return [value, setValue];
}
