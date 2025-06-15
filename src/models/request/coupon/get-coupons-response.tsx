import { type PaginationRequest } from '@/models/request/paginationRequest';
import { CouponOrderBy } from './coupon-order-by';

export type GetCouponsRequest = Partial<PaginationRequest<CouponOrderBy>>;
