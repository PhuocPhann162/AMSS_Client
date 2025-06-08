import type { ApiResponse, OrderHeader } from '@/interfaces';
import type { PaginationResponse } from '@/models/response/paginationResponse';

export type GetOrdersResponse = ApiResponse<
  PaginationResponse<
    Pick<
      OrderHeader,
      | 'id'
      | 'pickupName'
      | 'pickupPhoneNumber'
      | 'pickupEmail'
      | 'orderTotal'
      | 'discountAmount'
      | 'orderDate'
      | 'status'
      | 'totalItems'
    >
  >
>;
