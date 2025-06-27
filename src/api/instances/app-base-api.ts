import { baseQueryWithReauth } from '@/hooks';
import { createApi } from '@reduxjs/toolkit/query/react';

export const TAG_TYPES = {
  Crops: 'Crops',
  CropTypes: 'CropTypes',
  Farms: 'Farms',
  Fields: 'Fields',
  Locations: 'Locations',
  MetaDatas: 'MetaDatas',
  Polygons: 'Polygons',
  SocialMetrics: 'SocialMetrics',
  Suppliers: 'Suppliers',
  Users: 'Users',
  Commodities: 'Commodities',
  Cart: 'Cart',
  Payment: 'Payment',
  Logistics: 'Logistics',
  Orders: 'Orders',
  Coupons: 'Coupons',
  Chats: 'Chats',
  Reports: 'Reports',
} as const;

export const appBaseApi = createApi({
  reducerPath: 'appBaseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
});
