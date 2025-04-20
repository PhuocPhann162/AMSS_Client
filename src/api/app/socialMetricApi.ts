import { appBaseApi, TAG_TYPES } from '@/api/app';

export const socialMetricApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSocialMetrics: builder.query({
      query: (request) => ({
        url: 'socialMetric/getByCode',
        method: 'GET',
        params: request,
      }),
      providesTags: [TAG_TYPES.SocialMetrics],
    }),
    importDataSocialMetric: builder.mutation({
      query: (data) => ({
        url: 'socialMetric/importData',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.SocialMetrics],
    }),
  }),
});

export const {
  useGetAllSocialMetricsQuery,
  useImportDataSocialMetricMutation,
} = socialMetricApi;
