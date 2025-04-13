import { tokenModel, User } from '@/interfaces';
import { ApiResponse } from '@/interfaces/apiResponse';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginResponse
  extends ApiResponse<{
    user: User;
    token: tokenModel;
  }> {}
