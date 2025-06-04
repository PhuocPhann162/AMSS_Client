import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { CreateOrderRequest, GuidResponse } from '@/models';

export const orderApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<GuidResponse, CreateOrderRequest>({
      query: (data) => ({
        url: 'orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Orders],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
