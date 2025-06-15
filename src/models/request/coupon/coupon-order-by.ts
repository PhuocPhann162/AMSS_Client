import { Coupon } from '@/interfaces/coupons';

export const COUPON_ORDER_BY = {
  expiration: 'expiration',
  discountAmount: 'discountAmount',
  createdAt: 'createdAt',
} as const satisfies Partial<Record<keyof Coupon, string>>;

export type CouponOrderBy =
  (typeof COUPON_ORDER_BY)[keyof typeof COUPON_ORDER_BY];
