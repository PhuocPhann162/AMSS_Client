import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuthenticationAction = () => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAction = <T, Args extends unknown[]>(
    action: (...args: Args) => Promise<T> | T,
  ) => {
    return async (...args: Args): Promise<T | void> => {
      if (auth.accessToken) {
        return await action(...args);
      }

      navigate(`/login?from=${location.pathname}`);
    };
  };

  return {
    handleAction,
  };
};
