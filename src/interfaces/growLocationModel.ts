export type PlantingFormatType = 'beds' | 'cover' | 'row' | 'other';
export type LocationStatusType =
  | 'Idle'
  | 'Planted'
  | 'Needs Care'
  | 'Awaiting Harvest'
  | 'Harvesting'
  | 'Recovery Needed';
export type LocationType = 'Field' | 'Greenhouse' | 'Garden';
export type LightProfileType =
  | 'Full Sun'
  | 'Partial Sun'
  | 'Partial Shade'
  | 'Full Shade';

export interface GrowLocationModel {
  // Basic Information
  id?: string;
  name: string;
  internalId: string;
  locationType: LocationType;
  description?: string;

  // Planting Format
  plantingFormat: PlantingFormatType;

  // Beds Configuration (only when plantingFormat is 'beds')
  numberOfBeds?: number;
  bedLength?: number;
  bedWidth?: number;

  // Location Properties
  status: LocationStatusType;
  lightProfile?: LightProfileType;
  grazingRestDays?: number;

  // Metadata
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface CreateGrowLocationRequest {
  name: string;
  internalId: string;
  locationType: LocationType;
  plantingFormat: PlantingFormatType;
  numberOfBeds?: number;
  bedLength?: number;
  bedWidth?: number;
  status: LocationStatusType;
  lightProfile?: LightProfileType;
  grazingRestDays?: number;
  description?: string;
}

export interface UpdateGrowLocationRequest
  extends Partial<CreateGrowLocationRequest> {
  id: string;
}
