import { appBaseApi, TAG_TYPES } from '@/api/instances';
import type { GetCountriesResponse, GetProvincesResponse } from '@/models';

export const metaDataApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<GetCountriesResponse, void>({
      query: () => ({
        url: 'meta-data/countries',
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      providesTags: [TAG_TYPES.MetaDatas],
    }),
    getProvinces: builder.query<GetProvincesResponse, void>({
      query: () => ({
        url: 'meta-data/provinces',
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }),
      providesTags: [TAG_TYPES.MetaDatas],
    }),
  }),
});

export const { useGetCountriesQuery, useGetProvincesQuery } = metaDataApi;
