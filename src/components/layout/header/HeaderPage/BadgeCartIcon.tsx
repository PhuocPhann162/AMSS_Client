import { useAuthGetCartQuery } from '@/api/cart-api';
import { ABadge } from '@/common/ui-common';
import { semanticColors } from '@/configs/colors';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';

export interface BadgeCartIconProps {
  onIconClick?: () => void;
}

export const BadgeCartIcon = ({ onIconClick }: BadgeCartIconProps) => {
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
      color={semanticColors['green']}
    >
      <ShoppingCartOutlined
        onClick={() => onIconClick?.()}
        className='text-xl'
      />
    </ABadge>
  );
};
