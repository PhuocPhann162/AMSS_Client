import type { ApiResponse, OrderHeader } from '@/interfaces';
import type { PaginationResponse } from '@/models/response/paginationResponse';

export type GetOrdersResponse = ApiResponse<
  PaginationResponse<
    Pick<
      OrderHeader,
      | 'pickupName'
      | 'pickupPhoneNumber'
      | 'pickupEmail'
      | 'orderTotal'
      | 'discountAmount'
      | 'status'
      | 'totalItems'
    > & {
      id: string;
      orderDate: string;
    }
  >
>;
