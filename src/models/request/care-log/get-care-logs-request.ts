import type { CareLog } from '@/interfaces/care-log/care-log';
import type { PaginationRequest } from '@/models/request/paginationRequest';

export const GET_CARE_LOGS_ORDER_BY = {
  date: 'date',
  createdAt: 'createdAt',
} as const satisfies Partial<Record<keyof CareLog, keyof CareLog>>;

export type GetCareLogsOrderBy = keyof typeof GET_CARE_LOGS_ORDER_BY;

export type GetCareLogsRequest = Partial<PaginationRequest<GetCareLogsOrderBy>>;
