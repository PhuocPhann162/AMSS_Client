import { ApiResponse } from '@/interfaces/apiResponse';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BooleanResponse
  extends ApiResponse<{
    success: boolean;
  }> {}
