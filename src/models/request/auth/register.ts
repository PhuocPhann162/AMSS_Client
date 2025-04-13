import { Role } from '@/interfaces';

export interface RegisterRequest {
  userName: string;
  fullName: string;
  password: string;
  repeatPassword: string;
  phoneCode: string;
  phoneNumber: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  provinceCode: string;
  avatar: string;
  role?: Role;
}
