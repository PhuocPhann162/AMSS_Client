import { authAppApi } from '@/api/app';

export const socialMetricApi = authAppApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSocialMetrics: builder.query({
      query: (request) => ({
        url: 'socialMetric/getByCode',
        method: 'GET',
        params: request,
      }),
      providesTags: ['SocialMetrics'],
    }),
    importDataSocialMetric: builder.mutation({
      query: (data) => ({
        url: 'socialMetric/importData',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SocialMetrics'],
    }),
  }),
});

export const {
  useGetAllSocialMetricsQuery,
  useImportDataSocialMetricMutation,
} = socialMetricApi;
