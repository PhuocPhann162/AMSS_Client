import { homeThemeConfig } from '@/contexts/home-ant-config/home-theme-config';
import ConfigProvider from 'antd/es/config-provider';
import type { ReactNode } from 'react';

export interface HomeAntConfigProviderProps {
  children: ReactNode;
}

export const HomeAntConfigProvider = ({
  children,
}: HomeAntConfigProviderProps) => {
  return <ConfigProvider theme={homeThemeConfig}>{children}</ConfigProvider>;
};
