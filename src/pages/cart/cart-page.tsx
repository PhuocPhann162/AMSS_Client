import { CartReviewItem } from '@/features/cart/components/cart-review-item';
import { useGetCart } from '@/hooks/cart/use-get-cart';
import type { Cart } from '@/interfaces/cart/cart';
import type { ReactNode } from 'react';

export const CartPage = () => {
  const getCart = useGetCart();

  const paymentItems: {
    label: ReactNode;
    render: (data?: Cart) => ReactNode;
  }[] = [
    {
      label: 'Subtotal',
      render: (data) =>
        data?.cartItems?.reduce(
          (total, item) => total + item.quantity * item.commodity.price,
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
          (total, item) => total + item.quantity * item.commodity.price,
          0,
        ),
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-4xl font-bold'>Review your cart</h3>
      {getCart.cart?.cartItems?.length ? (
        getCart.cart?.cartItems?.map((item) => (
          <CartReviewItem key={item.id} data={item} />
        ))
      ) : (
        <p>Cart is empty</p>
      )}
      <div className='flex flex-col gap-3'>
        {paymentItems.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <p>{item.label}</p>
            <p>{item.render(getCart.cart)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
