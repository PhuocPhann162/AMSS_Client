import type { ReactNode } from 'react';
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { themeConfig } from '@/configs/ant.configs';
import { ConfigProvider } from 'antd';

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
