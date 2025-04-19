import { configureStore } from '@reduxjs/toolkit';
import { userAuthReducer } from './authSlice';
import { countryReducer } from './countrySlice';
import { appApi, authAppApi } from '@/api/app';
import { polygonAgroApi } from '@/api';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    countryStore: countryReducer,
    [appApi.reducerPath]: appApi.reducer,
    [authAppApi.reducerPath]: authAppApi.reducer,
    [polygonAgroApi.reducerPath]: polygonAgroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(appApi.middleware)
      .concat(authAppApi.middleware)
      .concat(polygonAgroApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
