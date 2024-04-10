import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenModel } from '~/interfaces';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setLoggedInUser } from '~/storage/redux/authSlice';
import { emptyUserState } from '~/storage/redux/authSlice';
import { useDispatch } from 'react-redux';
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:7213/api/',
  prepareHeaders: (headers: Headers, api) => {
    const token: tokenModel = JSON.parse(localStorage.getItem('token') ?? '');
    token?.accessToken && headers.append('Authorization', 'Bearer ' + token.accessToken);
  }
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  const dispatch = useDispatch();

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('refreshToken', api, extraOptions);

    if (refreshResult.data) {
      // store the new token in the store or wherever you keep it
      localStorage.removeItem('token');
      localStorage.setItem('token', JSON.stringify(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh failed - do something like redirect to login or show a "retry" button
      localStorage.removeItem('token');
      dispatch(setLoggedInUser({ ...emptyUserState }));
      window.location.reload();
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
  })
});

export default userApi;
export const { useGetAllUsersQuery, useLockUnLockUserMutation, useRoleManagementMutation } = userApi;
