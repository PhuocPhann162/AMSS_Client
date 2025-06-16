import { appBaseApi } from '@/api/instances';
import type { CreateCareLogRequest } from '@/models/request/care-log/create-care-log-request';
import type { GetCareLogsRequest } from '@/models/request/care-log/get-care-logs-request';
import type { GetCareLogsResponse } from '@/models/response/care-log/get-care-logs-response';

export const careLogApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCareLogs: builder.query<GetCareLogsResponse, GetCareLogsRequest>({
      query: () => ({
        url: 'care-process',
        method: 'GET',
      }),
    }),
    createCareLog: builder.mutation<unknown, CreateCareLogRequest>({
      query: (args) => ({
        url: 'care-process',
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const { useGetCareLogsQuery, useCreateCareLogMutation } = careLogApi;
