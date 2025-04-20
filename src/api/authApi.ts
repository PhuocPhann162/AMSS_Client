import { appBaseApi } from '@/api/instances';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/models';

export const authApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (userCredentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: userCredentials,
      }),
    }),
    // TODO: remove this endpoint
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: 'auth/refreshToken',
        method: 'POST',
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
