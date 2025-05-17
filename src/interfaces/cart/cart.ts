import { CartItem } from '@/interfaces/cart/cart-item';

export interface Cart {
  userId: string;
  couponCode?: string;
  cartItems?: CartItem[];
  discount?: number;
  cartTotal: number;
  stripePaymentIntentId?: string;
  clientSecret?: string;
}
