import { appBaseApi, TAG_TYPES } from '@/api/instances';
import type { GetCartResponse } from '@/models/response/cart/cart-response';

export const logisticsApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getLogistics: build.query<GetCartResponse, void>({
      query: () => 'logistics',
      providesTags: [TAG_TYPES.Logistics],
    }),
  }),
});

export const { useGetLogisticsQuery } = logisticsApi;
