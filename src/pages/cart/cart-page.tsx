import { useGetCart } from '@/hooks/cart/useGetCart';

export const CartPage = () => {
  const cartState = useGetCart();

  return (
    <div>
      {cartState.cart?.cartItems?.map((item) => (
        <div key={item.id}>
          <p>{item.commodity.name}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  );
};
