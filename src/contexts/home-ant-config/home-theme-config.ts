import { colors, semanticColors } from '@/configs/colors';
import type { ThemeConfig } from 'antd/es/config-provider';

export const homeThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors['green-pea'][700],
    colorTextBase: semanticColors['black1'],
    colorLink: colors['green-pea'][700],
    borderRadiusLG: 18,
  },
  components: {
    Button: {
      fontWeight: 600,
    },
    Tag: {
      defaultBg: colors['green-pea'][100],
      defaultColor: semanticColors['green'],
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
};
