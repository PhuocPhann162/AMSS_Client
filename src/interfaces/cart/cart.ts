import type { CartItem } from '@/interfaces/cart/cart-item';

export interface Cart {
  userId: string;
  couponCode?: string;
  discount?: number;
  cartTotal: number;
  stripePaymentIntentId?: string;
  clientSecret?: string;
  cartItems?: CartItem[];
}
