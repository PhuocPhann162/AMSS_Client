import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '~/hooks';

const cropApi = createApi({
  reducerPath: 'cropApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Crops'],
  endpoints: (builder) => ({
    getCropById: builder.query({
      query: (id) => ({
        url: `crop/getCropById/${id}`,
        method: 'GET'
      }),
      providesTags: ['Crops']
    })
  })
});

export default cropApi;
export const { useGetCropByIdQuery } = cropApi;
