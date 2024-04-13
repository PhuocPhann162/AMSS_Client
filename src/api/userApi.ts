import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '~/helper';

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
