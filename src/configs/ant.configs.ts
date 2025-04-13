import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#17a46d',
    colorLink: '#17a46d',
    borderRadius: 8,
    fontSize: 14,
    motionDurationSlow: '0.2s',
  },
  components: {
    Table: {
      rowHoverBg: '#F7F8C5',
      footerBg: '#ffffff',
      borderRadius: 8,
    },
  },
};
