import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SD_Agro_API_URL } from '~/utils/SD';

const polygonAgroApi = createApi({
  reducerPath: 'polygonAgroApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SD_Agro_API_URL as string
  }),
  tagTypes: ['PolygonAgros'],
  endpoints: (builder) => ({
    getListPolygons: builder.query({
      query: () => ({
        url: `polygons?appid=${import.meta.env.VITE_AGRO_API_KEY}`,
        method: 'GET'
      }),
      providesTags: ['PolygonAgros']
    }),
    getInfoPolygon: builder.query({
      query: (id) => ({
        url: `polygons/${id}?appid=${import.meta.env.VITE_AGRO_API_KEY}`,
        method: 'POST'
      }),
      providesTags: ['PolygonAgros']
    }),
    createAgroPolygon: builder.mutation({
      query: (data) => ({
        url: `polygons?appid=${import.meta.env.VITE_AGRO_API_KEY}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }),
      invalidatesTags: ['PolygonAgros']
    }),
    updateAgroPolygon: builder.mutation({
      query: ({ id, data }) => ({
        url: `polygons/${id}?appid=${import.meta.env.VITE_AGRO_API_KEY}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }),
      invalidatesTags: ['PolygonAgros']
    }),
    deleteAgroPolygon: builder.mutation({
      query: (id) => ({
        url: `polygons/${id}?appid=${import.meta.env.VITE_AGRO_API_KEY}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['PolygonAgros']
    })
  })
});

export default polygonAgroApi;
export const {
  useGetListPolygonsQuery,
  useGetInfoPolygonQuery,
  useCreateAgroPolygonMutation,
  useUpdateAgroPolygonMutation,
  useDeleteAgroPolygonMutation
} = polygonAgroApi;
