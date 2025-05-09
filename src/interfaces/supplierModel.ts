import { Role } from './role';

export interface supplierModel {
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
}
