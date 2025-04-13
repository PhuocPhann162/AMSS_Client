import { Role } from '@/interfaces/role';

export interface User {
  id?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  province?: string;
  provinceCode?: string;
  country?: string;
  countryCode?: string;
  avatar?: string;
  refreshToken?: string;
  isActive?: boolean;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
}
