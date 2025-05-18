import { useAddUpdateCartItemMutation, useGetCartQuery } from '@/api/cart-api';
import { ASelect, type ASelectProps } from '@/common/ui-common';
import type { CartItem } from '@/interfaces/cart/cart-item';

export interface SelectQuantityProps extends ASelectProps {
  id: CartItem['commodityId'];
}

export const SelectQuantity = ({ id, ...props }: SelectQuantityProps) => {
  const getCart = useGetCartQuery();

  const [addUpdateCartItem] = useAddUpdateCartItemMutation();

  const cartItem = getCart.currentData?.result?.cartItems?.find(
    (item) => item.commodityId === id,
  );

  return (
    <ASelect
      {...props}
      loading={getCart.isFetching}
      disabled={getCart.isFetching}
      options={Array.from({ length: 99 }, (_, i) => ({
        value: i + 1,
        label: i + 1,
      }))}
      value={cartItem?.quantity}
      allowClear={props.allowClear ?? false}
      onChange={async (value) => {
        try {
          if (!cartItem) {
            return;
          }

          await addUpdateCartItem({
            id: cartItem.commodityId,
            quantity: value as number,
          });
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};
