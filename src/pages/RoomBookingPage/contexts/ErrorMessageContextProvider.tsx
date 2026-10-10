import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useReservationSearchParams } from '../hooks';

type ErrorMessageContextType = {
  errorMessage: string | null;
  onErrorMessageChange: (errorMessage: string | null) => void;
};

const ErrorMessageContext = createContext<ErrorMessageContextType | null>(null);

export const useErrorMessageContext = () => {
  const context = useContext(ErrorMessageContext);
  if (context === null) throw new Error('ErrorMessageContextProvider로 감싸주세요.');

  return context;
};

interface ErrorMessageContextProviderProps {}

export function ErrorMessageContextProvider({ children }: PropsWithChildren<ErrorMessageContextProviderProps>) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { rservationFilterKey } = useReservationSearchParams();

  useEffect(() => {
    setErrorMessage(null);
  }, [rservationFilterKey]);

  return (
    <ErrorMessageContext.Provider value={{ errorMessage, onErrorMessageChange: setErrorMessage }}>
      {children}
    </ErrorMessageContext.Provider>
  );
}
