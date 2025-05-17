import type { CartItem } from '@/interfaces/cart/cart-item';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  items?: CartItem[];
}

const initialState: CartState = {
  items: undefined,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { commodity, quantity, id, shoppingCartId } = action.payload;
      const existingItem = state.items?.find(
        (item) => item.commodity.id === commodity.id,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        if (!state.items) {
          state.items = [];
        }
        state.items.push({
          commodity,
          quantity,
          id,
          shoppingCartId,
        });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: CartItem['commodity']['id'];
        quantity: CartItem['quantity'];
      }>,
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items?.find(
        (item) => item.commodity.id === id,
      );

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: CartItem['commodity']['id'] }>,
    ) => {
      const { id } = action.payload;
      state.items = state.items?.filter((item) => item.commodity.id !== id);
    },
    clearCart: (state) => {
      state.items = undefined;
    },
  },
});

export const { setItems, addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
