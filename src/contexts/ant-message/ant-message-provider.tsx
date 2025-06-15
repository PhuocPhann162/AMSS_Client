import { AntMessageContext } from '@/contexts/ant-message/use-ant-message';
import message from 'antd/es/message';
import type { ReactNode } from 'react';

export interface AntMessageProviderProps {
  children: ReactNode;
}

export const AntMessageProvider = ({ children }: AntMessageProviderProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <AntMessageContext.Provider value={{ api: messageApi }}>
      {children}
      {contextHolder}
    </AntMessageContext.Provider>
  );
};
