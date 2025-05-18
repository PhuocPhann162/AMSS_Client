import { useGetCartQuery } from '@/api/cart-api';
import { AImage, AModal } from '@/common/ui-common';
import type { Cart } from '@/interfaces/cart/cart';
import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface ModalCartProps {
  onCancel?: () => Promise<void> | void;
  onNavigateCartPage?: () => Promise<void> | void;
  onClickCartItem?: () => Promise<void> | void;
  defaultOpen?: boolean;
  children?: (state: {
    open: boolean;
    cart?: Cart;
    isFetching: boolean;
    isLoading: boolean;
    toggleModal: () => void;
  }) => ReactNode;
}

export const ModalCartWrapper = ({
  onCancel,
  onNavigateCartPage,
  onClickCartItem,
  children,
  defaultOpen,
}: ModalCartProps) => {
  const [open, setOpen] = useState(defaultOpen ?? false);

  const getCart = useGetCartQuery();

  const navigate = useNavigate();

  const cart = getCart.currentData?.result;

  return (
    <>
      {children?.({
        open,
        cart,
        isFetching: getCart.isFetching,
        isLoading: getCart.isLoading,
        toggleModal: () => setOpen((prev) => !prev),
      })}
      <AModal
        open={open}
        onCancel={async () => {
          await onCancel?.();

          setOpen(false);
        }}
        onOk={async () => {
          await onNavigateCartPage?.();

          setOpen(false);
          navigate('/store/cart');
        }}
        okText='Review Cart'
        footer={(_, { OkBtn }) => (cart?.cartItems?.length ? <OkBtn /> : null)}
        title='Cart'
      >
        {!cart?.cartItems?.length && <p>Cart is empty</p>}

        {!!cart?.cartItems?.length && (
          <>
            {cart?.cartItems?.map((item) => (
              <Link
                to={`/store/commodity/${item.commodityId}`}
                key={item.commodityId}
                className='flex items-center gap-4'
                onClick={async () => {
                  await onClickCartItem?.();
                }}
              >
                <AImage
                  src={item.commodityImage}
                  preview={false}
                  height={100}
                />
                <p>{item.commodityName}</p>
              </Link>
            ))}
          </>
        )}
      </AModal>
    </>
  );
};
