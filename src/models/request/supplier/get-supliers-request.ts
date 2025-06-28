import type { Role } from '@/interfaces/role/role';
import type { PaginationRequest } from '@/models/request/paginationRequest';

export interface GetSuppliersRequest extends PaginationRequest {
  countryCodes?: string[];
  supplierRole: Role;
}
