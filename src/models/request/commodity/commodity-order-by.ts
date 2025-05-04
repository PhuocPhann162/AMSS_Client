import { Commodity } from '@/interfaces';

export const COMMODITY_ORDER_BY = {
  price: 'Price',
  createdAt: 'CreatedAt',
} as const satisfies Partial<Record<keyof Commodity, string>>;

export type CommodityOrderBy =
  (typeof COMMODITY_ORDER_BY)[keyof typeof COMMODITY_ORDER_BY];
