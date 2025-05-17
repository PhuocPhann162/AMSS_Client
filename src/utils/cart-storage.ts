import type { CartItem } from '@/interfaces/cart/cart-item';

class CartStorage {
  public readonly STORAGE_KEY = 'cart-items';

  public setCartItems(cartItems: CartItem[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartItems));
  }

  public getCartItems() {
    const cartItems = localStorage.getItem(this.STORAGE_KEY);

    if (!cartItems) return undefined;

    try {
      return JSON.parse(cartItems) as CartItem[];
    } catch (error) {
      console.error('Failed to parse cart items from local storage:', error);
      return undefined;
    }
  }

  public removeCartItems() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const cartStorage = new CartStorage();
