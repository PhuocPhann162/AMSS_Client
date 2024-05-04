import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '~/hooks';

const farmApi = createApi({
  reducerPath: 'farmApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Farms'],
  endpoints: (builder) => ({
    getAllFarms: builder.query({
      query: ({ searchString, pageNumber, pageSize }) => ({
        url: 'farm/getAll',
        method: 'GET',
        params: {
          ...(searchString && { searchString }),
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
      providesTags: ['Farms']
    }),
    getFarmById: builder.query({
      query: (id) => ({
        url: `farm/getFarmById/${id}`,
        method: 'GET'
      }),
      providesTags: ['Farms']
    }),
    createFarm: builder.mutation({
      query: (data) => ({
        url: 'farm',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Farms']
    }),
    updateFarm: builder.mutation({
      query: ({ id, data }) => ({
        url: `farm/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Farms']
    }),
    deleteFarm: builder.mutation({
      query: (id) => ({
        url: `farm/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Farms']
    })
  }),
  refetchOnReconnect: true
});

export default farmApi;
export const {
  useGetAllFarmsQuery,
  useGetFarmByIdQuery,
  useCreateFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation
} = farmApi;
