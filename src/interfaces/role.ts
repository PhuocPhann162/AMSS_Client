export enum Role {
  ADMIN,
  CUSTOMER,
  SUPPLIER_CROP,
  OWNER_FARM,
  SUPPLIER_COMMODITY,
}

export const RoleName: Record<Role, string> = {
  [Role.ADMIN]: 'Admin',
  [Role.CUSTOMER]: 'Customer',
  [Role.SUPPLIER_CROP]: 'Supplier crop',
  [Role.OWNER_FARM]: 'Owner farm',
  [Role.SUPPLIER_COMMODITY]: 'Supplier commodity',
};
