import { configureStore } from '@reduxjs/toolkit';
import { authApi, cropTypeApi, farmApi, locationApi, polygonAgroApi, polygonApi, userApi } from '~/api';
import { userAuthReducer } from './authSlice';
import fieldApi from '~/api/fieldApi';

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
    [polygonAgroApi.reducerPath]: polygonAgroApi.reducer
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
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
