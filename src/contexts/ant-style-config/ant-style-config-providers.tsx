import type { ReactNode } from 'react';
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import ConfigProvider from 'antd/es/config-provider';
import { themeConfig } from '@/configs/ant.configs';

interface AntStyleConfigProvidersProps {
  children: ReactNode;
}

const px2rem = px2remTransformer();

export const AntStyleConfigProviders = ({
  children,
}: AntStyleConfigProvidersProps) => {
  return (
    <StyleProvider layer transformers={[px2rem]}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </StyleProvider>
  );
};
