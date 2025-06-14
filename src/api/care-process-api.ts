import { appBaseApi } from '@/api/instances';
import type { CreateCareProcessRequest } from '@/models/request/care-process/create-care-process-request';

export const careProcessApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCareProcess: builder.mutation<unknown, CreateCareProcessRequest>({
      query: (args) => ({
        url: 'care-process',
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const { useCreateCareProcessMutation } = careProcessApi;
