import type { Commodity } from '@/interfaces';
import type { CartItem } from '@/interfaces/cart/cart-item';

export interface AddUpdateCartItemRequest {
  commodityId: Commodity['id'];
  updateQuantityBy: CartItem['quantity'];
}

export interface ApplyCouponRequest {
  couponCode: string;
}
