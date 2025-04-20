import { appBaseApi, TAG_TYPES } from '@/api/app-api';

export const farmApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFarms: builder.query({
      query: ({ searchString, pageNumber, pageSize }) => ({
        url: 'farm/getAll',
        method: 'GET',
        params: {
          ...(searchString && { searchString }),
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
      providesTags: [TAG_TYPES.Farms],
    }),
    getFarmById: builder.query({
      query: (id) => ({
        url: `farm/getFarmById/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Farms],
    }),
    createFarm: builder.mutation({
      query: (data) => ({
        url: 'farm',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Farms],
    }),
    updateFarm: builder.mutation({
      query: ({ id, data }) => ({
        url: `farm/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Farms],
    }),
    deleteFarm: builder.mutation({
      query: (id) => ({
        url: `farm/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPES.Farms],
    }),
  }),
});

export const {
  useGetAllFarmsQuery,
  useGetFarmByIdQuery,
  useCreateFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = farmApi;
