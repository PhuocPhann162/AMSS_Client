import { authAppApi } from '@/api/app';

export const cropApi = authAppApi.injectEndpoints({
  endpoints: (builder) => ({
    getCropById: builder.query({
      query: (id) => ({
        url: `crop/getCropById/${id}`,
        method: 'GET',
      }),
      providesTags: ['Crops'],
    }),
    getCropsByFieldId: builder.query({
      query: (fieldId) => ({
        url: 'crop/getAllByFieldId/' + fieldId,
        method: 'GET',
      }),
      providesTags: ['Crops'],
    }),
    createCrop: builder.mutation({
      query: (crop) => ({
        url: 'crop',
        method: 'POST',
        body: crop,
      }),
      invalidatesTags: ['Crops'],
    }),
    updateCrop: builder.mutation({
      query: ({ id, crop }) => ({
        url: 'crop/' + id,
        method: 'PUT',
        body: crop,
      }),
      invalidatesTags: ['Crops'],
    }),
  }),
});

export const {
  useGetCropByIdQuery,
  useGetCropsByFieldIdQuery,
  useCreateCropMutation,
  useUpdateCropMutation,
} = cropApi;
