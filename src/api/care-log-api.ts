import { appBaseApi, TAG_TYPES } from '@/api/instances';
import type { CreateCareLogRequest } from '@/models/request/care-log/create-care-log-request';
import type { GetCareLogsRequest } from '@/models/request/care-log/get-care-logs-request';
import type { GetCareLogsResponse } from '@/models/response/care-log/get-care-logs-response';

export const careLogApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCareLogs: builder.query<GetCareLogsResponse, GetCareLogsRequest>({
      query: (props) => ({
        url: 'care-logs',
        method: 'GET',
        params: props,
      }),
      providesTags: [TAG_TYPES.CareLogs],
    }),
    createCareLog: builder.mutation<unknown, CreateCareLogRequest>({
      query: (props) => ({
        url: 'care-logs',
        method: 'POST',
        body: props,
      }),
      invalidatesTags: [TAG_TYPES.CareLogs],
    }),
  }),
});

export const { useGetCareLogsQuery, useCreateCareLogMutation } = careLogApi;
