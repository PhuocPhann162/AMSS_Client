import { useEffect } from 'react';
import { signalRService } from '@/services/signalr-service';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { RootState } from '@/storage/redux/store';

export const useSignalRConnection = () => {
  const { isAuthenticated, accessToken } = useAppSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      signalRService.connect();
    } else {
      signalRService.disconnect();
    }
    // Nếu token thay đổi, reconnect
  }, [isAuthenticated, accessToken]);
};
