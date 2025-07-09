import { appBaseApi, TAG_TYPES } from '@/api/instances';
import type { GetCommodityOriginRequest } from '@/models/request/commodity/get-commodity-origin-request';
import type { GetCommodityOriginResponse } from '@/models/response/commodity/get-commodity-origin-response';
import type { GetCommoditiesResponse } from '@/models/response/commodity/get-commodity-response';
import type { GetCommodityDetailResponse } from '@/models/response/commodity/get-commodity-detail-response';
import type { CreateCommodityRequest } from '@/models/request/commodity/create-commodity-request';
import type { GetCommoditiesRequest } from '@/models/request/commodity/get-commodities-request';
import type { GetCommodityDetailRequest } from '@/models/request/commodity/get-commodity-detail-request';

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
    getCommodityDetail: build.query<
      GetCommodityDetailResponse,
      GetCommodityDetailRequest
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
  useGetCommodityDetailQuery,
  useGetCommodityOriginQuery,
  useCreateCommodityMutation,
} = commodityApi;
