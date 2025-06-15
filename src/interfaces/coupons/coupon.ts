export interface Coupon {
  id: string;
  title: string;
  description: string;
  code: string;
  discountAmount: number;
  minAmount: number;
  expiration: Date;
  createdAt: string;
  updatedAt: string;
}
