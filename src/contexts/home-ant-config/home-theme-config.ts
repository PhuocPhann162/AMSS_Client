import { colors } from '@/configs/colors';
import type { ThemeConfig } from 'antd/es/config-provider';

export const homeThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors['Green'][700],
    colorTextBase: colors['Gray'][950],
    colorLink: colors['Green'][700],
    borderRadiusLG: 18,
    borderRadiusSM: 12,
  },
  components: {
    Button: {
      fontWeight: 600,
    },
    Tag: {
      defaultBg: colors['Green'][100],
      defaultColor: colors['Green'][700],
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
};
