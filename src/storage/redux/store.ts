import { polygonAgroApi } from '@/api';
import { appBaseApi } from '@/api/instances';
import { cartReducer } from '@/features/cart/store/cart-slice';
import { authReducer } from '@/storage/redux/authSlice';
import { countryReducer } from '@/storage/redux/countrySlice';
import { authListenerMiddleware } from '@/storage/redux/middleware/auth-listener';
import { cartListenerMiddleware } from '@/storage/redux/middleware/cart-listener';
import { authStorage } from '@/utils/auth-storage';
import { cartStorage } from '@/utils/cart-storage';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countryStore: countryReducer,
    cart: cartReducer,
    [appBaseApi.reducerPath]: appBaseApi.reducer,
    [polygonAgroApi.reducerPath]: polygonAgroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        authListenerMiddleware.middleware,
        cartListenerMiddleware.middleware,
      )
      .concat(appBaseApi.middleware, polygonAgroApi.middleware),
  preloadedState: {
    auth: {
      user: authStorage.getUser(),
      accessToken: authStorage.getAccessToken(),
      refreshToken: authStorage.getRefreshToken(),
    },
    cart: {
      items: cartStorage.getCartItems(),
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
