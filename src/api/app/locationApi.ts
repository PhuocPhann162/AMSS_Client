import { authAppApi } from '@/api/app';

export const locationApi = authAppApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLocations: builder.query({
      query: () => ({
        url: 'location/getAll',
        method: 'GET',
      }),
      providesTags: ['Locations'],
    }),
    getLocationById: builder.query({
      query: (id) => ({
        url: `location/getLocationById/${id}`,
        method: 'GET',
      }),
      providesTags: ['Locations'],
    }),
    createLocation: builder.mutation({
      query: (data) => ({
        url: 'location',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Locations'],
    }),
    updateLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `location/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Locations'],
    }),
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `location/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Locations'],
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
