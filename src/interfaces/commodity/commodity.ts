import { CommodityCategory } from '@/interfaces/commodity/commodity-category';
import { type CommodityStatus } from '@/interfaces/commodity/commodity-status';

export interface Commodity {
  id: string;
  name: string;
  description: string;
  specialTag: string;
  category: CommodityCategory;
  price: number;
  image: string;
  expirationDate?: string;
  status: CommodityStatus;
  supplierId: string;
  cropId: string;
  createdAt: string;
  updatedAt: string;
}
