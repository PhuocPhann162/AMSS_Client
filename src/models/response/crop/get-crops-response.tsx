import type { ApiResponse, cropModel } from '@/interfaces';
import type { PaginationResponse } from '@/models/response/paginationResponse';

export type GetCropsResponse = ApiResponse<PaginationResponse<cropModel>>;
