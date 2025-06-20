import { useAuthGetCartQuery } from '@/api/cart-api';
import { ABadge, type ABadgeProps } from '@/common/ui-common';
import { colors } from '@/configs/colors';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { twMerge } from 'tailwind-merge';

export type BadgeCartIconProps = ABadgeProps;

export const BadgeCartIcon = (props: BadgeCartIconProps) => {
  const getCart = useAuthGetCartQuery();
  const getCartData =
    getCart.data && !getCart.isError ? getCart.data : undefined;

  return (
    <ABadge
      count={
        getCartData?.result.cartItems?.length
          ? getCartData?.result.cartItems.reduce(
              (total, item) => total + item.quantity,
              0,
            )
          : undefined
      }
      size='small'
      color={colors['Green'][700]}
      {...props}
      className={twMerge('m-1 cursor-pointer text-inherit', props.className)}
    >
      <ShoppingCartOutlined className='text-xl' />
    </ABadge>
  );
};
