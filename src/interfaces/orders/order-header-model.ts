import type locationModel from '@/interfaces/locationModel';
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

export type OrderStatusKey = keyof typeof OrderStatus;

export interface OrderHeader {
  id?: string;
  applicationUserId?: string;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  orderTotal?: number;
  couponCode?: string;
  discountAmount?: number;
  orderDate?: string;
  stripePaymentIntentID?: string;
  status?: OrderStatusKey;
  totalItems?: number;
  locationId?: string;
  location?: locationModel;
  applicationUser?: User;
  orderDetails?: OrderDetail[];
}
