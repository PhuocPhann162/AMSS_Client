import { useGetCommodityByIdQuery } from '@/api';
import { useAddUpdateCartItemMutation, useGetCartQuery } from '@/api/cart-api';
import { AButton } from '@/common/ui-common';
import { useAuthenticationAction } from '@/features/auth/hooks/use-authentication-action';
import { CommodityStatus } from '@/interfaces';
import type { CartItem } from '@/interfaces/cart/cart-item';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import type { ReactNode } from 'react';

export interface ButtonAddToCartProps {
  id: CartItem['commodityId'];
  quantity?: CartItem['quantity'];
  children?: ReactNode;
}

export const ButtonAddToCart = ({
  id,
  quantity = 1,
  children,
}: ButtonAddToCartProps) => {
  const [addUpdateCartItem, addUpdateCartItemResult] =
    useAddUpdateCartItemMutation();
  const { handleAction } = useAuthenticationAction();

  const getCart = useGetCartQuery();

  const cartItem = getCart.currentData?.result?.cartItems?.find(
    (item) => item.commodityId === id,
  );

  const getCommodityById = useGetCommodityByIdQuery({ id });

  const getCommodityByIdData = getCommodityById.currentData?.result;

  const handleClick = async () => {
    try {
      const handle = handleAction(async () => {
        await addUpdateCartItem({
          id,
          quantity: cartItem ? cartItem.quantity + quantity : quantity,
        });
      });

      await handle();
    } catch (error) {
      console.error(error);
    }
  };

  const commodityStatus = getCommodityByIdData?.status;

  const disabled = commodityStatus === CommodityStatus.Discontinued;

  if (commodityStatus === CommodityStatus.OutOfStock) return undefined;

  return (
    <AButton
      type='primary'
      disabled={disabled || getCommodityById.isFetching || getCart.isFetching}
      loading={addUpdateCartItemResult.isLoading}
      onClick={handleClick}
      icon={<PlusCircleOutlined />}
    >
      {children ?? 'Add To Cart'}
    </AButton>
  );
};
