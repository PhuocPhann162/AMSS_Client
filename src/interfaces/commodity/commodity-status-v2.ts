// TODO: use this in future
export const COMMODITY_STATUS_V2 = {
  Active: 0,
  OutOfStock: 1,
  Discontinued: 2,
  ComingSoon: 3,
  PreOrder: 4,
  Limited: 5,
} as const;

export type CommodityStatusV2 =
  (typeof COMMODITY_STATUS_V2)[keyof typeof COMMODITY_STATUS_V2];

export const COMMODITY_STATUS_NAME: Record<CommodityStatusV2, string> = {
  [COMMODITY_STATUS_V2.Active]: 'Active',
  [COMMODITY_STATUS_V2.OutOfStock]: 'Out of stock',
  [COMMODITY_STATUS_V2.Discontinued]: 'Discontinued',
  [COMMODITY_STATUS_V2.ComingSoon]: 'Coming soon',
  [COMMODITY_STATUS_V2.PreOrder]: 'Pre order',
  [COMMODITY_STATUS_V2.Limited]: 'Limited',
};
