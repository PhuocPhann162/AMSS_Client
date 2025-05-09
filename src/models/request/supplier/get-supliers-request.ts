import { Role } from '@/interfaces';
import { PaginationRequest } from '../paginationRequest';

export interface GetSuppliersRequest extends PaginationRequest {
  countryCodes?: string[];
  supplierRole: Role;
}
