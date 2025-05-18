import { type ApiResponse, type Commodity } from '@/interfaces';
import { type PaginationResponse } from '@/models/response/paginationResponse';

export type GetCommoditiesResponse = PaginationResponse<Commodity>;

export type GetCommodityByIdResponse = ApiResponse<Commodity>;
