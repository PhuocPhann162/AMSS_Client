// TODO: use this in future
export const ROLE = {
  ADMIN: 0,
  CUSTOMER: 1,
  SUPPLIER_CROP: 2,
  OWNER_FARM: 3,
  SUPPLIER_COMMODITY: 4,
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
