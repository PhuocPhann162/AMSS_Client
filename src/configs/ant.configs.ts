import { colors } from '@/configs/colors';
import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors['green-haze'][500],
    colorLink: colors['green-haze'][500],
    borderRadius: 8,
    fontSize: 14,
    motionDurationSlow: '0.2s',
    colorTextBase: colors['abbey'][950],
  },
  components: {
    Table: {
      headerBg: '#ffffff',
      footerBg: '#ffffff',
      borderRadius: 8,
    },
  },
};
