import type { MessageInstance } from 'antd/es/message/interface';
import { createContext, useContext } from 'react';

interface AntMessageContextType {
  api: MessageInstance;
}

export const AntMessageContext = createContext<
  AntMessageContextType | undefined
>(undefined);

export const useAntMessage = () => {
  const context = useContext(AntMessageContext);

  if (!context) {
    throw new Error('useAntMessage must be used within an AntMessageProvider');
  }

  return context;
};
