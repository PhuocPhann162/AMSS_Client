import { colors } from '@/configs/colors';
import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    fontFamily: 'Satoshi, sans-serif',
    colorPrimary: colors['Green'][700],
    colorTextBase: colors['Neutral'][900],
    colorLink: colors['Green'][700],
  },
  components: {
    Table: {
      headerBg: '#ffffff',
      footerBg: '#ffffff',
      borderRadius: 8,
    },
    Segmented: {
      itemActiveBg: colors['Green'][100],
      itemHoverBg: colors['Green'][100],
      itemSelectedBg: colors['Green'][200],
      trackBg: '#ffffff',
      trackPadding: 0,
      itemColor: colors['Neutral'][500],
    },
    Menu: {
      itemBorderRadius: 8,
    },
    Button: {
      fontWeight: 600,
    },
    Tag: {
      defaultBg: colors['Green'][100],
      defaultColor: colors['Green'][700],
    },
  },
};
