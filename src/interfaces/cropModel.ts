import cropTypeModel from './cropTypeModel';
import fieldCropModel from './fieldCropModel';

export default interface cropModel {
  id?: string;
  icon?: string;
  name?: string;
  cycle?: string;
  edible?: boolean;
  soil?: string;
  watering?: string;
  maintenance?: string;
  hardinessZone?: number;
  indoor?: boolean;
  propogation?: string;
  careLevel?: string;
  growthRate?: string;
  description?: string;
  quantity?: number;
  cultivatedArea?: number;
  plantedDate?: string;
  expectedDate?: string;
  cropTypeId?: string;
  cropType?: cropTypeModel;
  fieldCrops?: fieldCropModel[];
  createdAt?: string;
  updatedAt?: string;
}
