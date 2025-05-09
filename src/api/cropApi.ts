import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { PaginationRequest, PaginationResponse } from '@/models';
import { CropResponse } from '@/models/response/crop-response';

export const cropApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCropById: builder.query({
      query: (id) => ({
        url: `crop/getCropById/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Crops],
    }),
    getCropsByFieldId: builder.query({
      query: (fieldId) => ({
        url: 'crop/getAllByFieldId/' + fieldId,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Crops],
    }),
    getCrops: builder.query({
      query: (params: PaginationRequest) => ({
        url: 'crop/get-all',
        method: 'GET',
        params,
      }),
      providesTags: [TAG_TYPES.Crops],
      transformResponse(apiResponse: {
        result: PaginationResponse<CropResponse>;
      }) {
        return {
          apiResponse,
        };
      },
    }),
    addCropPlating: builder.mutation({
      query: (data) => ({
        url: 'crop/planting-crop',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Crops],
    }),
    createCrop: builder.mutation({
      query: (crop) => ({
        url: 'crop',
        method: 'POST',
        body: crop,
      }),
      invalidatesTags: [TAG_TYPES.Crops],
    }),
    updateCrop: builder.mutation({
      query: ({ id, crop }) => ({
        url: 'crop/' + id,
        method: 'PUT',
        body: crop,
      }),
      invalidatesTags: [TAG_TYPES.Crops],
    }),
  }),
});

export const {
  useGetCropByIdQuery,
  useGetCropsByFieldIdQuery,
  useGetCropsQuery,
  useCreateCropMutation,
  useUpdateCropMutation,
  useAddCropPlatingMutation,
} = cropApi;
