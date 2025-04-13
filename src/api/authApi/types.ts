import { type ApiResponse } from '@/interfaces/apiResponse';
import { type Role } from '@/interfaces/role';
import type tokenModel from '@/interfaces/tokenModel';
import { type User } from '@/interfaces/user';

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  fullName: string;
  password: string;
  repeatPassword: string;
  phoneCode: string;
  phoneNumber: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  provinceCode: string;
  avatar: string;
  role?: Role;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RegisterResponse
  extends ApiResponse<{
    success: boolean;
  }> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginResponse
  extends ApiResponse<{
    user: User;
    token: tokenModel;
  }> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RefreshTokenResponse
  extends ApiResponse<{
    token: tokenModel;
  }> {}
