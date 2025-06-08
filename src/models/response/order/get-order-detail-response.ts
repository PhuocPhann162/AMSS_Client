import type { ApiResponse, locationModel, OrderHeader } from '@/interfaces';

export type GetOrderDetailResponse = ApiResponse<
  Pick<
    OrderHeader,
    | 'pickupName'
    | 'pickupPhoneNumber'
    | 'pickupEmail'
    | 'orderTotal'
    | 'couponCode'
    | 'discountAmount'
    | 'orderDate'
    | 'status'
    | 'totalItems'
    | 'orderDetails'
  > & {
    location: locationModel & { createdAt: string };
  }
>;
