import { clearAuth, setAccessToken } from '@/features/auth/store/auth-slice';
import { type RootState } from '@/storage/redux/store';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { jwtDecode } from 'jwt-decode';
import qs from 'qs';

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, api) => {
    const accessToken = (api.getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set('Authorization', 'Bearer ' + accessToken);
    }

    headers.set('ngrok-skip-browser-warning', 'true');

    return headers;
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshTokenValue = (api.getState() as RootState).auth.refreshToken;

    if (refreshTokenValue) {
      try {
        const decodeRefreshToken = jwtDecode(refreshTokenValue);

        if (decodeRefreshToken.exp! < Math.floor(Date.now() / 1000)) {
          api.dispatch(clearAuth());
          return result;
        }
      } catch (error) {
        console.error('Invalid refresh token', error);
        api.dispatch(clearAuth());
        return result;
      }
    }

    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      // try to get a new token
      try {
        const refreshResult = await baseQuery(
          {
            url: 'auth/refreshToken',
            method: 'POST',
            body: { RefreshToken: refreshTokenValue },
          },
          api,
          extraOptions,
        );

        console.log('refresh token result', refreshResult);

        if (refreshResult.data) {
          console.log('refresh success');
          // store the new token in the store or wherever you keep it
          api.dispatch(
            setAccessToken((refreshResult.data as { result: string }).result),
          );
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // refresh failed - do something like redirect to login or show a "retry" button
          api.dispatch(clearAuth());
        }
      } finally {
        // release the mutex
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
