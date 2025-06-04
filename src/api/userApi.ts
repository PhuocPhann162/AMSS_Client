import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { GetUsersRequest, UpdateAddressRequest } from '@/models/request';
import {
  BooleanResponse,
  GetUsersResponse,
  PaginationResponse,
} from '@/models/response';

export const userApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (params: GetUsersRequest) => ({
        url: 'user/customers',
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TYPES.Users],
      transformResponse(apiResponse: {
        result: PaginationResponse<GetUsersResponse>;
      }) {
        return {
          apiResponse,
        };
      },
    }),
    lockUnLockUser: builder.mutation({
      query: (id) => ({
        url: `user/lockUnlock/${id}`,
        method: 'POST',
        body: id,
      }),
      invalidatesTags: [TAG_TYPES.Users],
    }),
    roleManagement: builder.mutation({
      query: ({ userId, role }) => ({
        url: `user/updateRole/${userId}`,
        method: 'POST',
        body: role,
      }),
      invalidatesTags: [TAG_TYPES.Users],
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
      invalidatesTags: [TAG_TYPES.Users],
    }),
    updateAddress: builder.mutation<BooleanResponse, UpdateAddressRequest>({
      query: (payload) => ({
        url: `user/address`,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: payload,
      }),
      invalidatesTags: [TAG_TYPES.Users],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useLockUnLockUserMutation,
  useRoleManagementMutation,
  useUpdateInfoMutation,
  useUpdateAddressMutation,
} = userApi;
