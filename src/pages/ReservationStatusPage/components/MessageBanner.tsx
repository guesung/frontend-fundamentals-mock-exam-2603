import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageContext } from '../contexts';

type MessageType = 'success' | 'error';
export type Message = { type: MessageType; text: string };

const variantMap: Record<MessageType, { background: string; color: string }> = {
  success: {
    background: colors.blue50,
    color: colors.blue600,
  },
  error: {
    background: colors.red50,
    color: colors.red500,
  },
};

export function MessageBanner() {
  const location = useLocation();
  const { message } = useContext(MessageContext);

  useEffect(
    function clearLocationState() {
      const locationState = location.state as { message?: string } | null;
      if (locationState?.message) {
        window.history.replaceState({}, '');
      }
    },
    [location]
  );

  if (!message) return null;
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <div
        css={css`
          padding: 10px 14px;
          border-radius: 10px;
          background: ${variantMap[message.type]['background']};
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        <Text typography="t7" fontWeight="medium" color={variantMap[message.type]['color']}>
          {message.text}
        </Text>
      </div>
      <Spacing size={12} />
    </div>
  );
}
