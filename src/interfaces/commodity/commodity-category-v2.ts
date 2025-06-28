// TODO: use this in future
export const COMMODITY_CATEGORY_V2 = {
  Vegetable: 0,
  Fruit: 1,
  Grain: 2,
  Seed: 3,
} as const;

export type CommodityCategoryV2 =
  (typeof COMMODITY_CATEGORY_V2)[keyof typeof COMMODITY_CATEGORY_V2];

export const COMMODITY_CATEGORY_NAME: Record<CommodityCategoryV2, string> = {
  [COMMODITY_CATEGORY_V2.Vegetable]: 'Vegetable',
  [COMMODITY_CATEGORY_V2.Fruit]: 'Fruit',
  [COMMODITY_CATEGORY_V2.Grain]: 'Grain',
  [COMMODITY_CATEGORY_V2.Seed]: 'Seed',
} as const;
