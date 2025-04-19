import { appApi } from '@/api/app';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/models';

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (userCredentials) => ({
        url: 'auth/login',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: userCredentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: 'auth/refreshToken',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: refreshToken,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
} = authApi;
