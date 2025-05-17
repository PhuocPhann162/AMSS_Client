import { useAddCartItemMutation } from '@/api/cart-api';
import { addItem } from '@/features/cart/store/cart-slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import type { CartItem } from '@/interfaces/cart/cart-item';
import { useCallback } from 'react';

export const useAddCartItem = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [addCartItemAsync, addCartItemResult] = useAddCartItemMutation();

  const handleAddCartItem = useCallback(
    async (cartItem: CartItem) => {
      if (auth.accessToken) {
        await addCartItemAsync({
          id: cartItem.id,
          quantity: cartItem.quantity,
        });
      } else {
        dispatch(addItem(cartItem));
      }
    },
    [addCartItemAsync, auth.accessToken, dispatch],
  );

  return {
    addCartItem: handleAddCartItem,
    isLoading: addCartItemResult.isLoading,
  };
};
