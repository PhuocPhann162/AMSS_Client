import { type ApiResponse, type Commodity } from '@/interfaces';
import { type PaginationResponse } from '@/models/response/paginationResponse';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetCommoditiesResponse extends PaginationResponse<Commodity> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetCommodityByIdResponse extends ApiResponse<Commodity> {}
