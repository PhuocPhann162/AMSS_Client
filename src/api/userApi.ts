import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenModel } from '~/interfaces';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7213/api/',
    prepareHeaders: (headers: Headers, api) => {
      const token: tokenModel = JSON.parse(localStorage.getItem('token') ?? '');
      token?.accessToken && headers.append('Authorization', 'Bearer ' + token.accessToken);
    }
  }),
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
