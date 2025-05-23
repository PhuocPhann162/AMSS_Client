import { useGetCartQuery } from '@/api/cart-api';
import { AButton } from '@/common/ui-common';
import { CartReviewItem } from '@/features/cart/components/cart-review-item';
import type { Cart } from '@/interfaces/cart/cart';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const getCart = useGetCartQuery();

  const cart = getCart.currentData?.result;

  const navigate = useNavigate();

  const paymentItems: {
    label: ReactNode;
    render: (data?: Cart) => ReactNode;
  }[] = [
    {
      label: 'Subtotal',
      render: (data) =>
        data?.cartItems?.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        ),
    },
    {
      label: 'Shipping',
      render: () => 0,
    },
    {
      label: 'Total',
      render: (data) =>
        data?.cartItems?.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        ),
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-4xl font-bold'>Review your cart</h3>
      {cart?.cartItems?.length ? (
        cart?.cartItems?.map((item) => (
          <CartReviewItem key={item.id} data={item} />
        ))
      ) : (
        <p>Cart is empty</p>
      )}
      {!getCart.isFetching &&
        (cart?.cartItems?.length ? (
          <div className='flex flex-col gap-3'>
            {paymentItems.map((item, index) => (
              <div key={index} className='flex justify-between'>
                <p>{item.label}</p>
                <p>{item.render(cart)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-2'>
            <AButton
              variant='solid'
              color='default'
              onClick={() => navigate('/store')}
            >
              Continue Shopping
            </AButton>
            <AButton
              variant='solid'
              color='cyan'
              onClick={() => navigate('/store/payment')}
            >
              Looks Good? Place Order!
            </AButton>
          </div>
        ))}
    </div>
  );
};
