import { appBaseApi, TAG_TYPES } from '@/api/instances';

export const polygonApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPolygons: builder.query({
      query: () => ({
        url: 'polygon/getAll',
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Polygons],
    }),
    getPolygonByFarmId: builder.query({
      query: (farmId) => ({
        url: `polygon/getPolygonByFarmId/${farmId}`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Polygons],
    }),
    createPolygon: builder.mutation({
      query: (data) => ({
        url: 'polygon',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Polygons],
    }),
  }),
});

export const {
  useGetAllPolygonsQuery,
  useCreatePolygonMutation,
  useGetPolygonByFarmIdQuery,
} = polygonApi;
