import { ASelect, type ASelectProps } from '@/common/ui-common';
import { useGetCart } from '@/hooks/cart/use-get-cart';
import { useUpdateQuantity } from '@/hooks/cart/use-update-quantity';
import type { CartItem } from '@/interfaces/cart/cart-item';

export interface SelectQuantityProps extends ASelectProps {
  id: CartItem['commodity']['id'];
}

export const SelectQuantity = ({ id, ...props }: SelectQuantityProps) => {
  const getCart = useGetCart();

  const updateQuantity = useUpdateQuantity();

  const cartItem = getCart.cart?.cartItems?.find(
    (item) => item.commodity.id === id,
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

          await updateQuantity.updateQuantity({
            id: cartItem.commodity.id,
            quantity: value as number,
          });
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
};
