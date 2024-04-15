import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '~/helper';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ searchString, pageNumber, pageSize }) => ({
        url: 'user/getAll',
        method: 'GET',
        params: {
          ...(searchString && { searchString }),
          ...(pageNumber && { pageNumber }),
          ...(pageSize && { pageSize })
        }
      }),
      transformResponse(apiResponse: { result: any }, meta: any) {
        return {
          apiResponse,
          totalRecords: meta.response.headers.get('X-Pagination')
        };
      },
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
