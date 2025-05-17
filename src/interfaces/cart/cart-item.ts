import { type Commodity } from '@/interfaces/commodity';

export interface CartItem {
  id: string;
  quantity: number;
  shoppingCartId: string;
  commodity: Commodity;
}
