export enum SD_Roles {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  FARMER = 'FARMER'
}

export enum SD_PlaceType {
  FARM = 'Farm',
  FIELD = 'Field'
}

export enum SD_FieldStatus {
  IDLE = 'Idle',
  PLANTED = 'Planted',
  NEEDS_CARE = 'Needs Care',
  AWAITING_HARVEST = 'Awaiting Harvest',
  HARVESTING = 'Harvesting',
  RECOVERY_NEEDED = 'Recovery Needed'
}

export const SD_Base_Weather_URL = 'http://api.openweathermap.org';
