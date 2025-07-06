import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { Role } from '@/interfaces/role/role';
import { GetSuppliersRequest } from '@/models/request';
import {
  GetSelectionSuppliersByRoleApiResponse,
  GetSuppliersResponse,
  PaginationResponse,
} from '@/models/response';

export const supplierApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSeedCropSuppliers: builder.query({
      query: (params: GetSuppliersRequest) => ({
        url: `suppliers/seed-crop`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TYPES.Suppliers],
      transformResponse(apiResponse: {
        result: PaginationResponse<GetSuppliersResponse>;
      }) {
        return {
          apiResponse,
        };
      },
    }),
    getSuppliersByRole: builder.query<
      GetSelectionSuppliersByRoleApiResponse,
      Role
    >({
      query: (role: Role) => ({
        url: `suppliers/by-role`,
        method: 'GET',
        params: { role },
      }),
      providesTags: [TAG_TYPES.Suppliers],
    }),
  }),
});

export const { useGetSeedCropSuppliersQuery, useGetSuppliersByRoleQuery } =
  supplierApi;
