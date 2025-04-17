import { configureStore } from '@reduxjs/toolkit';
import {
  authApi,
  cropApi,
  cropTypeApi,
  farmApi,
  fieldApi,
  locationApi,
  metaDataApi,
  polygonAgroApi,
  polygonApi,
  socialMetricApi,
  supplierApi,
  userApi,
} from '@/api';
import { userAuthReducer } from './authSlice';
import { countryReducer } from './countrySlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    countryStore: countryReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [farmApi.reducerPath]: farmApi.reducer,
    [fieldApi.reducerPath]: fieldApi.reducer,
    [polygonApi.reducerPath]: polygonApi.reducer,
    [cropTypeApi.reducerPath]: cropTypeApi.reducer,
    [polygonAgroApi.reducerPath]: polygonAgroApi.reducer,
    [cropApi.reducerPath]: cropApi.reducer,
    [socialMetricApi.reducerPath]: socialMetricApi.reducer,
    [metaDataApi.reducerPath]: metaDataApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
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
      .concat(metaDataApi.middleware)
      .concat(supplierApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
