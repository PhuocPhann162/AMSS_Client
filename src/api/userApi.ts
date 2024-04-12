import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { emptyUserState, setLoggedInUser } from '~/storage/redux/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:7213/api/',
  prepareHeaders: (headers: Headers, api) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    accessToken && headers.append('Authorization', 'Bearer ' + accessToken);
  }
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: 'auth/refreshToken',
        method: 'POST',
        body: localStorage.getItem('refreshToken')
      },
      { ...api },
      { Headers: { 'Content-type': 'application/json' } }
    );

    console.log(refreshResult);

    if (refreshResult.data) {
      // store the new token in the store or wherever you keep it
      localStorage.setItem('accessToken', JSON.stringify(refreshResult.data));
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
  }
  return result;
};

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: 'user/getAll',
        method: 'GET'
      }),
      providesTags: ['Users']
    }),
    lockUnLockUser: builder.mutation({
      query: (id) => ({
        url: `user/lockUnlock/${id}`,
        method: 'POST',
        body: id
      }),
      invalidatesTags: ['Users']
    }),
    roleManagement: builder.mutation({
      query: ({ userId, role }) => ({
        url: `user/updateRole/${userId}`,
        method: 'POST',
        body: role
      }),
      invalidatesTags: ['Users']
    })
  }),
  refetchOnReconnect: true
});

export default userApi;
export const { useGetAllUsersQuery, useLockUnLockUserMutation, useRoleManagementMutation } = userApi;
