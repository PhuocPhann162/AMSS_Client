enum PlantingAction {
  Sowing,
  Watering,
  Fertilizing,
  SprayingPesticides,
  Pruning,
  Harvesting,
  Other,
}

export interface CreateCareProcessRequest {
  cropId: string;
  fieldId: string;
  processDetails: {
    action: PlantingAction;
    description: string;
    date: string;
  }[];
}
