import type { User } from '@/interfaces/user/user';

export default interface locationModel {
  id?: string;
  address?: string;
  lat?: number;
  lng?: number;
  countryCode?: string;
  city?: string;
  state?: string;
  district?: string;
  road?: string;
  postCode?: string;
  applicationUserId?: string;
  user?: User;

  country?: string;
}
