export interface GetUsersResponse {
  Id: string;
  FullName: string;
  CountryName: string;
  CountryCode: string;
  ProvinceCode?: string;
  ProvinceName?: string;
  Email: string;
  PhoneCode: string;
  Address: string;
  PhoneNumber: string;
  CreatedAt: string;
  IsActive: boolean;
}
