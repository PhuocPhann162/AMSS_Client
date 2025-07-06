import type { ApiResponse } from '@/interfaces';
import type { CareLog } from '@/interfaces/care-log/care-log';
import type { PaginationResponse } from '@/models/response/paginationResponse';

export type GetCareLogsResponse = ApiResponse<PaginationResponse<CareLog>>;
