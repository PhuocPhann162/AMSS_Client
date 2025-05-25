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
    Segmented: {
      itemActiveBg: '#d2ebe2',
      itemHoverBg: '#d2ebe2',
      itemSelectedBg: '#c4ecdd',
      trackBg: '#ffffff',
      trackPadding: 0,
      itemColor: 'rgba(0, 0, 0, 0.33)',
    },
  },
};
