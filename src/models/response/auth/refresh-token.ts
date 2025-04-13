import { tokenModel } from '@/interfaces';
import { ApiResponse } from '@/interfaces/apiResponse';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RefreshTokenResponse
  extends ApiResponse<{
    token: tokenModel;
  }> {}
