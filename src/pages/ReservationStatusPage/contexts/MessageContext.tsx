import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocationMessage } from '../hooks';

interface MessageContextProviderProps {}

export type MessageType = 'success' | 'error';
export type Message = { type: MessageType; text: string };

type MessageContextType = {
  message: Message | null;
  onMessageChange: (message: Message | null) => void;
};

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (context === null) throw new Error('MessageContext로 감싸주세요.');

  return context;
};

export function MessageContextProvider({ children }: PropsWithChildren<MessageContextProviderProps>) {
  const { message: locationMessage } = useLocationMessage();

  const [message, setMessage] = useState<Message | null>(
    locationMessage ? { type: 'success', text: locationMessage } : null
  );

  const onMessageChange = (message: Message | null) => setMessage(message);

  return <MessageContext.Provider value={{ message, onMessageChange }}>{children}</MessageContext.Provider>;
}
