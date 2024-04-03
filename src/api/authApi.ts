import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7213/api/',
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.get('token');
      token && headers.append('Authorization', 'Bearer ' + token);
    }
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: userData
      })
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/login',
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: userData
      })
    })
  })
});

export default authApi;
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
