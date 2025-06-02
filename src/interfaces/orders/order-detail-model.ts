import { Commodity } from '../commodity';

export interface OrderDetail {
  orderDetailId?: string;
  orderHeaderId?: string;
  commodityId?: string;
  commodity?: Commodity;
  quantity?: number;
  itemName?: string;
  price?: number;
}
