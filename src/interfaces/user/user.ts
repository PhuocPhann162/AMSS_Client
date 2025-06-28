import type { Role } from '@/interfaces/role/role';

export interface User {
  id?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  streetAddress?: string;
  provinceName?: string;
  provinceCode?: string;
  countryCode?: string;
  countryName?: string;
  phoneCode?: string;
  phoneNumber?: string;
  avatar?: string;
  refreshToken?: string;
  isActive?: boolean;
  role?: Role;
  createdAt?: string;
  isOnline?: boolean;
  lastSeen?: string;
}
