import { appBaseApi, TAG_TYPES } from '@/api/instances';
import type {
  GetCommoditiesRequest,
  GetCommoditiesResponse,
  GetCommodityByIdRequest,
  GetCommodityByIdResponse,
} from '@/models';
import { CommodityCategory, CommodityStatus } from '@/interfaces';
import type { GetCommodityOriginRequest } from '@/models/request/commodity/get-commodity-origin-request';
import type { GetCommodityOriginResponse } from '@/models/response/commodity/get-commodity-origin-response';

export interface CreateCommodityRequest {
  name: string;
  description: string;
  specialTag?: string;
  category: CommodityCategory;
  price: number;
  image: string;
  expirationDate?: string;
  status: CommodityStatus;
  supplierId: string;
  cropId: string;
}

export interface CreateCommodityResponse {
  isSuccess: boolean;
  errorMessages?: string[];
}

export const commodityApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCommodities: build.query<GetCommoditiesResponse, GetCommoditiesRequest>({
      query: (props) => ({
        url: 'commodity',
        params: props,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Commodities],
    }),
    getCommodityById: build.query<
      GetCommodityByIdResponse,
      GetCommodityByIdRequest
    >({
      query: (props) => ({
        url: `commodity/${props.id}`,
        method: 'GET',
      }),
      providesTags: (_, __, props) => [
        { type: TAG_TYPES.Commodities, id: props.id },
      ],
    }),
    getCommodityOrigin: build.query<
      GetCommodityOriginResponse,
      GetCommodityOriginRequest
    >({
      query: (props) => `commodity/${props.id}/origin`,
      providesTags: (_, __, props) => [
        { type: TAG_TYPES.Commodities, id: props.id },
      ],
    }),
    createCommodity: build.mutation<
      CreateCommodityResponse,
      CreateCommodityRequest
    >({
      query: (data) => ({
        url: 'commodity',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Commodities],
    }),
  }),
});

export const {
  useGetCommoditiesQuery,
  useGetCommodityByIdQuery,
  useGetCommodityOriginQuery,
  useCreateCommodityMutation,
} = commodityApi;
