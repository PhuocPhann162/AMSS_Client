import { configureStore } from '@reduxjs/toolkit';
import { authApi, userApi } from '~/api';
import { userAuthReducer } from './authSlice';

const store = configureStore({
  reducer: {
    userAuthStore: userAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
