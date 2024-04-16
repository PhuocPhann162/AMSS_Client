import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '~/helper';

const polygonApi = createApi({
  reducerPath: 'polygonApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Polygons'],
  endpoints: (builder) => ({
    getAllPolygons: builder.query({
      query: () => ({
        url: 'polygon/getAll',
        method: 'GET'
      }),
      providesTags: ['Polygons']
    }),
    getPolygonByFarmId: builder.query({
      query: (farmId) => ({
        url: `polygon/getPolygonByFarmId/${farmId}`,
        method: 'GET'
      }),
      providesTags: ['Polygons']
    }),
    createPolygon: builder.mutation({
      query: (data) => ({
        url: 'polygon',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Polygons']
    })
  }),
  refetchOnReconnect: true
});

export default polygonApi;
export const { useGetAllPolygonsQuery, useCreatePolygonMutation, useGetPolygonByFarmIdQuery } = polygonApi;
