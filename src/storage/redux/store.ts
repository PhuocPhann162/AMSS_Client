import { polygonAgroApi } from '@/api';
import { appBaseApi } from '@/api/instances';
import { authReducer } from '@/features/auth/store/auth-slice';
import { countryReducer } from '@/storage/redux/countrySlice';
import { authListenerMiddleware } from '@/storage/redux/middleware/auth-listener';
import { authStorage } from '@/utils/auth-storage';
import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from './chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countryStore: countryReducer,
    chatStore: chatReducer,
    [appBaseApi.reducerPath]: appBaseApi.reducer,
    [polygonAgroApi.reducerPath]: polygonAgroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authListenerMiddleware.middleware)
      .concat(appBaseApi.middleware, polygonAgroApi.middleware),
  preloadedState: {
    auth: {
      user: authStorage.getUser(),
      accessToken: authStorage.getAccessToken(),
      refreshToken: authStorage.getRefreshToken(),
      isAuthenticated:
        !!authStorage.getAccessToken() && !!authStorage.getUser(),
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
