import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '~/api';
import { userAuthReducer } from './authSlice';

const store = configureStore({
  reducer: {
    userAuthStore: userAuthReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;