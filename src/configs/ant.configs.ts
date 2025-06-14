import { colors } from '@/configs/colors';
import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors['Green'][700],
    colorTextBase: colors['Gray'][950],
    colorLink: colors['Green'][700],
    borderRadiusXS: 10,
    borderRadiusSM: 14,
    borderRadius: 16,
    borderRadiusLG: 20,
    fontSize: 16,
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
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
};
