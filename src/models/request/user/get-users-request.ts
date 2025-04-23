import { PaginationRequest } from '../paginationRequest';

export interface GetUsersRequest extends PaginationRequest {
  countryCodes?: string[];
}
