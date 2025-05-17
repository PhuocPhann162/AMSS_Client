import { useUpdateQuantityMutation } from '@/api/cart-api';
import { addItem } from '@/features/cart/store/cart-slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import type { CartItem } from '@/interfaces/cart/cart-item';
import { useCallback } from 'react';

export const useUpdateQuantity = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [updateQuantityAsync, updateQuantityResult] =
    useUpdateQuantityMutation();

  const handleUpdateQuantity = useCallback(
    async (cartItem: CartItem) => {
      if (auth.accessToken) {
        await updateQuantityAsync({
          id: cartItem.id,
          quantity: cartItem.quantity,
        });
      } else {
        dispatch(addItem(cartItem));
      }
    },
    [auth.accessToken, dispatch, updateQuantityAsync],
  );

  return {
    updateQuantity: handleUpdateQuantity,
    isLoading: updateQuantityResult.isLoading,
  };
};
