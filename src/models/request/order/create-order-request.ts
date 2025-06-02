import { OrderDetail, OrderStatus } from '@/interfaces';

export interface CreateOrderRequest {
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  orderTotal?: number;
  totalItems?: number;
  discountAmount?: number;
  couponCode?: string;
  applicationUserId?: string;
  stripePaymentIntentID?: string;
  status?: OrderStatus;
  orderDetails?: OrderDetail[];
}
