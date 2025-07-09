import type { CommodityCategoryV2 } from '@/interfaces/commodity/commodity-category-v2';
import type { CommodityStatusV2 } from '@/interfaces/commodity/commodity-status-v2';

export interface CreateCommodityRequest {
  name: string;
  description: string;
  specialTag?: string;
  category: CommodityCategoryV2;
  price: number;
  image: string;
  expirationDate?: string;
  status: CommodityStatusV2;
  supplierId: string;
  cropId: string;
}
