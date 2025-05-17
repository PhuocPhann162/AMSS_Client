import {
  addItem,
  clearCart,
  removeItem,
  setItems,
  updateQuantity,
} from '@/features/cart/store/cart-slice';
import { RootState } from '@/storage/redux/store';
import { cartStorage } from '@/utils/cart-storage';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(setItems, addItem, updateQuantity, removeItem),
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const { items } = state.cart;

    if (items) {
      cartStorage.setCartItems(items);
    }
  },
});

cartListenerMiddleware.startListening({
  actionCreator: clearCart,
  effect: () => {
    cartStorage.removeCartItems();
  },
});
