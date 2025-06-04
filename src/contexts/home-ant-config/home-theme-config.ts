import { colors, semanticColors } from '@/configs/colors';
import type { ThemeConfig } from 'antd/es/config-provider';

export const homeThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors['green-pea'][700],
    colorTextBase: semanticColors['black1'],
  },
  components: {
    Button: {
      fontWeight: 600,
    },
    Tag: {
      defaultBg: colors['green-pea'][100],
      defaultColor: semanticColors['green'],
    },
  },
};
