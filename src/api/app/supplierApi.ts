import { appBaseApi, TAG_TYPES } from '@/api/app';
import { GetSuppliersRequest } from '@/models/request';
import { GetSuppliersResponse, PaginationResponse } from '@/models/response';

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
  }),
});

export const { useGetSeedCropSuppliersQuery } = supplierApi;
