import { type cropModel } from '@/interfaces';
import type { PaginationResponse } from '@/models/response/paginationResponse';

export type GetCropsBySupplierResponse = PaginationResponse<cropModel>;
