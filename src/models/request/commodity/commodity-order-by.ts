import { Commodity } from '@/interfaces';

export const COMMODITY_ORDER_BY = {
  price: 'price',
  createdAt: 'createdAt',
  name: 'name',
  expirationDate: 'expirationDate',
} as const satisfies Partial<Record<keyof Commodity, string>>;

export type CommodityOrderBy =
  (typeof COMMODITY_ORDER_BY)[keyof typeof COMMODITY_ORDER_BY];
