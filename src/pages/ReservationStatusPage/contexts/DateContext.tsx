import { createContext, PropsWithChildren, useState } from 'react';
import { formatDate } from 'utils/date';

interface DateContextProviderProps {}

type DateContextType = {
  date: string;
  onDateChange: (date: string) => void;
};

export const DateContext = createContext<DateContextType>({
  date: formatDate(new Date()),
  onDateChange: () => {},
});

export function DateContextProvider({ children }: PropsWithChildren<DateContextProviderProps>) {
  const [date, setDate] = useState(formatDate(new Date()));

  const onDateChange = (date: string) => setDate(date);

  return <DateContext.Provider value={{ date, onDateChange }}>{children}</DateContext.Provider>;
}
