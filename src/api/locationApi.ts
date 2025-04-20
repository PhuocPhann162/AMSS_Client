import { appBaseApi, TAG_TYPES } from '@/api/app-api';

export const locationApi = appBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLocations: builder.query({
      query: () => ({
        url: 'location/getAll',
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Locations],
    }),
    getLocationById: builder.query({
      query: (id) => ({
        url: `location/getLocationById/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Locations],
    }),
    createLocation: builder.mutation({
      query: (data) => ({
        url: 'location',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Locations],
    }),
    updateLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `location/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Locations],
    }),
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `location/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG_TYPES.Locations],
    }),
  }),
});

export const {
  useGetAllLocationsQuery,
  useGetLocationByIdQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
