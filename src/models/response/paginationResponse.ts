export interface PaginationResponse<T> {
  collection?: Array<T> | null;
  currentPage?: number;
  limit?: number;
  totalRow?: number;
  totalPage?: number;
}
