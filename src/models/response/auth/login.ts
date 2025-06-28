import { tokenModel, User } from '@/interfaces';
import { ApiResponse } from '@/interfaces/apiResponse';
import type { ROLE } from '@/interfaces/role/role';

type LoginResponseBase<T> = ApiResponse<{
  user: T;
  token: tokenModel;
}>;

export type LoginResponse = LoginResponseBase<User>;

export type LoginResponseRaw = LoginResponseBase<
  Omit<User, 'role'> & {
    role: keyof typeof ROLE;
  }
>;
