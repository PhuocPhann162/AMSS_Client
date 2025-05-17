import { useClearCartMutation } from '@/api/cart-api';
import { setItems } from '@/features/cart/store/cart-slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useCallback } from 'react';

export const useClearCart = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [clearCartAsync, clearCartResult] = useClearCartMutation();

  const handleClearCart = useCallback(async () => {
    if (auth.accessToken) {
      await clearCartAsync();
    } else {
      dispatch(setItems([]));
    }
  }, [auth.accessToken, dispatch, clearCartAsync]);

  return {
    clearCart: handleClearCart,
    isLoading: clearCartResult.isLoading,
  };
};
