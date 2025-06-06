import { useGetCommodityByIdQuery } from '@/api';
import { useAddUpdateCartItemMutation, useGetCartQuery } from '@/api/cart-api';
import { ATooltip } from '@/common/ui-common';
import { AHomeButton } from '@/common/ui-common/atoms/a-button/a-home-button';
import { useAuthenticationAction } from '@/features/auth/hooks/use-authentication-action';
import { CommodityStatus } from '@/interfaces';
import type { CartItem } from '@/interfaces/cart/cart-item';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import type { ReactNode } from 'react';

export interface AddToCartButtonProps {
  id: CartItem['commodityId'];
  quantity?: CartItem['quantity'];
  children?: ReactNode;
}

export const AddToCartButton = ({
  id,
  quantity = 1,
  children,
}: AddToCartButtonProps) => {
  const [addUpdateCartItem, addUpdateCartItemResult] =
    useAddUpdateCartItemMutation();
  const { handleAction } = useAuthenticationAction();

  const getCart = useGetCartQuery();
  const getCartData =
    getCart.data && !getCart.isError ? getCart.data : undefined;

  const cartItem = getCartData?.result?.cartItems?.find(
    (item) => item.commodityId === id,
  );

  const getCommodityById = useGetCommodityByIdQuery({ id });

  const getCommodityByIdData =
    getCommodityById.data && !getCommodityById.isError
      ? getCommodityById.data
      : undefined;

  const handleClick = async () => {
    try {
      const handle = handleAction(async () => {
        await addUpdateCartItem({
          commodityId: id,
          updateQuantityBy: cartItem ? cartItem.quantity + quantity : quantity,
        });
      });

      await handle();
    } catch (error) {
      console.error(error);
    }
  };

  const commodityStatus = getCommodityByIdData?.result?.status;

  const disabled =
    commodityStatus === CommodityStatus.Discontinued ||
    commodityStatus === CommodityStatus.OutOfStock;

  let tooltipTitle = undefined;

  if (commodityStatus === CommodityStatus.Discontinued) {
    tooltipTitle = 'Discontinued';
  } else if (commodityStatus === CommodityStatus.OutOfStock) {
    tooltipTitle = 'Out of stock';
  }

  return (
    <ATooltip title={tooltipTitle}>
      <AHomeButton
        type='primary'
        disabled={disabled || getCommodityById.isFetching || getCart.isFetching}
        loading={addUpdateCartItemResult.isLoading}
        onClick={handleClick}
        icon={<PlusCircleOutlined />}
      >
        {children ?? 'Add To Cart'}
      </AHomeButton>
    </ATooltip>
  );
};
