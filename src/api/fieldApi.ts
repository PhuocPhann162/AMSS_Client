import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { CreateFieldRequest } from '@/models';
import { BooleanResponse } from '@/models/response/boolean-response';

export const fieldApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFields: builder.query({
      query: ({ searchString, status, pageNumber, pageSize }) => ({
        url: 'field/getAll',
        method: 'GET',
        params: {
          ...(searchString && { searchString }),
          ...(status && { status }),
          ...(pageNumber && { pageNumber }),
          ...(pageSize && { pageSize }),
        },
      }),
      transformResponse(apiResponse: { result: any }, meta: any) {
        return {
          apiResponse,
          totalRecords: meta.response.headers.get('X-Pagination'),
        };
      },
      providesTags: [TAG_TYPES.Fields],
    }),
    getFieldById: builder.query({
      query: (id) => ({
        url: `field/getFieldById/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Fields],
    }),
    createField: builder.mutation<BooleanResponse, CreateFieldRequest>({
      query: (data) => ({
        url: 'field',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Fields],
    }),
    updateField: builder.mutation({
      query: ({ id, data }) => ({
        url: `field/${id}`,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      }),
      invalidatesTags: [TAG_TYPES.Fields],
    }),
    deleteField: builder.mutation({
      query: (id) => ({
        url: `field/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPES.Fields],
    }),
  }),
});

export const {
  useGetAllFieldsQuery,
  useGetFieldByIdQuery,
  useCreateFieldMutation,
  useUpdateFieldMutation,
  useDeleteFieldMutation,
} = fieldApi;
