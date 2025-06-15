import type { CareLog } from '@/interfaces/care-log';
import type { PaginationResponse } from '@/models/response/paginationResponse';

export type GetCareLogsResponse = PaginationResponse<CareLog>;
