import { appBaseApi, TAG_TYPES } from '@/api/instances';
import {
  BooleanResponse,
  PaginationRequest,
  PaginationResponse,
} from '@/models';
import type { GetCropsBySupplierIdRequest } from '@/models/request/crop/get-crops-by-supplier-id';
import {
  AddPlatingCropsRequest,
  CropResponse,
} from '@/models/response/crop-response';
import type { GetCropsBySupplierIdResponse } from '@/models/response/crop/get-crops-by-supplier-id-response';

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
    getCropsBySupplierId: builder.query<
      GetCropsBySupplierIdResponse,
      GetCropsBySupplierIdRequest
    >({
      query: (args) => `crop/getAllBySupplierId/${args.id}`,
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
  useGetCropsBySupplierIdQuery,
  useCreateCropMutation,
  useUpdateCropMutation,
  useAddCropPlatingMutation,
  useRemovePlantingCropMutation,
} = cropApi;
