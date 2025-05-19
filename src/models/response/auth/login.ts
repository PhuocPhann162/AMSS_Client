import { tokenModel, User, type Role } from '@/interfaces';
import { ApiResponse } from '@/interfaces/apiResponse';

type LoginResponseBase<T> = ApiResponse<{
  user: T;
  token: tokenModel;
}>;

export type LoginResponse = LoginResponseBase<User>;

export type LoginResponseRaw = LoginResponseBase<
  Omit<User, 'role'> & {
    role: keyof typeof Role;
  }
>;
