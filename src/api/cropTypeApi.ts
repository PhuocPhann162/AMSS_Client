import { appBaseApi, TAG_TYPES } from '@/api/app-api';

export const cropTypeApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCropTypes: builder.query({
      query: ({ searchString, pageNumber, pageSize }) => ({
        url: 'cropType/getAllCropTypes',
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
      providesTags: [TAG_TYPES.CropTypes],
    }),
    createCropType: builder.mutation({
      query: (cropType) => ({
        url: 'cropType',
        method: 'POST',
        body: cropType,
      }),
      invalidatesTags: [TAG_TYPES.CropTypes],
    }),
  }),
});

export const { useGetAllCropTypesQuery, useCreateCropTypeMutation } =
  cropTypeApi;
