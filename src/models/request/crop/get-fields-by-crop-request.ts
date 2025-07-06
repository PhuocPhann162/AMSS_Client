import type { PaginationRequest } from '@/models/request/paginationRequest';

export interface GetFieldsByCropRequest extends Partial<PaginationRequest> {
  cropId: string;
}
