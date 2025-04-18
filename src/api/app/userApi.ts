import { authAppApi } from '@/api/app';

export const userApi = authAppApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ searchString, pageNumber, pageSize }) => ({
        url: 'user/getAll',
        method: 'GET',
        params: {
          ...(searchString && { searchString }),
          ...(pageNumber && { pageNumber }),
          ...(pageSize && { pageSize }),
        },
      }),
      transformResponse(apiResponse: { result: any }, meta: any) {
        return {
          apiResponse,
          totalRecords: meta.response.headers.get('X-Pagination'),
        };
      },
      providesTags: ['Users'],
    }),
    lockUnLockUser: builder.mutation({
      query: (id) => ({
        url: `user/lockUnlock/${id}`,
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['Users'],
    }),
    roleManagement: builder.mutation({
      query: ({ userId, role }) => ({
        url: `user/updateRole/${userId}`,
        method: 'POST',
        body: role,
      }),
      invalidatesTags: ['Users'],
    }),
    updateInfo: builder.mutation({
      query: ({ userId, data }) => ({
        url: `user/updateInfo/${userId}`,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLockUnLockUserMutation,
  useRoleManagementMutation,
  useUpdateInfoMutation,
} = userApi;
