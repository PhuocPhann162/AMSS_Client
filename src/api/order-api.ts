import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { CreateOrderRequest, GuidResponse } from '@/models';
import type { GetOrderDetailRequest } from '@/models/request/order/get-order-detail-request';
import type { GetOrdersRequest } from '@/models/request/order/get-orders-request';
import type { GetOrderDetailResponse } from '@/models/response/order/get-order-detail-response';
import type { GetOrdersResponse } from '@/models/response/order/get-orders-response';

export const orderApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<GetOrdersResponse, GetOrdersRequest>({
      query: (props) => ({
        url: 'orders',
        params: props,
        method: 'GET',
      }),
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
