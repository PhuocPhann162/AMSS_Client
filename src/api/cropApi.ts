import { appBaseApi, TAG_TYPES } from '@/api/instances';
import {
  BooleanResponse,
  PaginationRequest,
  PaginationResponse,
} from '@/models';
import type { GetFieldsByCropRequest } from '@/models/request/crop/get-fields-by-crop-request';
import {
  AddPlatingCropsRequest,
  CropResponse,
} from '@/models/response/crop-response';
import type { GetFieldsByCropResponse } from '@/models/response/crop/get-fields-by-crop-response';

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
    getPlatingCrops: builder.query({
      query: (params: PaginationRequest) => ({
        url: 'crop/plating-crops',
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
    getFieldsByCrop: builder.query<
      GetFieldsByCropResponse,
      GetFieldsByCropRequest
    >({
      query: (props) => ({
        url: `crop/${props.id}/fields`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Crops],
    }),
    addCropPlating: builder.mutation<BooleanResponse, AddPlatingCropsRequest>({
      query: (data: AddPlatingCropsRequest) => ({
        url: 'crop/add-crop-planting',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Crops],
    }),
    removePlantingCrop: builder.mutation<
      BooleanResponse,
      { fieldId: string; cropId: string }
    >({
      query: ({ fieldId, cropId }) => ({
        url: `crop/remove-planting-crop?fieldId=${fieldId}&cropId=${cropId}`,
        method: 'DELETE',
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
  useGetPlatingCropsQuery,
  useGetFieldsByCropQuery,
  useCreateCropMutation,
  useUpdateCropMutation,
  useAddCropPlatingMutation,
  useRemovePlantingCropMutation,
} = cropApi;
