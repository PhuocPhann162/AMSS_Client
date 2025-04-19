import { baseQueryWithReauth } from '@/hooks';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authAppApi = createApi({
  reducerPath: 'authAppApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Crops',
    'CropTypes',
    'Farms',
    'Fields',
    'Locations',
    'MetaDatas',
    'Polygons',
    'SocialMetrics',
    'Suppliers',
    'Users',
  ],
  endpoints: () => ({}),
});
