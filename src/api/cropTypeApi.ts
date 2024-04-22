import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '~/helper';

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
    })
  })
});

export default cropTypeApi;
export const { useGetAllCropTypesQuery } = cropTypeApi;
