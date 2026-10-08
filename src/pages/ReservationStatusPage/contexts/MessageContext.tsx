import { createContext, PropsWithChildren, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface MessageContextProviderProps {}

export type MessageType = 'success' | 'error';
export type Message = { type: MessageType; text: string };

type MessageContextType = {
  message: Message | null;
  onMessageChange: (message: Message | null) => void;
};

export const MessageContext = createContext<MessageContextType>({
  message: null,
  onMessageChange: () => {},
});

export function MessageContextProvider({ children }: PropsWithChildren<MessageContextProviderProps>) {
  const location = useLocation();

  const locationState = location.state as { message?: string } | null;
  const [message, setMessage] = useState<Message | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  const onMessageChange = (message: Message | null) => setMessage(message);

  return <MessageContext.Provider value={{ message, onMessageChange }}>{children}</MessageContext.Provider>;
}
