import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/storage/redux/authSlice';
import { countryReducer } from '@/storage/redux/countrySlice';
import { appBaseApi } from '@/api/instances';
import { polygonAgroApi } from '@/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countryStore: countryReducer,
    [appBaseApi.reducerPath]: appBaseApi.reducer,
    [polygonAgroApi.reducerPath]: polygonAgroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(appBaseApi.middleware)
      .concat(polygonAgroApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
