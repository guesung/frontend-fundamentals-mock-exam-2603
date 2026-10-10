import { useResettableState } from 'hooks';
import { createContext, PropsWithChildren, useContext } from 'react';

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

interface ErrorMessageContextProviderProps {
  resetKey: string;
}

export function ErrorMessageContextProvider({
  resetKey,
  children,
}: PropsWithChildren<ErrorMessageContextProviderProps>) {
  const [errorMessage, setErrorMessage] = useResettableState<string | null>(resetKey, null);

  return (
    <ErrorMessageContext.Provider value={{ errorMessage, onErrorMessageChange: setErrorMessage }}>
      {children}
    </ErrorMessageContext.Provider>
  );
}
