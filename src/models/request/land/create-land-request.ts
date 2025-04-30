import { pointModel } from '@/interfaces';
import { SD_PlaceType } from '@/utils/SD';

export interface CreateLocationDto {
  address: string;
  lat: number;
  lng: number;
  countryCode?: string;
  city?: string;
  state?: string;
  district?: string;
  road?: string;
  postCode?: string;
}

export interface CreatePolygonDto {
  color: string;
  type: number;
  positions: pointModel[];
}

export interface CreateLandFormState {
  name: string;
  placeType: SD_PlaceType;
  color: string;
  // For Farm
  ownerId?: string;
  // For Field
  farmId?: string;
  status?: string;
  // Common
  growLocation?: string;
  area: number;
  location: CreateLocationDto;
  polygon: CreatePolygonDto;
}

export interface CreateFarmRequest {
  name: string;
  area: number;
  ownerName: string;
  ownerSupplierId: string;
  location: CreateLocationDto;
  polygon: CreatePolygonDto;
}

export interface CreateFieldRequest {
  name: string;
  area: number;
  farmId: string;
  location: CreateLocationDto;
  polygon: CreatePolygonDto;
}
