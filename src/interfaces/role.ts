export enum Role {
  ADMIN,
  CUSTOMER,
  SUPPLIER_CROP,
  OWNER_FARM,
  SUPPLIER_COMMODITY,
}

export function convertStringToRole(roleKey: string): Role | undefined {
  if (roleKey in Role) {
    return Role[roleKey as keyof typeof Role];
  }
  return undefined;
}
