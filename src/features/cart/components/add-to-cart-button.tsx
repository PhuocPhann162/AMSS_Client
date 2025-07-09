import { useGetCommodityDetailQuery } from '@/api';
import { useAddUpdateCartItemMutation, useGetCartQuery } from '@/api/cart-api';
import { useAntMessage } from '@/contexts/ant-message/use-ant-message';
import { useAuthenticationAction } from '@/features/auth/hooks/use-authentication-action';
import { CommodityStatus } from '@/interfaces';
import type { CartItem } from '@/interfaces/cart/cart-item';
import { PlusCircleOutlined } from '@ant-design/icons';
import Button, { type ButtonProps } from 'antd/es/button';
import Tooltip from 'antd/es/tooltip';
import type { ReactNode } from 'react';

export interface AddToCartButtonProps {
  id: CartItem['commodityId'];
  quantity?: CartItem['quantity'];
  children?: ReactNode;
  className?: string;
}

export const AddToCartButton = ({
  id,
  quantity = 1,
  children,
  className,
}: AddToCartButtonProps) => {
  const [addUpdateCartItem, addUpdateCartItemResult] =
    useAddUpdateCartItemMutation();
  const { handleAction } = useAuthenticationAction();

  const antMessage = useAntMessage();

  const getCart = useGetCartQuery();
  const getCartData =
    getCart.data && !getCart.isError ? getCart.data : undefined;

  const cartItem = getCartData?.result?.cartItems?.find(
    (item) => item.commodityId === id,
  );

  const getCommodityById = useGetCommodityDetailQuery({ id });

  const getCommodityByIdData =
    getCommodityById.data && !getCommodityById.isError
      ? getCommodityById.data
      : undefined;

  const handleClick: ButtonProps['onClick'] = async (e) => {
    try {
      e.stopPropagation();
      const handle = handleAction(async () => {
        await addUpdateCartItem({
          commodityId: id,
          updateQuantityBy: cartItem ? cartItem.quantity + quantity : quantity,
        });

        antMessage.api.success('Added to cart');
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
    <Tooltip title={tooltipTitle}>
      <Button
        type='primary'
        disabled={disabled || getCommodityById.isFetching || getCart.isFetching}
        loading={addUpdateCartItemResult.isLoading}
        onClick={handleClick}
        icon={<PlusCircleOutlined />}
        className={className}
      >
        {children ?? 'Add To Cart'}
      </Button>
    </Tooltip>
  );
};
