import { appBaseApi, TAG_TYPES } from '@/api/instances';
import { BooleanResponse } from '@/models';
import { CreateCouponRequest } from '@/models/request/coupon/create-coupon-request';
import { GetCouponsRequest } from '@/models/request/coupon/get-coupons-response';
import {
  GetCouponByIdResponse,
  GetCouponsResponse,
} from '@/models/response/coupon';

export const couponApi = appBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCoupons: build.query<GetCouponsResponse, GetCouponsRequest>({
      query: (props) => ({
        url: 'coupons',
        params: props,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Coupons],
    }),
    getCouponById: build.query<GetCouponByIdResponse, string>({
      query: (id) => ({
        url: `coupons/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.Coupons],
    }),
    createCoupon: build.mutation<BooleanResponse, CreateCouponRequest>({
      query: (data) => ({
        url: 'coupons',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Coupons],
    }),
    updateCoupon: build.mutation<
      BooleanResponse,
      { id: string; data: CreateCouponRequest }
    >({
      query: ({ id, data }) => ({
        url: `coupons/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [TAG_TYPES.Coupons],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
} = couponApi;
