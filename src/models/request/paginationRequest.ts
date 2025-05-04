export enum ListSortDirection {
  Ascending,
  Descending,
}

export interface PaginationRequest<T = string> {
  orderBy: T;
  orderByDirection: ListSortDirection;
  currentPage: number;
  limit: number;
  search: string;
}
