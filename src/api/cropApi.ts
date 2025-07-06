import { appBaseApi, TAG_TYPES } from '@/api/instances';
import {
  BooleanResponse,
  PaginationRequest,
  PaginationResponse,
} from '@/models';
import type { GetCropsRequest } from '@/models/request/crop/get-crops-request';
import type { GetFieldsByCropRequest } from '@/models/request/crop/get-fields-by-crop-request';
import {
  AddPlatingCropsRequest,
  CropResponse,
} from '@/models/response/crop-response';
import type { GetCropsResponse } from '@/models/response/crop/get-crops-response';
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
    getCrops: builder.query<GetCropsResponse, GetCropsRequest>({
      query: (props) => ({
        url: `crop/get-all`,
        params: props,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Crops],
    }),
    getFieldsByCrop: builder.query<
      GetFieldsByCropResponse,
      GetFieldsByCropRequest
    >({
      query: ({ cropId, ...queryParams }) => ({
        url: `crop/${cropId}/fields`,
        params: queryParams,
        method: 'GET',
      }),
      providesTags: (_, __, props) => [
        {
          type: TAG_TYPES.Crops,
          id: props.cropId,
        },
      ],
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
  useGetCropsQuery,
  useGetFieldsByCropQuery,
  useCreateCropMutation,
  useUpdateCropMutation,
  useAddCropPlatingMutation,
  useRemovePlantingCropMutation,
} = cropApi;
