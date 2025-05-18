import type { Commodity, CommodityCategory } from '@/interfaces/commodity';

export interface CartItem {
  id: string;
  quantity: number;
  commodityName: Commodity['name'];
  price: Commodity['price'];
  commodityImage: Commodity['image'];
  commodityCategory: CommodityCategory;
  commodityId: Commodity['id'];
}
