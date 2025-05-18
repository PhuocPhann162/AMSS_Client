import { appBaseApi, TAG_TYPES } from '@/api/instances';
import type {
  GetCommoditiesRequest,
  GetCommoditiesResponse,
  GetCommodityByIdRequest,
  GetCommodityByIdResponse,
} from '@/models';

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
  }),
});

export const { useGetCommoditiesQuery, useGetCommodityByIdQuery } =
  commodityApi;
