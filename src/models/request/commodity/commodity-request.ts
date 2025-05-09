import { CommodityCategory } from '@/interfaces';
import { type CommodityOrderBy } from '@/models/request/commodity/commodity-order-by';
import { type PaginationRequest } from '@/models/request/paginationRequest';

export interface GetCommoditiesRequest
  extends Partial<PaginationRequest<CommodityOrderBy>> {
  categories?: CommodityCategory[];
}

export interface GetCommodityByIdRequest {
  id: string;
}
