import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '~/helper';

const fieldApi = createApi({
  reducerPath: 'fieldApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Fields'],
  endpoints: (builder) => ({
    getAllFields: builder.query({
      query: ({ searchString, status, pageNumber, pageSize }) => ({
        url: 'field/getAll',
        method: 'GET',
        params: {
          ...(searchString && { searchString }),
          ...(status && { status }),
          ...(pageNumber && { pageNumber }),
          ...(pageSize && { pageSize })
        }
      }),
      transformResponse(apiResponse: { result: any }, meta: any) {
        return {
          apiResponse,
          totalRecords: meta.response.headers.get('X-Pagination')
        };
      },
      providesTags: ['Fields']
    }),
    getFieldById: builder.query({
      query: (id) => ({
        url: `field/getFieldById/${id}`,
        method: 'GET'
      }),
      providesTags: ['Fields']
    }),
    createField: builder.mutation({
      query: (data) => ({
        url: 'field',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Fields']
    }),
    updateField: builder.mutation({
      query: ({ id, status, data }) => ({
        url: `field/${id}`,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ status, ...data })
      }),
      invalidatesTags: ['Fields']
    }),
    deleteField: builder.mutation({
      query: (id) => ({
        url: `field/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Fields']
    })
  }),
  refetchOnReconnect: true
});

export default fieldApi;
export const {
  useGetAllFieldsQuery,
  useGetFieldByIdQuery,
  useCreateFieldMutation,
  useUpdateFieldMutation,
  useDeleteFieldMutation
} = fieldApi;
