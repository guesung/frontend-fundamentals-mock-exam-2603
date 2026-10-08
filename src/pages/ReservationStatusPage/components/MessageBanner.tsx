import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

type MessageType = 'success' | 'error';
export type Message = { type: MessageType; text: string };

interface MessageBannerProps {
  message: Message;
}

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

export function MessageBanner({ message }: MessageBannerProps) {
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
