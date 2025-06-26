import { OrderStatus } from '@/interfaces';

export interface UpdateOrderRequest {
  orderId: string;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  status?: OrderStatus;
}
