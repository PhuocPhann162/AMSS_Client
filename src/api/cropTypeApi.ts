import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/hooks';

const cropTypeApi = createApi({
  reducerPath: 'cropTypeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['CropTypes'],
  endpoints: (builder) => ({
    getAllCropTypes: builder.query({
      query: ({ searchString, pageNumber, pageSize }) => ({
        url: 'cropType/getAllCropTypes',
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
      providesTags: ['CropTypes']
    }),
    createCropType: builder.mutation({
      query: (cropType) => ({
        url: 'cropType',
        method: 'POST',
        body: cropType
      }),
      invalidatesTags: ['CropTypes']
    })
  })
});

export default cropTypeApi;
export const { useGetAllCropTypesQuery, useCreateCropTypeMutation } = cropTypeApi;
