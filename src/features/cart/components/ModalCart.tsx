import { AImage, AModal } from '@/common/ui-common';
import { useGetCart } from '@/hooks/cart/useGetCart';
import { Link, useNavigate } from 'react-router-dom';

export interface ModalCartProps {
  open?: boolean;
  onCancel?: () => Promise<void> | void;
  onNavigateCartPage?: () => Promise<void> | void;
  onClickCartItem?: () => Promise<void> | void;
}

export const ModalCart = ({
  open,
  onCancel,
  onNavigateCartPage,
  onClickCartItem,
}: ModalCartProps) => {
  const getCartState = useGetCart();

  const navigate = useNavigate();

  const cartItems = getCartState.cart?.cartItems;

  return (
    <AModal
      open={open}
      onCancel={onCancel}
      onOk={async () => {
        await onNavigateCartPage?.();

        navigate('/store/cart');
      }}
      okText='Review Cart'
      footer={(_, { OkBtn }) => <OkBtn />}
      title='Cart'
    >
      {!cartItems?.length && <p>Cart is empty</p>}

      {!!cartItems?.length && (
        <>
          {cartItems.map((item) => (
            <Link
              to={`/store/commodity/${item.commodity.id}`}
              key={item.commodity.id}
              className='flex items-center gap-4'
              onClick={async () => {
                await onClickCartItem?.();
              }}
            >
              <AImage src={item.commodity.image} preview={false} height={100} />
              <p>{item.commodity.name}</p>
            </Link>
          ))}
        </>
      )}
    </AModal>
  );
};
