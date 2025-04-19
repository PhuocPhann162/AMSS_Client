import { authAppApi } from '@/api/app';

export const polygonApi = authAppApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPolygons: builder.query({
      query: () => ({
        url: 'polygon/getAll',
        method: 'GET',
      }),
      providesTags: ['Polygons'],
    }),
    getPolygonByFarmId: builder.query({
      query: (farmId) => ({
        url: `polygon/getPolygonByFarmId/${farmId}`,
        method: 'GET',
      }),
      providesTags: ['Polygons'],
    }),
    createPolygon: builder.mutation({
      query: (data) => ({
        url: 'polygon',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Polygons'],
    }),
  }),
});

export const {
  useGetAllPolygonsQuery,
  useCreatePolygonMutation,
  useGetPolygonByFarmIdQuery,
} = polygonApi;
