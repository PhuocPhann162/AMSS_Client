export interface CreateCropRequest {
  name: string;
  cycle: string;
  edible: string;
  soil: string;
  watering: string;
  maintenance: string;
  hardinessZone: string;
  indoor: string;
  propogation: string;
  careLevel: string;
  growthRate: string;
  description: string;
  quantity: string;
  cultivatedArea: string;
  plantedDate: string;
  expectedDate: string;
  supplierId: string;
  cropTypeName: string;
  file: File;
}
