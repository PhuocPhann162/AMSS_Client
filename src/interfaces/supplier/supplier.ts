import { type Role } from '@/interfaces/role';

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  address: string;
  countryCode: string;
  countryName: string;
  provinceCode: string;
  provinceName: string;
  supplierRole: Role;
  createdAt: string;
  updatedAt: string;
}
