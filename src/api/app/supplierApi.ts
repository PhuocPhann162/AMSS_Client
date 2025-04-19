import { authAppApi } from '@/api/app';
import { GetSuppliersRequest } from '@/models/request';
import { GetSuppliersResponse, PaginationResponse } from '@/models/response';

export const supplierApi = authAppApi.injectEndpoints({
  endpoints: (builder) => ({
    getSeedCropSuppliers: builder.query({
      query: (params: GetSuppliersRequest) => ({
        url: `suppliers/seed-crop`,
        method: 'GET',
        params,
      }),
      providesTags: ['Suppliers'],
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
