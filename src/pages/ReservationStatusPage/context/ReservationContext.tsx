import { createContext, useContext, useState, ReactNode } from 'react';
import { formatDate } from '_tosslib/utils/date';

interface DateContextValue {
  date: string;
  setDate: (date: string) => void;
}

const DateContext = createContext<DateContextValue | null>(null);

export function useDateContext() {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDateContext must be used within DateProvider');
  }
  return context;
}

export function DateProvider({ children }: { children: ReactNode }) {
  const [date, setDate] = useState(() => formatDate(new Date()));

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
}
