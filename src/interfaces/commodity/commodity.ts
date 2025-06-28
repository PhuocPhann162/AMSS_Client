import type { CommodityCategoryV2 } from '@/interfaces/commodity/commodity-category-v2';
import type { CommodityStatusV2 } from '@/interfaces/commodity/commodity-status-v2';
import type cropModel from '@/interfaces/cropModel';
import type { Supplier } from '@/interfaces/supplier/supplier';

export interface Commodity {
  id: string;
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
  supplier?: Supplier;
  crop?: cropModel;
  cropName: string;
  createdAt: string;
  updatedAt: string;
}
