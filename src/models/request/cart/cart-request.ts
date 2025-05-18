import type { Commodity } from '@/interfaces';
import type { CartItem } from '@/interfaces/cart/cart-item';

export interface AddUpdateCartItemRequest {
  id: Commodity['id'];
  quantity?: CartItem['quantity'];
}

export interface ApplyCouponRequest {
  couponCode: string;
}
