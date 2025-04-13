export enum ListSortDirection {
  Ascending,
  Descending,
}

export interface PaginationRequest {
  orderBy: string;
  orderByDirection: ListSortDirection;
  currentPage: number;
  limit: number;
  search: string;
}
