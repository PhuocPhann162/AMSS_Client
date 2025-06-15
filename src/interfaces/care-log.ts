export enum PlantingAction {
  Sowing,
  Watering,
  Fertilizing,
  SprayingPesticides,
  Pruning,
  Harvesting,
  Other,
}

export interface CareLog {
  id: string;
  type: PlantingAction;
  description: string;
  date: string;
  cropId: string;
  fieldId: string;
  createdBy: string;
}
