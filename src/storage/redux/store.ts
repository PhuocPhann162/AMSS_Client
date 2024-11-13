import { configureStore } from '@reduxjs/toolkit';
import {
  authApi,
  cropApi,
  cropTypeApi,
  farmApi,
  fieldApi,
  locationApi,
  polygonAgroApi,
  polygonApi,
  socialMetricApi,
  userApi
} from '~/api';
import { userAuthReducer } from './authSlice';

const store = configureStore({
  reducer: {
    userAuthStore: userAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [farmApi.reducerPath]: farmApi.reducer,
    [fieldApi.reducerPath]: fieldApi.reducer,
    [polygonApi.reducerPath]: polygonApi.reducer,
    [cropTypeApi.reducerPath]: cropTypeApi.reducer,
    [polygonAgroApi.reducerPath]: polygonAgroApi.reducer,
    [cropApi.reducerPath]: cropApi.reducer,
    [socialMetricApi.reducerPath]: socialMetricApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(locationApi.middleware)
      .concat(farmApi.middleware)
      .concat(fieldApi.middleware)
      .concat(polygonApi.middleware)
      .concat(cropTypeApi.middleware)
      .concat(polygonAgroApi.middleware)
      .concat(cropApi.middleware)
      .concat(socialMetricApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
