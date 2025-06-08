import type { OrderHeader, OrderStatus } from '@/interfaces';
import type { PaginationRequest } from '@/models/request/paginationRequest';

export const GET_ORDERS_ORDER_BY = {
  pickupName: 'pickupName',
  orderTotal: 'orderTotal',
  orderDate: 'orderDate',
} as const satisfies Partial<Record<keyof OrderHeader, string>>;

export type GetOrdersOrderBy =
  (typeof GET_ORDERS_ORDER_BY)[keyof typeof GET_ORDERS_ORDER_BY];

export interface GetOrdersRequest
  extends Partial<PaginationRequest<GetOrdersOrderBy>> {
  statuses?: OrderStatus[];
}
