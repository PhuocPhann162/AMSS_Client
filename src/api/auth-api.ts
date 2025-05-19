import { appBaseApi } from '@/api/instances';
import { convertStringToRole } from '@/interfaces';
import type {
  LoginRequest,
  LoginResponse,
  LoginResponseRaw,
  RegisterResponse,
  RegisterSupplier,
} from '@/models';

export const authApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterSupplier>({
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
      transformResponse(apiResponse: LoginResponseRaw) {
        return {
          ...apiResponse,
          result: {
            ...apiResponse.result,
            user: {
              ...apiResponse.result.user,
              role: convertStringToRole(apiResponse.result.user.role),
            },
          },
        };
      },
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
