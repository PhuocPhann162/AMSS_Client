import { ApiResponse } from '@/interfaces';

export interface GetSuppliersResponse {
  Id: string;
  Name: string;
  ContactName: string;
  CountryName: string;
  CountryCode: string;
  ProvinceCode?: string;
  ProvinceName?: string;
  Email: string;
  PhoneCode: string;
  PhoneNumber: string;
  CreatedAt: string;
}

export interface GetSelectionSuppliersByRoleResponse {
  supplierId: string;
  contactName: string;
  companyName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetSelectionSuppliersByRoleApiResponse
  extends ApiResponse<GetSelectionSuppliersByRoleResponse[]> {}
