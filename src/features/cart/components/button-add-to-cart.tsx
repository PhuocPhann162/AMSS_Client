import { useAddUpdateCartItemMutation, useGetCartQuery } from '@/api/cart-api';
import { AButton } from '@/common/ui-common';
import { useAuthenticationAction } from '@/features/auth/hooks/use-authentication-action';
import type { CartItem } from '@/interfaces/cart/cart-item';
import type { ReactNode } from 'react';

export interface ButtonAddToCartProps {
  id: CartItem['commodityId'];
  children?: ReactNode;
}

export const ButtonAddToCart = ({ id, children }: ButtonAddToCartProps) => {
  const [addUpdateCartItem, addUpdateCartItemResult] =
    useAddUpdateCartItemMutation();
  const getCart = useGetCartQuery();
  const { handleAction } = useAuthenticationAction();

  const cartItem = getCart.currentData?.result?.cartItems?.find(
    (item) => item.commodityId === id,
  );

  const handleClick = async () => {
    try {
      const handle = handleAction(async () => {
        await addUpdateCartItem({
          id,
          quantity: cartItem ? cartItem.quantity + 1 : 1,
        });
      });

      await handle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AButton
      type='primary'
      disabled={getCart.isFetching}
      loading={addUpdateCartItemResult.isLoading}
      onClick={handleClick}
    >
      {children}
    </AButton>
  );
};
