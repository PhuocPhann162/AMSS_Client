import {
  type GetCountriesResponse,
  type GetProvincesResponse,
} from '@/api/meta-data-api/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const metaDataApi = createApi({
  reducerPath: 'metaDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['MetaDatas'],
  endpoints: (builder) => ({
    getCountries: builder.query<GetCountriesResponse, void>({
      query: () => ({
        url: 'meta-data/countries',
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      providesTags: ['MetaDatas'],
    }),
    getProvinces: builder.query<GetProvincesResponse, void>({
      query: () => ({
        url: 'meta-data/provinces',
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      providesTags: ['MetaDatas'],
    }),
  }),
});

export const { useGetCountriesQuery, useGetProvincesQuery } = metaDataApi;
