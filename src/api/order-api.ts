import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { BooleanResponse, CreateOrderRequest } from '@/models';

export const orderApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<BooleanResponse, CreateOrderRequest>({
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
