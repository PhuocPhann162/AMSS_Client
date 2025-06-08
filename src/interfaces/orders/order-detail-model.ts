import { Commodity } from '../commodity';

export interface OrderDetail {
  id?: string;
  orderHeaderId?: string;
  commodityId?: string;
  quantity?: number;
  itemName?: string;
  price?: number;
  commodity?: Commodity;
}
