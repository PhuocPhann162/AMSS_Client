import { useGetCartQuery } from '@/api/cart-api';
import type { Cart } from '@/interfaces/cart/cart';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { useMemo } from 'react';

export const useGetCart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const auth = useAppSelector((state) => state.auth);
  const getCart = useGetCartQuery(undefined, {
    skip: !auth.accessToken,
  });

  const cart = useMemo<Cart | undefined>(() => {
    if (!auth.accessToken) {
      return {
        cartItems: cartItems?.map((item) => ({
          commodity: item.commodity,
          quantity: item.quantity,
          shoppingCartId: '',
          id: '',
        })),
        cartTotal: cartItems?.length ?? 0,
        userId: '',
      };
    }

    if (getCart.isError) {
      return undefined;
    }

    return getCart.currentData?.result;
  }, [
    auth.accessToken,
    cartItems,
    getCart.currentData?.result,
    getCart.isError,
  ]);

  return {
    cart,
    isFetching: getCart.isFetching,
    isLoading: getCart.isLoading,
  };
};
