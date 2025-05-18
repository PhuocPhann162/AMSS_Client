import type { CartItem } from '@/interfaces/cart/cart-item';

export interface AddCartItemRequest {
  id: CartItem['commodity']['id'];
  quantity?: CartItem['quantity'];
}

export interface RemoveCartItemRequest {
  id: CartItem['commodity']['id'];
}

export interface UpdateQuantityRequest {
  id: CartItem['commodity']['id'];
  quantity: CartItem['quantity'];
}

export interface MergeCartRequest {
  items: CartItem[];
}
