import { User } from '../user';
import { OrderDetail } from './order-detail-model';

export enum OrderStatus {
  Pending,
  Confirmed,
  Processing,
  ReadyForShipment,
  Delivered,
  Completed,
  Cancelled,
}

export interface OrderHeader {
  orderHeaderId?: string;
  pickupName?: string;
  pickupEmail?: string;
  pickupPhoneNumber?: string;
  applicationUserId?: string;
  couponCode?: string;
  discountAmount?: number;
  user?: User;
  orderTotal?: number;
  orderDate?: Date;
  stripePaymentIntentID?: string;
  status?: string;
  totalItems?: number;
  orderDetails?: OrderDetail[];
}
