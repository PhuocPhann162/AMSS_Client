import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { emptyUserState, setLoggedInUser } from '~/storage/redux/authSlice';
import { Mutex } from 'async-mutex';
import { MaybePromise } from 'node_modules/@reduxjs/toolkit/dist/query/tsHelpers';
import { QueryReturnValue } from 'node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes';
import { jwtDecode } from 'jwt-decode';

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL as string,
  prepareHeaders: (headers: Headers, api) => {
    const accessToken = localStorage.getItem('accessToken');
    accessToken && headers.append('Authorization', 'Bearer ' + accessToken);
  }
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const refreshTokenValue = localStorage.getItem('refreshToken');
  const decodeRefreshToken = jwtDecode(refreshTokenValue as string);
  console.log(decodeRefreshToken);
  console.log(Math.floor(Date.now() / 1000));

  if (decodeRefreshToken.exp! < Math.floor(Date.now() / 1000)) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    api.dispatch(setLoggedInUser({ ...emptyUserState }));
    window.location.replace('/login');
  }

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result: MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> = await baseQuery(
    args,
    api,
    extraOptions
  );

  if ((result?.error as any)?.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      // try to get a new token
      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/refreshToken',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ RefreshToken: refreshTokenValue })
          },
          { ...api },
          extraOptions
        );
        console.log(refreshResult);

        if (refreshResult.data) {
          console.log('refresh success');
          // store the new token in the store or wherever you keep it
          localStorage.setItem('accessToken', (refreshResult.data as { result: string }).result);
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // refresh failed - do something like redirect to login or show a "retry" button
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          api.dispatch(setLoggedInUser({ ...emptyUserState }));
          window.location.replace('/login');
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
