import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/hooks';
import { GetSuppliersRequest } from '@/models/request';
import { GetSuppliersResponse, PaginationResponse } from '@/models/response';

const supplierApi = createApi({
  reducerPath: 'supplierApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Suppliers'],
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

export default supplierApi;
export const { useGetSeedCropSuppliersQuery } = supplierApi;
