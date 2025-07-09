import { type ApiResponse, type Commodity } from '@/interfaces';

export interface CommodityDetailResponse
  extends Pick<
    Commodity,
    | 'id'
    | 'name'
    | 'description'
    | 'specialTag'
    | 'category'
    | 'price'
    | 'image'
    | 'expirationDate'
    | 'status'
    | 'supplier'
    | 'crop'
  > {
  cropName: string;
}

export type GetCommodityDetailResponse = ApiResponse<CommodityDetailResponse>;
