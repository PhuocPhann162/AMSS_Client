import type { ApiResponse, fieldModel } from '@/interfaces';
import type { PaginationResponse } from '@/models/response/paginationResponse';

export type GetFieldsByCropResponse = ApiResponse<
  PaginationResponse<fieldModel>
>;
