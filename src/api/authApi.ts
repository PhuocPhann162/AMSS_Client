import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenModel } from '~/interfaces';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7213/api/',
    prepareHeaders: (headers: Headers, api) => {
      const token: tokenModel = JSON.parse(localStorage.getItem('token') ?? '');
      token?.accessToken && headers.append('Authorization', 'Bearer ' + token.accessToken);
    }
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: userData
      })
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: 'auth/login',
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: userCredentials
      })
    })
  })
});

export default authApi;
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
