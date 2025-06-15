export interface CreateCouponRequest {
  id?: string;
  title: string;
  description: string;
  code: string;
  discountAmount: number;
  minAmount: number;
  expiration: Date;
}
