import { AntMessageContext } from '@/contexts/ant-message/use-ant-message';
import { message } from 'antd';
import type { ReactNode } from 'react';

export interface AntMessageProviderProps {
  children: ReactNode;
}

export const AntMessageProvider = ({ children }: AntMessageProviderProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <AntMessageContext.Provider value={{ api: messageApi }}>
      {contextHolder}
      {children}
    </AntMessageContext.Provider>
  );
};
