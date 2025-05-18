import { useUpdateQuantityMutation } from '@/api/cart-api';
import { updateQuantity } from '@/features/cart/store/cart-slice';
import type { CartItem } from '@/interfaces/cart/cart-item';
import { useAppDispatch } from '@/storage/redux/hooks/use-app-dispatch';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { useCallback } from 'react';

export const useUpdateQuantity = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [updateQuantityAsync, updateQuantityResult] =
    useUpdateQuantityMutation();

  const handleUpdateQuantity = useCallback(
    async (cartItem: {
      id: CartItem['commodity']['id'];
      quantity: CartItem['quantity'];
    }) => {
      if (auth.accessToken) {
        await updateQuantityAsync({
          id: cartItem.id,
          quantity: cartItem.quantity,
        });
      } else {
        dispatch(updateQuantity(cartItem));
      }
    },
    [auth.accessToken, dispatch, updateQuantityAsync],
  );

  return {
    updateQuantity: handleUpdateQuantity,
    isLoading: updateQuantityResult.isLoading,
  };
};
