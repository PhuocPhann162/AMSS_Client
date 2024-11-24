import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: '#17a46d',
    borderRadius: 8,
    fontSize: 14,
    motionDurationSlow: '0.2s'
  },
  components: {
    Steps: {
      customIconTop: -4
    },
    Segmented: {
      itemActiveBg: 'var(--color-green-tint)',
      itemHoverBg: 'var(--color-green-tint)',
      itemSelectedBg: 'rgb(var(--color-green-01))',
      trackBg: '#ffffff',
      trackPadding: 0,
      itemColor: 'rgba(0, 0, 0, 0.33)'
    },
    Table: {
      rowHoverBg: '#f0f0f0',
      headerBg: '#ffffff',
      footerBg: '#ffffff',
      borderColor: 'rgba(229, 229, 229, var(--tw-border-opacity))',
      borderRadius: 8
    }
  }
};
