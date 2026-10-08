import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { formatDate } from 'utils/date';

interface DateContextProviderProps {}

type DateContextType = {
  date: string;
  onDateChange: (date: string) => void;
};

const DateContext = createContext<DateContextType | null>(null);

export const useDateContext = () => {
  const dateContext = useContext(DateContext);
  if (dateContext === null) throw new Error('DateContext로 감싸주세요.');

  return dateContext;
};

export function DateContextProvider({ children }: PropsWithChildren<DateContextProviderProps>) {
  const [date, setDate] = useState(formatDate(new Date()));

  const onDateChange = (date: string) => setDate(date);

  return <DateContext.Provider value={{ date, onDateChange }}>{children}</DateContext.Provider>;
}
