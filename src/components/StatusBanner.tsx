import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

type BannerType = 'success' | 'error';

interface StatusBannerProps {
  type: BannerType;
  message: string;
}

const bannerColors: Record<BannerType, { background: string; text: string }> = {
  success: { background: colors.blue50, text: colors.blue600 },
  error: { background: colors.red50, text: colors.red500 },
};

export function StatusBanner({ type, message }: StatusBannerProps) {
  const { background, text } = bannerColors[type];

  return (
    <div css={css`padding: 0 24px;`}>
      <div
        css={css`
          padding: 10px 14px;
          border-radius: 10px;
          background: ${background};
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        <Text typography="t7" fontWeight="medium" color={text}>
          {message}
        </Text>
      </div>
    </div>
  );
}
