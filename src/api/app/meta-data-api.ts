import { authAppApi } from '@/api/app';
import type { GetCountriesResponse, GetProvincesResponse } from '@/models';

export const metaDataApi = authAppApi.injectEndpoints({
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
