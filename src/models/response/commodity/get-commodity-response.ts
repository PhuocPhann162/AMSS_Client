import { type ApiResponse, type Commodity } from '@/interfaces';
import { type PaginationResponse } from '@/models/response/paginationResponse';

export interface CommodityResponse
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
    | 'supplierId'
    | 'cropId'
  > {
  cropName: string;
  supplierName: string;
}

export type GetCommoditiesResponse = ApiResponse<
  PaginationResponse<CommodityResponse>
>;
