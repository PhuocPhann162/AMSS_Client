import { PaginationResponse } from './paginationResponse';

export interface CropResponse {
  id: string;
  name: string;
  description?: string;
  cropType?: string;
  cycle?: string;
  edible?: string;
  soil?: string;
  watering?: string;
  maintenance?: string;
  hardinessZone?: number;
  indoor?: string;
  propagation?: string;
  careLevel?: string;
  growthRate?: string;
  cultivatedArea?: number;
  plantedDate?: Date | string;
  expectedDate?: Date | string;
  quantity?: number;
  supplierId?: string;
  imageUrl?: string;
}

export interface GetCropsRequest {
  pageNumber?: number;
  pageSize?: number;
  searchString?: string;
  sortColumn?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface GetCropsResponse {
  crops: CropResponse[];
  pagination: PaginationResponse<CropResponse>;
}

export interface PlantingModel {
  id?: string;
  cropId: string;
  cropName: string;
  locationId: string;
  bedId?: string;
  plantingDate: string;
  harvestDate?: string;
  quantity: number;
  unit: string;
  status: 'planned' | 'planted' | 'growing' | 'harvested';
  notes?: string;
}
