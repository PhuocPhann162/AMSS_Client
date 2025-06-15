import { type ApiResponse } from '@/interfaces';
import { Coupon } from '@/interfaces/coupons';
import { type PaginationResponse } from '@/models/response/paginationResponse';

export type GetCouponsResponse = ApiResponse<PaginationResponse<Coupon>>;

export type GetCouponByIdResponse = ApiResponse<Coupon>;
