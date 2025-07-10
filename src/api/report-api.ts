import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { ApiResponse } from '@/interfaces';
import {
  GetReportRequest,
  GetTotalStatisticRequest,
} from '@/models/request/reports/get-report-request';
import {
  GetReportResponse,
  GetTotalStatisticResponse,
} from '@/models/response/reports/get-report-response';

export const reportApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getRevenue: build.query<ApiResponse<GetReportResponse>, GetReportRequest>({
      query: (request) => ({
        url: 'reports/revenue',
        method: 'GET',
        params: {
          ...(request.type && { type: request.type }),
          ...(request.year && { year: request.year }),
          ...(request.endYear && { endYear: request.endYear }),
          ...(request.month && { month: request.month }),
        },
      }),
      providesTags: [TAG_TYPES.Reports],
    }),
    getOrderStatistic: build.query<
      ApiResponse<GetReportResponse>,
      GetReportRequest
    >({
      query: () => 'reports/orders-statistic',
      providesTags: [TAG_TYPES.Reports],
    }),
    getTotalStatistic: build.query<
      ApiResponse<GetTotalStatisticResponse>,
      GetTotalStatisticRequest
    >({
      query: () => 'reports/total-statistic',
      providesTags: [TAG_TYPES.Reports],
    }),
  }),
});

export const {
  useGetRevenueQuery,
  useGetOrderStatisticQuery,
  useGetTotalStatisticQuery,
} = reportApi;
