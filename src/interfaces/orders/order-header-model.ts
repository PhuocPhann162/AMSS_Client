import type locationModel from '@/interfaces/locationModel';
import type { OrderDetail } from '@/interfaces/orders/order-detail-model';
import type { User } from '@/interfaces/user/user';

export enum OrderStatus {
  Pending,
  Confirmed,
  Processing,
  ReadyForShipment,
  Delivered,
  Completed,
  Cancelled,
}

export type OrderStatusKey = keyof typeof OrderStatus;

export interface OrderHeader {
  id: string;
  applicationUserId?: string;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  orderTotal?: number;
  couponCode?: string;
  discountAmount?: number;
  orderDate?: string;
  stripePaymentIntentID?: string;
  status?: OrderStatus;
  totalItems?: number;
  locationId?: string;
  location?: locationModel;
  applicationUser?: User;
  orderDetails?: OrderDetail[];
}
