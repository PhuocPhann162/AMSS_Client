import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/hooks';

const socialMetricApi = createApi({
  reducerPath: 'socialMetricApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['SocialMetrics'],
  endpoints: (builder) => ({
    getAllSocialMetrics: builder.query({
      query: (request) => ({
        url: 'socialMetric/getByCode',
        method: 'GET',
        params: request
      }),
      providesTags: ['SocialMetrics']
    }),
    importDataSocialMetric: builder.mutation({
      query: (data) => ({
        url: 'socialMetric/importData',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['SocialMetrics']
    })
  }),
  refetchOnReconnect: true
});

export default socialMetricApi;
export const { useGetAllSocialMetricsQuery, useImportDataSocialMetricMutation } = socialMetricApi;
