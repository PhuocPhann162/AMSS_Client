import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { CreateOrderRequest, GuidResponse } from '@/models';
import type { GetOrderDetailRequest } from '@/models/request/order/getOrderDetailRequest';
import type { GetOrdersRequest } from '@/models/request/order/getOrdersRequest';
import type { GetOrderDetailResponse } from '@/models/response/order/getOrderDetailResponse';
import type { GetOrdersResponse } from '@/models/response/order/getOrdersResponse';

export const orderApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<GetOrdersResponse, GetOrdersRequest>({
      query: () => 'orders',
      providesTags: [TAG_TYPES.Orders],
    }),
    getOrderDetail: build.query<GetOrderDetailResponse, GetOrderDetailRequest>({
      query: (props) => ({
        url: `orders/${props.id}`,
        method: 'GET',
      }),
      providesTags: (_, __, props) => [
        { type: TAG_TYPES.Orders, id: props.id },
      ],
    }),
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

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderDetailQuery,
} = orderApi;
