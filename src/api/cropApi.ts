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
    }),
    getCropsByFieldId: builder.query({
      query: (fieldId) => ({
        url: 'crop/getAllByFieldId/' + fieldId,
        method: 'GET'
      }),
      providesTags: ['Crops']
    }),
    createCrop: builder.mutation({
      query: (crop) => ({
        url: 'crop',
        method: 'POST',
        body: crop
      }),
      invalidatesTags: ['Crops']
    })
  })
});

export default cropApi;
export const { useGetCropByIdQuery, useGetCropsByFieldIdQuery, useCreateCropMutation } = cropApi;
