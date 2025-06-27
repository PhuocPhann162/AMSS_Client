import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { GetReportRequest } from '@/models/request/reports/get-report-request';
import { GetReportResponse } from '@/models/response/reports/get-report-response';

export const reportApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getRevenue: build.query<GetReportResponse, GetReportRequest>({
      query: () => 'reports/revenue',
      providesTags: [TAG_TYPES.Reports],
    }),
    getOrderStatistic: build.query<GetReportResponse, GetReportRequest>({
      query: () => 'reports/orders-statistic',
      providesTags: [TAG_TYPES.Reports],
    }),
  }),
});

export const { useGetRevenueQuery, useGetOrderStatisticQuery } = reportApi;
