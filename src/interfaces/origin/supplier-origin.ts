import type { Supplier } from '@/interfaces/supplier/supplier';

export type SupplierOrigin = Pick<
  Supplier,
  | 'id'
  | 'name'
  | 'contactName'
  | 'phoneCode'
  | 'phoneNumber'
  | 'email'
  | 'address'
  | 'countryCode'
  | 'countryName'
  | 'provinceCode'
  | 'provinceName'
>;
